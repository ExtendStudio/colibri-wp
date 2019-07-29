<?php


// TODO - this should be removed - not user anymore

namespace ColibriWP\Theme\Components\Header;


use ColibriWP\Theme\Components\CSSOutput;
use ColibriWP\Theme\Core\ComponentBase;
use ColibriWP\Theme\Defaults;
use ColibriWP\Theme\Theme;
use ColibriWP\Theme\Translations;
use ColibriWP\Theme\View;


class FrontHero extends ComponentBase {

	protected static $settings_prefix = "header_front_page.hero.";
	//protected static $selector = "[data-identifier=\"front-page-hero\"]";
	protected static $selector = "#hero";

	protected $background_component = null;

	public static function selectiveRefreshSelector() {
		return Defaults::get( static::$settings_prefix . 'selective_selector', false );
	}

	/**
	 * @return array();
	 */
	protected static function getOptions() {
		$prefix = static::$settings_prefix;

		$style   = static::getBackgroundComponent()->getOptions();
		$content = array(
			"settings" => array_merge(
				static::getGeneralContentSettings( $prefix ),
				static::getContentTextSettings( $prefix ),
				static::getContentMediaSettings( $prefix )
			),
		);

		$result = array_merge_recursive( $content, $style );

		return $result;
	}

	/**
	 * @return HeroBackground
	 */
	public static function getBackgroundComponent() {
		return HeroBackground::getInstance( static::$settings_prefix, static::$selector );
	}

	protected static function getGeneralContentSettings( $prefix ) {
        $selector = self :: $selector;

		return array(
			"{$prefix}props.heroSection.layout" => array(
				'default'   => Defaults::get( "{$prefix}props.heroSection.layout" ),
				'control'   => array(
					'label'       => Translations::get( 'hero_layout' ),
					'type'        => 'select-icon',
					'section'     => 'hero',
					'colibri_tab' => 'content',
					'choices'     => array(
						'textOnly' =>
							array(
								'tooltip' => Translations::get( 'text_only' ),
								'value'   => 'textOnly',
								'icon'    => Defaults::get( 'icons.textOnly.content' ),
							),

						'textWithMediaOnRight' =>
							array(
								'tooltip' => Translations::get( 'text_with_media_on_right' ),
								'value'   => 'textWithMediaOnRight',
								//'icon'    => $icons['logoAbove']['content'],
								'icon'    => Defaults::get( 'icons.textWithMediaOnRight.content' ),
							),

                        'textWithMediaOnLeft' =>
							array(
								'tooltip' => Translations::get( 'text_with_media_on_left' ),
								'value'   => 'textWithMediaOnLeft',
								//'icon'    => $icons['logoAbove']['content'],
								'icon'    => Defaults::get( 'icons.textWithMediaOnLeft.content' ),
							),
					),
				),
				'js_output' => array(
					array(
						'selector' => "{$selector} .h-column-container",
						'action'   => "set-css",
						'property' => 'flex-basis',
						'value'    => array(
							'logo-spacing-menu'       => 'auto',
							'logo-above-menu'         => '100%',
							'logo-menu-custom'        => 'auto',
							'menu-logo-custom'        => 'auto',
							'logo-custom-menu-bellow' => 'auto'
						),
					),
					array(
						'selector' => "{$selector} .h-column-container:nth-child(2)",
						'action'   => "set-css",
						'property' => 'display',
						'value'    => array(
							'textOnly'                       => 'none',
							'logo-textWithMediaOnRight-menu' => 'block',
							'textWithMediaOnLeft'            => 'block',
						),
					),
				),
			),
		);
	}

