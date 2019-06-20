<?php
/**
 * Created by PhpStorm.
 * User: yupal
 * Date: 2/14/2019
 * Time: 6:30 PM
 */

namespace ColibriWP\Theme\Components\FrontHeader;


use ColibriWP\Theme\Components\CSSOutput;
use ColibriWP\Theme\Components\Header\HeroStyle;
use ColibriWP\Theme\Core\ComponentBase;
use ColibriWP\Theme\Defaults;
use ColibriWP\Theme\Translations;
use ColibriWP\Theme\View;

class Hero extends ComponentBase {

	protected static $settings_prefix = "header_front_page.hero.";
	protected static $selector = '#hero';

	/**
	 * @param bool $include_content_settings
	 *
	 * @return array
	 */
	protected static function getOptions( $include_content_settings = true ) {

		$prefix = static::$settings_prefix;
		$result = array(
			'settings' => array(
				"{$prefix}.pen" => array(
					'control' => array(
						'type'    => 'pen',
						'section' => 'hero',
					)
				)
			)
		);

		$background_settings = static::getStyleComponent()->getOptions();

		$result = array_merge_recursive( $result, $background_settings );

		if ( $include_content_settings ) {
			$content = array(
				"settings" => static::getGeneralContentSettings( $prefix )
			);
			$result  = array_merge_recursive( $content, $result );
		}

		return $result;

	}

	public static function getStyleComponent() {
		return HeroStyle::getInstance( static::$settings_prefix,
			static::selectiveRefreshSelector() );
	}

	public static function selectiveRefreshSelector() {
		return Defaults::get( static::$settings_prefix . 'selective_selector', false );
	}

	protected static function getGeneralContentSettings( $prefix ) {

		$selector = static::$selector;

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
								'label'   => Translations::get( 'text_only' ),
								'value'   => 'textOnly',
								'icon'    => Defaults::get( 'icons.textOnly.content' ),
							),

						'textWithMediaOnRight' =>
							array(
								'tooltip' => Translations::get( 'text_with_media_on_right' ),
								'label'   => Translations::get( 'text_with_media_on_right' ),
								'value'   => 'textWithMediaOnRight',
								'icon'    => Defaults::get( 'icons.textWithMediaOnRight.content' ),
							),

