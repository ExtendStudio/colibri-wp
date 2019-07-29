<?php


namespace ColibriWP\Theme;


use ColibriWP\Theme\Core\ConfigurableInterface;
use ColibriWP\Theme\Core\Hooks;
use ColibriWP\Theme\Core\Tree;
use ColibriWP\Theme\Customizer\ControlFactory;
use ColibriWP\Theme\Customizer\Controls\ColibriControl;
use ColibriWP\Theme\Customizer\CustomizerApi;
use ColibriWP\Theme\Customizer\PanelFactory;
use ColibriWP\Theme\Customizer\SectionFactory;

class Customizer {

	const TYPE_CONTROL = "control";
	const TYPE_SECTION = "section";
	const TYPE_PANEL   = "panel";

	private $theme    = null;
	private $options;
	private $sections = array();
	private $panels   = array();
	private $settings = array();


	public function __construct( Theme $theme ) {

		new CustomizerApi();
		$this->theme   = $theme;
		$this->options = new Tree();

	}

	public function boot() {

		if ( Hooks::colibri_apply_filters( 'customizer_skip_boot', false ) ) {
			return;
		}

		add_action( 'customize_register', array( $this, 'prepareOptions' ), 0, 0 );
		add_action( 'customize_register', array( $this, 'prepareTypes' ), 0, 1 );

		// register customizer structure
		add_action( 'customize_register', array( $this, 'registerPanels' ), 1, 1 );
		add_action( 'customize_register', array( $this, 'registerSections' ), 2, 1 );

		// register customizer components
		add_action( 'customize_register', array( $this, 'registerSettings' ), 3, 1 );
		add_action( 'customize_register', array( $this, 'registerControls' ), 4, 1 );

		// additional elements
		add_action( 'customize_register', array( $this, 'registerPartialRefresh' ), 5, 1 );
		$this->inPreview( function () {
			add_action( 'wp_print_footer_scripts', function () {

				?>
                <script data-name="colibri-preview-options">
                    var colibri_CSS_OUTPUT_CONTROLS = <?php echo wp_json_encode( ControlFactory::getCssOutputControls() ); ?>;
                    var colibri_JS_OUTPUT_CONTROLS = <?php echo wp_json_encode( ControlFactory::getJsOutputControls() ); ?>;
                    var colibri_CONTROLS_ACTIVE_RULES = <?php echo wp_json_encode( ControlFactory::getActiveRules() ); ?>;
                    var colibri_ADDITIONAL_JS_DATA = <?php echo wp_json_encode( (object) Hooks::colibri_apply_filters( 'customizer_additional_js_data',
						array() ) ); ?>;
                </script>
				<?php
			}, PHP_INT_MAX );
		} );

		// rearrange customizer components
		add_action( 'customize_register', array( $this, 'rearrangeComponents' ), PHP_INT_MAX, 1 );

		// add customizer js / css
		add_action( 'customize_controls_print_scripts', array( $this, 'registerAssets' ), PHP_INT_MAX, 1 );

		//
		$this->onPreviewInit( array( $this, 'previewInit' ) );


	}

	public function prepareOptions() {
		$components = $this->theme->getRepository()->getAllDefinitions();
		$options    = array(
			"settings" => array(),
			"sections" => array(),
			"panels"   => array(),
		);

		foreach ( $components as $key => $component ) {
			$interfaces = class_implements( $component );

			if ( array_key_exists( ConfigurableInterface::class, $interfaces ) ) {

				/** @var ConfigurableInterface $component */
				$opts = (array) $component::options();

				foreach ( $options as $opt_key => $value ) {

					if ( array_key_exists( $opt_key, $opts ) && is_array( $opts[ $opt_key ] ) ) {

						$options[ $opt_key ] = array_merge( $options[ $opt_key ], $opts[ $opt_key ] );

					}

				}
			}

		}

		$options = Hooks::colibri_apply_filters( 'customizer_options', $options );

		//set initial section > tabs to empty = true
		$tabs     = array( 'content' => true, 'style' => true, 'layout' => true );
		$sections = array_flip( array_keys( $options['sections'] ) );
		array_walk( $sections, function ( &$value, $key ) use ( $tabs ) {
			$value = array('tabs' => $tabs);
		} );

        //set section > tabs that have controls empty = false
		foreach ( $options['settings'] as $setting => $value ) {
			$section                      = $value['control']['section'];
			$tab                          = $value['control']['colibri_tab'];
			$sections[ $section ]['tabs'][ $tab ] = false;
		}

		foreach ( $sections as $section => $values )
        {
            foreach ($values['tabs'] as $tab => $tab_empty)
            {
                if ($tab_empty)
                {
                    //var_dump($section);
	                $key = str_replace('.section', '', $section ) . ".$tab.plugin";
	                $options['settings'][$key] = array(
		                'default' => '',
		                'control' => array(
			                'label'       => '',//Translations::get( 'plugin_message' ),
			                'type'        => 'plugin-message',
			                'section'     => $section,
			                'colibri_tab' => $tab,
		                )
	                );
                }
            }
        }

		$this->options->setData( $options );
	}

	/**
	 * @param \WP_Customize_Manager $wp_customize
	 */
	public function prepareTypes( $wp_customize ) {
		$types = Hooks::colibri_apply_filters( 'customizer_types', array() );
		foreach ( $types as $class => $type ) {
			switch ( $type ) {
				case Customizer::TYPE_CONTROL:
					$wp_customize->register_control_type( $class );
					break;

				case Customizer::TYPE_SECTION:
					$wp_customize->register_section_type( $class );
					break;

				case Customizer::TYPE_PANEL:
					$wp_customize->register_panel_type( $class );
					break;
			}

		}

	}