	protected static function getContentTextSettings( $prefix ) {
		$title_selective_refresh = array(
			"key"      => "front_page_tile",
			"function" => "printTitle",
		);

		$subtitle_selective_refresh = array(
			"key"      => "front_page_subtile",
			"function" => "printSubtitle",
		);

		$buttons_selective_refresh = array(
			"key"      => "front_page_header_buttons",
			"function" => "printButtons",
		);

		return array(

			"{$prefix}hero_title" => array(
				'default' => static::getTextsAreaDefault( "edit_this_text_in_customizer" ),
				'control' => array(
					'label'             => Translations::get( 'title' ),
					'type'              => 'input',
					'input_type'        => 'textarea',
					'section'           => 'hero',
					'colibri_tab'       => 'content',
					'active_rules'      => array(
						array(
							"setting"  => "{$prefix}hero_show_title",
							"operator" => "=",
							"value"    => true,
						),
					),
					'selective_refresh' => $title_selective_refresh,
				),
			),

			"{$prefix}hero_show_title" => array(
				'default' => Defaults::get( "hero_show_title" ),
				'control' => array(
					'label'             => Translations::get( 'show_title' ),
					'type'              => 'group',
					'show_toggle'       => true,
					'section'           => 'hero',
					'colibri_tab'       => 'content',
					'controls'          => array(
						"{$prefix}hero_title",
					),
					'selective_refresh' => $title_selective_refresh,
				),
			),

			"{$prefix}hero_subtitle" => array(
				'default' => static::getTextsAreaDefault( "edit_this_text_in_customizer" ),
				'control' => array(
					'label'             => Translations::get( 'subtitle' ),
					'type'              => 'input',
					'input_type'        => 'textarea',
					'section'           => 'hero',
					'colibri_tab'       => 'content',
					'active_rules'      => array(
						array(
							"setting" => "{$prefix}hero_show_subtitle",
							"compare" => "=",
							"value"   => true,
						),
					),
					'selective_refresh' => $subtitle_selective_refresh,
				),
			),

			"{$prefix}hero_show_subtitle" => array(
				'default' => Defaults::get( "hero_show_subtitle" ),
				'control' => array(
					'label'             => Translations::get( 'show_subtitle' ),
					'type'              => 'group',
					'section'           => 'hero',
					'colibri_tab'       => 'content',
					'show_toggle'       => true,
					"controls"          => array(
						"{$prefix}hero_subtitle",
					),
					'selective_refresh' => $subtitle_selective_refresh,
				),
			),


			"{$prefix}hero_buttons" => array(
				'default' => static::getTextsAreaDefault( "hero_buttons", array() ),
				'control' => array(
					'label'             => Translations::get( 'buttons' ),
					'type'              => 'repeater',
					'input_type'        => 'textarea',
					'section'           => 'hero',
					'colibri_tab'       => 'content',
					'item_add_label'    => Translations::get( 'add_button' ),
					'max'               => 2,
					'fields'            => array(
						'label' => array(
							'type'    => 'input',
							'label'   => Translations::get( 'label' ),
							'default' => Translations::get( 'button' ),
						),

						'url' => array(
							'type'    => 'input',
							'label'   => Translations::get( 'link' ),
							'default' => '#',
						),
					),
					'active_rules'      => array(
						array(
							"setting" => "{$prefix}hero_show_buttons",
							"compare" => "=",
							"value"   => true,
						),
					),
					'selective_refresh' => $buttons_selective_refresh,
				),
			),

			"{$prefix}hero_show_buttons" => array(
				'default' => Defaults::get( "hero_show_buttons" ),
				'control' => array(
					'label'             => Translations::get( 'show_buttons' ),
					'type'              => 'group',
					'section'           => 'hero',
					'colibri_tab'       => 'content',
					'show_toggle'       => true,
					"controls"          => array(
						"{$prefix}hero_buttons",
					),
					'selective_refresh' => $buttons_selective_refresh,
				),
			),


			"{$prefix}hero_text_width" => array(
				'default'    => Defaults::get( "hero_text_width" ),
				'control'    => array(
					'label'       => Translations::get( 'text_width' ),
					'type'        => 'slider',
					'section'     => 'hero',
					'colibri_tab' => 'content',

					'selective_refresh' => $buttons_selective_refresh,
				),
				'css_output' => array(
					array(
						'selector'      => "[" . static::getContentColumnIdentifier() . "]",
						'media'         => CSSOutput::NO_MEDIA,
						'property'      => 'max-width',
						'value_pattern' => "%s%%",
					),
					array(
						'selector'      => "[" . static::getContentColumnIdentifier() . "]",
						'media'         => CSSOutput::NO_MEDIA,
						'property'      => 'flex-basis',
						'value_pattern' => "%s%%",
					),
					array(
						'selector'      => "[" . static::getContentColumnIdentifier() . "]",
						'media'         => CSSOutput::mobileMedia(),
						'property'      => 'max-width',
						'value_pattern' => "100%%",
					),

					array(
						'selector'      => "[" . static::getContentColumnIdentifier() . "]",
						'media'         => CSSOutput::mobileMedia(),
						'property'      => 'flex-basis',
						'value_pattern' => "100%%",
					),
				),
			),

			"{$prefix}hero_text_align" => array(
				'default'    => Defaults::get( "hero_text_align" ),
				'control'    => array(
					'label'             => Translations::get( 'align' ),
					'type'              => 'button-group',
					'section'           => 'hero',
					'colibri_tab'       => 'content',
					'button_size'       => 'medium',
					'choices'           => array(
						'left'   => Translations::escHtml( "left" ),
						'center' => Translations::escHtml( "center" ),
						'right'  => Translations::escHtml( "right" ),
					),
					'selective_refresh' => $buttons_selective_refresh,
				),
				'css_output' => array(
					array(
						'selector' => array(
							"[" . static::getContentColumnIdentifier() . "] h1",
							"[" . static::getContentColumnIdentifier() . "] p",
							"[" . static::getContentColumnIdentifier() . "] .header-buttons-wrapper",
						),
						'media'    => CSSOutput::NO_MEDIA,
						'property' => 'text-align',
					),
					array(
						'selector'      => "[" . static::getContentColumnIdentifier() . "]",
						'media'         => CSSOutput::mobileMedia(),
						'property'      => 'text-align',
						'value_pattern' => "center",
					),
				),
			),

			"{$prefix}hero_text_settings" => array(
				'default' => true,
				'control' => array(
					'label'       => Translations::get( 'text_settings' ),
					'type'        => 'group',
					'section'     => 'hero',
					'colibri_tab' => 'content',
					"controls"    => array(
						"{$prefix}hero_text_width",
						"{$prefix}hero_text_align",
					),
				),
			),

		);
	}

