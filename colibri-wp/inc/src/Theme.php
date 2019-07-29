<?php


namespace ColibriWP\Theme;


use ColibriWP\Theme\Core\ComponentInterface;
use ColibriWP\Theme\Core\Hooks;


class Theme {

	private static $instance = null;

	private $repository;
	private $customizer;
	private $assets_manager;
	private $plugins_manager;

	private $registered_menus = array();
	private $sidebars = array();

	public function __construct() {

		require_once get_template_directory() . "/inc/class-tgm-plugin-activation.php";

		$this->repository      = new ComponentsRepository();
		$this->customizer      = new Customizer( $this );
		$this->assets_manager  = new AssetsManager( $this );
		$this->plugins_manager = new PluginsManager( $this );

		add_action( 'after_setup_theme', array( $this, 'afterSetup' ) );

	}

	public static function load() {
		static::getInstance();
	}

	/**
	 * @return null|Theme
	 */
	public static function getInstance() {
		if ( ! static::$instance ) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	public function afterSetup() {
		Defaults::load();
		Translations::load();

		$this->registerMenus();

		$this->repository->load();
		$this->customizer->boot();
		$this->assets_manager->boot();
		$this->plugins_manager->boot();

		add_action( 'widgets_init', array( $this, 'doInitWidgets' ) );
		add_action( 'admin_menu', array( $this, 'addThemeInfoPage' ) );
		add_action( 'admin_notices', array( $this, 'addThemeNotice' ) );


		add_action( 'wp_ajax_colibriwp_disable_big_notice', function () {
			$slug = get_template() . "-page-info";
			update_option( "{$slug}-theme-notice-dismissed", true );
		} );

		add_action( 'admin_enqueue_scripts', function () {

			$slug = get_template() . "-page-info";

			$this->getAssetsManager()->registerScript(
				$slug,
				$this->getAssetsManager()->getBaseURL() . "/admin/admin.js",
				array( 'jquery' ),
				false
			)->registerStyle(
				$slug,
				$this->getAssetsManager()->getBaseURL() . "/admin/admin.css" .
				false
			);

		}, 0 );

		Hooks::colibri_do_action( 'theme_loaded', $this );


	}

	private function registerMenus() {
		\register_nav_menus( $this->registered_menus );
	}

	/**
	 * @return AssetsManager
	 */
	public function getAssetsManager() {
		return $this->assets_manager;
	}

	public function addThemeNotice() {
		$slug = get_template() . "-page-info";

		$show_big_notice      = ! get_option( "{$slug}-theme-notice-dismissed", false );
		$is_builder_installed = apply_filters( 'colibri_page_builder/installed', false );

		if ( $show_big_notice && ! $is_builder_installed ) {
			wp_enqueue_style( $slug );
			wp_enqueue_script( $slug );
			wp_enqueue_script( 'wp-util' );


			?>
            <div class="notice notice-success is-dismissible colibri-admin-big-notice notice-large">
				<?php View::make( "admin/admin-notice" ); ?>
            </div>
			<?php
		}

	}

	/**
	 * @return PluginsManager
	 */
	public function getPluginsManager() {
		return $this->plugins_manager;
	}

	public function addThemeInfoPage() {
		$tabs = Hooks::colibri_apply_filters( 'info_page_tabs', array() );

		if ( ! count( $tabs ) ) {
			return;
		}

		$slug = get_template() . "-page-info";

		$page_name = Hooks::colibri_apply_filters( 'theme_page_name', Translations::get( 'theme_page_name' ) );
		add_theme_page(
			$page_name,
			$page_name,
			'activate_plugins',
			$slug,
			array( $this, 'printThemePage' )
		);

		add_action( 'admin_enqueue_scripts', function () {
			global $plugin_page;
			$slug = get_template() . "-page-info";

			if ( $plugin_page === $slug ) {
				wp_enqueue_style( $slug );
				wp_enqueue_script( $slug );
			}

		}, 20 );
	}

	public function printThemePage() {


		$tabs        = Hooks::colibri_apply_filters( 'info_page_tabs', array() );
		$tabs_slugs  = array_keys( $tabs );
		$default_tab = count( $tabs_slugs ) ? $tabs_slugs[0] : null;

		$current_tab = isset( $_REQUEST['current_tab'] ) ? $_REQUEST['current_tab'] : $default_tab;
		$url         = add_query_arg
		(
			array(
				'page' => get_template() . "-page-info",
			),
			admin_url( "themes.php" )
		);

		$welcome_message = sprintf( Translations::translate( 'welcome_message' ), $this->getThemeHeaderData( 'Name' ) );
		$welcome_info    = Translations::translate( 'welcome_info' );


		View::make( "admin/page",
			array(
				'tabs'            => $tabs,
				'current_tab'     => $current_tab,
				'page_url'        => $url,
				'welcome_message' => Hooks::colibri_apply_filters( 'info_page_welcome_message', $welcome_message ),
				'welcome_info'    => Hooks::colibri_apply_filters( 'info_page_welcome_info', $welcome_info ),
			)
		);

	}

	public function getThemeHeaderData( $key, $child = false ) {
		$theme = wp_get_theme();

		if ( ! $child && $template = $theme->get( 'Template' ) ) {
			$theme = wp_get_theme( $template );
		}

		return $theme->get( $key );
	}

	public function doInitWidgets() {

		foreach ( $this->sidebars as $sidebar ) {
			\register_sidebar( $sidebar );
		}
	}

	/**
	 * @param $component_name
	 *
	 * @return ComponentInterface|null
	 * @throws \Exception
	 */
	public function get( $component_name ) {


		$component = $this->repository->getByName( $component_name );

		if ( ! $component ) {
			throw new \Exception( "Null component: `{$component_name}`" );
		}


		return $component;
	}

	/**
	 * @return \ColibriWP\Theme\ComponentsRepository
	 */
	public function getRepository() {
		return $this->repository;
	}

	/**
	 * @param \ColibriWP\Theme\ComponentsRepository $repository
	 */
	public function setRepository( $repository ) {
		$this->repository = $repository;
	}

	public function getVersion() {
		$theme = wp_get_theme();
		if ( $theme->get( 'Template' ) ) {
			$theme = wp_get_theme( $theme->get( 'Template' ) );
		}

		return $theme->get( 'Version' );
	}

	public function getTextDomain() {
		$theme = wp_get_theme();
		if ( $theme->get( 'Template' ) ) {
			$theme = wp_get_theme( $theme->get( 'Template' ) );
		}

		return $theme->get( 'TextDomain' );
	}

	/**
	 * @return Customizer
	 */
	public function getCustomizer() {
		return $this->customizer;
	}

	/**
	 * @param string $feature
	 * @param bool $args
	 *
	 * @return Theme
	 */
	public function add_theme_support( $feature, $args = true ) {

		if ( $args !== true ) {
			\add_theme_support( $feature, $args );
		} else {
			\add_theme_support( $feature );
		}

		return $this;
	}

	/**
	 * @param string $feature
	 * @param bool $args
	 *
	 * @return Theme
	 */
	public function register_menus( $menus ) {
		$this->registered_menus = array_merge( $this->registered_menus, $menus );

		return $this;
	}

	public function register_sidebars( $sidebar ) {

		$this->sidebars = array_merge( $this->sidebars, $sidebar );

		return $this;
	}

	public function contentWidth( $width = 1200 ) {
		global $content_width;
		$content_width = $width;
	}
}