	public function registerPanels() {
		$this->panels = new Tree( $this->options->findAt( "panels" ) );

		$this->panels->walkFirstLevel( function ( $id, $data ) {
			PanelFactory::make( $id, $data );
		} );
	}


	public function registerSections() {
		$this->sections = new Tree( $this->options->findAt( "sections" ) );

		$this->sections->walkFirstLevel( function ( $id, $data ) {
			SectionFactory::make( $id, $data );
		} );
	}


	/**
	 * @param \WP_Customize_Manager $wp_customize
	 */
	public function registerSettings( $wp_customize ) {
		$this->settings = new Tree( $this->options->findAt( "settings" ) );

		$this->settings->walkFirstLevel( function ( $id, $data ) use ( $wp_customize ) {

			$data = array_merge( array(
				'transport' => 'colibri_selective_refresh',
				'default'   => '',
			), $data );

			if ( ! ( isset( $data['settingless'] ) && $data['settingless'] ) ) {
				$wp_customize->add_setting( $id, array(
					'transport'         => $data['transport'],
					'default'           => $data['default'],
					'sanitize_callback' => array( __CLASS__, "sanitize" ),
				) );
			}

			if ( isset( $data['control'] ) ) {

				$control = array_merge( array(
					'default'   => $data['default'],
					'transport' => $data['transport'],

				), $data['control'] );

				if ( array_key_exists( 'css_output', $data ) ) {
					$control['transport']  = 'css_output';
					$control['css_output'] = $data['css_output'];
				}
				if ( array_key_exists( 'js_output', $data ) ) {
					$control['transport'] = 'js_output';
					$control['js_output'] = $data['js_output'];
				}
				if ( array_key_exists( 'active_rules', $data ) ) {
					$control['active_rules'] = $data['active_rules'];
				}

				$control['settingless'] = ( isset( $data['settingless'] ) && $data['settingless'] );

				ControlFactory::make( $id, $control );
			}

		} );


	}


	/**
	 * @param \WP_Customize_Manager $wp_customize
	 */
	public function registerControls( $wp_customize ) {

	}


	/**
	 * @param \WP_Customize_Manager $wp_customize
	 */
	public function registerPartialRefresh( $wp_customize ) {
		$partials = ControlFactory::getPartialRefreshes();

		Hooks::colibri_add_filter( 'customizer_additional_js_data', function ( $value ) use ( $partials ) {
			$value['selective_refresh_settings'] = array();

			foreach ( $partials as $partial ) {
				$value['selective_refresh_settings'] = array_merge( $value['selective_refresh_settings'], $partial['settings'] );
			}

			return $value;
		} );

		foreach ( $partials as $key => $args ) {
			$wp_customize->selective_refresh->add_partial( $key, $args );
		}
	}

	/**
	 * @param \WP_Customize_Manager $wp_customize
	 */
	public function rearrangeComponents( $wp_customize ) {

		Hooks::colibri_do_action( 'rearrange_customizer_components', $wp_customize );
	}

	public function registerAssets() {
		wp_register_script( Hooks::HOOK_PREFIX . "customizer",
			get_template_directory_uri() . "/resources/customizer/customizer.js", array( 'jquery' ),
			$this->theme->getVersion(), true );

		wp_localize_script( Hooks::HOOK_PREFIX . "customizer", 'colibri_Customizer_Data',
			Hooks::colibri_apply_filters( 'customizer_js_data', array(
				'translations'        => Translations::all(),
				'section_default_tab' => ColibriControl::DEFAULT_COLIBRI_TAB,
				'style_tab' => ColibriControl::STYLE_COLIBRI_TAB,
			) ) );

		wp_register_style( Hooks::HOOK_PREFIX . "customizer",
			get_template_directory_uri() . "/resources/customizer/customizer.css", array( 'customize-controls' ),
			$this->theme->getVersion() );

		wp_enqueue_style( Hooks::HOOK_PREFIX . "customizer" );
		wp_enqueue_script( Hooks::HOOK_PREFIX . "customizer" );
	}

	public function inPreview( $callback ) {
		if ( is_customize_preview() && is_callable( $callback ) ) {
			call_user_func( $callback );
		}
	}

	public function isInPreview() {
		return \is_customize_preview();
	}


	public function isCustomizer( $callback ) {
		if ( is_customize_preview() && is_callable( $callback ) ) {
			call_user_func( $callback );
		}
	}


	public function onPreviewInit( $callback, $priorty = 10 ) {

		add_action( 'customize_preview_init', $callback, $priorty );
	}

	public function previewInit() {

		wp_enqueue_style( Hooks::HOOK_PREFIX . "customizer_preview",
			get_template_directory_uri() . "/resources/customizer/preview.css", Theme::getInstance()->getVersion() );


		wp_enqueue_script( Hooks::HOOK_PREFIX . "customizer_preview",
			get_template_directory_uri() . "/resources/customizer/preview.js", array(
				'customize-preview',
				'customize-selective-refresh'
			),
			Theme::getInstance()->getVersion(), true );


	}


	/**
	 * @return array
	 */
	public function getSettings() {
		return $this->settings;
	}

	public static function sanitize( $value ) {
		return (string) $value;
	}
}