						'textWithMediaOnLeft' =>
							array(
								'tooltip' => Translations::get( 'text_with_media_on_left' ),
								'label'   => Translations::get( 'text_with_media_on_left' ),
								'value'   => 'textWithMediaOnLeft',
								'icon'    => Defaults::get( 'icons.textWithMediaOnLeft.content' ),
							),
					),
				),
				'js_output' => array(
					array(
						'selector' => "{$selector} .h-column-container",
						'action'   => "set-css",
						'property' => 'width',
						'value'    => array(
							'textOnly'             => '100%',
							'textWithMediaOnRight' => '50%',
							'textWithMediaOnLeft'  => '50%',
						),
					),
					array(
						'selector' => "{$selector} .h-column-container:nth-child(1)",
						'action'   => "set-css",
						'property' => 'order',
						'value'    => array(
							'textOnly'             => '0',
							'textWithMediaOnRight' => '0',
							'textWithMediaOnLeft'  => '1',
						),
					),
					array(
						'selector' => "{$selector} .h-column-container:nth-child(2)",
						'action'   => "set-css",
						'property' => 'display',
						'value'    => array(
							'textOnly'             => 'none',
							'textWithMediaOnRight' => 'block',
							'textWithMediaOnLeft'  => 'block',
						),
					),
				),
			),

			"{$prefix}separator1" => array(
				'default' => '',
				'control' => array(
					'label'       => '',
					'type'        => 'separator',
					'section'     => 'hero',
					'colibri_tab' => 'content',
				),
			),

			"{$prefix}hero_column_width" => array(
				'default'    => Defaults::get( "{$prefix}hero_column_width" ),
				'control'    => array(
					'label'       => Translations::get( 'hero_column_width' ),
					'type'        => 'slider',
					'section'     => 'hero',
					'colibri_tab' => 'content',
					'min'         => 0,
					'max'         => 100,
				),
				'css_output' => array(
					array(
						"selector"      => "{$selector} .h-section-grid-container .h-column-container:first-child",
						"property"      => "width",
						'media'         => CSSOutput::NO_MEDIA,
						'value_pattern' => '%s%% !important',
					),
					array(
						"selector"      => "{$selector} .h-section-grid-container .h-column-container:nth-child(2)",
						"property"      => "width",
						'media'         => CSSOutput::NO_MEDIA,
						'value_pattern' => 'calc(100%% - %s%%) !important',
					),
				),
			),

			"{$prefix}separator2" => array(
				'default' => '',
				'control' => array(
					'label'       => '',
					'type'        => 'separator',
					'section'     => 'hero',
					'colibri_tab' => 'content',
				),
			),

		);
	}

	public function renderContent() {
		?>
        <style>
            <?php echo $this->getHeroLayoutStyle(); ?>
        </style>

		<?php if ( \is_customize_preview() ): ?>
            <script type="text/javascript">
                function setHeroEditButtonTop() {
                    var top = '0px !important';
                    var overlap = jQuery("[data-colibri-navigation-overlap]").hasClass('h-navigation_overlap');
                    if (overlap) {
                        top = jQuery("#hero").css('padding-top');
                    }
                    var button = jQuery("#hero").children('.customize-partial-edit-shortcut');
                    button.attr('style', "top:" + top + " !important");
                }

                jQuery(window).on(
                    'resize.overlap', setHeroEditButtonTop);

                jQuery(window).load(function () {
                    setTimeout(setHeroEditButtonTop, 1000);
                    setTimeout(setHeroEditButtonTop, 2500);
                });
            </script>
		<?php endif; ?>

		<?php

		View::partial( "front-header", "hero", array(
			"component" => $this,
		) );
	}

	public function getHeroLayoutStyle() {
		$selector   = static::$selector;
		$layoutType = $this->mod( static::$settings_prefix . 'props.heroSection.layout' );
		$css        = '';

		switch ( $layoutType ) {

			case 'textOnly':
				$css .= "{$selector} .h-column-container { width: 100%; }" .
				        "{$selector} .h-column-container:nth-child(1) { order:0; }" .
				        "{$selector} .h-column-container:nth-child(2) {  display: none; }";
				break;
			case 'textWithMediaOnRight':
				$css .= "{$selector} .h-column-container { width: 50%; }" .
				        "{$selector} .h-column-container:nth-child(1) { order:0; }" .
				        "{$selector} .h-column-container:nth-child(2) { display: block; }";
				break;
			case 'textWithMediaOnLeft':
				$css .= "{$selector} .h-column-container { width: 100%; }" .
				        "{$selector} .h-column-container:nth-child(1) { order:1; }" .
				        "{$selector} .h-column-container:nth-child(2) { display: block; }";
				break;
		}

		return $css;
	}

	public function printSelectiveSelector( $selector ) {
		return Defaults::get( static::$settings_prefix . $selector . '.selective_selector', false );
	}

	public function printBackground() {
		static::getStyleComponent()->render();
	}

	public function printSeparator() {
		$prefix         = static::$settings_prefix;
		$divider_prefix = "{$prefix}style.separatorBottom.";
		$enabled        = $this->mod( "{$divider_prefix}enabled", false );
		if ( $enabled ) {
			$height = $this->mod( "{$divider_prefix}height.value", 100 );
			$color  = $this->mod( "{$divider_prefix}color", '#fff' );
			$style  = $this->mod( "{$divider_prefix}type", 'mountains' );

			$divider_style = Defaults::get( 'divider_style' );

			$svg = '';
			if ( isset( $divider_style[ $style ] ) ) {
				$svg = $divider_style[ $style ];
			}

			//set color
			$svg = str_replace( '<path',
				'<path style="background-color:' . esc_attr( $color ) . ';fill:' . esc_attr( $color ) . ';" class="svg-white-bg"',
				$svg );
			//flip for bottom
			$svg       = str_replace( '<svg ', '<svg style="transform:rotateX(180deg);" ', $svg );
			$separator = "<div class='h-separator' style='height:{$height}px; bottom: -1px;'>$svg</div>";

			echo $separator;
		}
	}
}