	protected static function getTextsAreaDefault( $key, $fallback = null ) {

		if ( current_user_can( 'edit_theme_options' ) ) {
			return Defaults::get( $key, $fallback );
		}

		return $fallback;
	}

	protected static function getContentMediaSettings( $prefix ) {

		$selective_refresh = array(
			"key"      => "front_page_header_media",
			"function" => "printMedia",
		);

		return array(
			"{$prefix}hero_media_type" => array(
				'default' => Defaults::get( "hero_media_type" ),
				'control' => array(
					'label'                   => Translations::get( 'media_type' ),
					'type'                    => 'select',
					'section'                 => 'hero',
					'colibri_tab'             => 'content',
					'inline_content_template' => true,
					'choices'                 => array(
						'image' => Translations::escHtml( "image" ),
					),
					'active_rules'            => array(
						array(
							"setting"  => "{$prefix}props.heroSection.layout",
							"operator" => "!=",
							"value"    => "textOnly",
						),
					),
					'selective_refresh'       => $selective_refresh,
				),
			),


			"{$prefix}hero_media_image" => array(
				'default' => Defaults::get( "hero_media_image" ),
				'control' => array(
					'label'             => Translations::get( 'image' ),
					'type'              => 'image',
					'section'           => 'hero',
					'colibri_tab'       => 'content',
					'active_rules'      => array(
						array(
							"setting"  => "{$prefix}props.heroSection.layout",
							"operator" => "!=",
							"value"    => "textOnly",
						),

						array(
							"setting"  => "{$prefix}hero_media_type",
							"operator" => "=",
							"value"    => "image",
						),
					),
					'selective_refresh' => $selective_refresh,
				),
			),

			"{$prefix}hero_media_image_settings" => array(
				'default' => true,
				'control' => array(
					'label'        => Translations::get( 'media_settings' ),
					'type'         => 'group',
					'section'      => 'hero',
					'show_toggle'  => false,
					'controls'     => array(
						"{$prefix}hero_media_type",
						"{$prefix}hero_media_image",
					),
					'colibri_tab'  => 'content',
					'active_rules' => array(
						array(
							"setting"  => "{$prefix}props.heroSection.layout",
							"operator" => "!=",
							"value"    => "textOnly",
						),
					),
				),
			),

		);
	}

	public function renderContent() {

		View::partial( "FrontHero", "Wrapper", array(
			"component" => $this,
		) );
	}

	public function printIdentifiers() {
		$selector = trim( static::$selector, "[]" );

		echo $selector . " ";
		$this->printSelectiveSelector();
	}

	public function printBackground() {
		static::getBackgroundComponent()->render();
	}

	public function printFirstColumn() {
		$columns = $this->getColumns();
		$this->printColumn( $columns['first'] );

	}

	public function printSecondColumn() {
		$columns = $this->getColumns();
		$this->printColumn( $columns['second'] );

	}

	private function getColumns() {
		$result = array(
			'first'  => 'content',
			'second' => 'media',
		);

		$layout = $this->prefixedMod( 'props.heroSection.layout' );
		switch ( $layout ) {
			case "textOnly":
				$result['second'] = null;
				break;
			case "textWithMediaOnLeft":
			    break;
			case "textWithMediaAbove":
				$result = array(
					'first'  => 'media',
					'second' => 'content',
				);
				break;
		}

		return $result;
	}

	public function prefixedMod( $name ) {
		$name = static::$settings_prefix . $name;

		return $this->mod( $name );
	}

	private function printColumn( $type ) {
		if ( $type === "content" ) {
			$this->printContentArea();
		}

		if ( $type === "media" ) {
			$this->printMediaArea();
		}
	}

	public function printContentArea() {
		View::partial( "FrontHero", "ContentColumn", array(
			"component" => $this,
		) );
	}

	public function printMediaArea() {
		View::partial( "FrontHero", "MediaColumn", array(
			"component" => $this,
		) );
	}


	private function _printTitle( $class = "", $display = "block" ) {
		$class .= ' hero-title';
		?>
        <h1 class="<?php echo esc_attr( $class ); ?>"
            style="display: <?php echo esc_attr( $display ); ?>;" <?php $this->printSelectiveSelector( "front_page_tile",
			"hide" ); ?> >
			<?php echo $this->prefixedMod( 'hero_title' ); ?>
        </h1>
		<?php
	}


	public function printTitle( $class = "" ) {

		if ( Theme::getInstance()->getCustomizer()->isInPreview() ) {
			$show = $this->prefixedMod( 'hero_show_title' );
			$this->_printTitle( $class, $show ? "block" : "none" );
		} else {
			if ( $this->prefixedMod( 'hero_show_title' ) ) {
				$this->_printTitle( $class );
			}
		}

	}

	private function _printSubtitle( $class = "", $display = "block" ) {
		$class .= ' header-subtitle';
		?>
        <p class="<?php echo esc_attr( $class ); ?>"
           style="display: <?php echo esc_attr( $display ); ?>;" <?php $this->printSelectiveSelector( "front_page_subtile",
			"hide" ); ?> >
			<?php echo $this->prefixedMod( 'hero_subtitle' ); ?>
        </p>
		<?php
	}

	public function printSubtitle( $class = "" ) {

		if ( Theme::getInstance()->getCustomizer()->isInPreview() ) {
			$show = $this->prefixedMod( 'hero_show_subtitle' );
			$this->_printSubtitle( $class, $show ? "block" : "none" );
		} else {
			if ( $this->prefixedMod( 'hero_show_subtitle' ) ) {
				$this->_printSubtitle( $class );
			}
		}
	}

	public function printButtonsTemplate() {
		if ( $this->prefixedMod( 'hero_show_buttons' ) ) {
			View::partial( "FrontHero", "ButtonsTemplate", array(
				"component" => $this,
			) );
		}
	}

	public function printButtons() {
		if ( $this->prefixedMod( 'hero_show_buttons' ) ) {

			foreach ( (array) $this->prefixedMod( 'hero_buttons' ) as $button ) {
				View::partial( "FrontHero", "Button", array(
					"url"   => $button['url'],
					"label" => $button['label'],
				) );
			}

		}
	}

	public function printMedia() {
		?>
        <img <?php $this->printSelectiveSelector( "front_page_header_media", "hide" ); ?>
                src="<?php echo esc_attr( $this->prefixedMod( "hero_media_image" ) ); ?>"
                class="wp-image- style-23-image style-local-11-h-23-image">
		<?php
	}

	public static function getMediaColumnIdentifier() {
		return "data-identifier='front-media-column'";
	}

	public static function getContentColumnIdentifier() {
		return "data-identifier='front-content-column'";
	}

	public function printMediaColumnIdentifier() {
		echo static::getMediaColumnIdentifier();
	}

	public function printContentColumnIdentifier() {
		echo static::getContentColumnIdentifier();
	}

	public static function getMainRowIdentifier() {
		return "data-identifier='front-media-main-row'";
	}

	public function printMainRowIdentifier() {
		echo static::getMainRowIdentifier();
	}

}
