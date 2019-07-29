<?php


// TODO - this should be removed - not user anymore

namespace ColibriWP\Theme\Components\Footer;


use ColibriWP\Theme\Components\CSSOutput;
use ColibriWP\Theme\Core\ComponentBase;
use ColibriWP\Theme\Defaults;
use ColibriWP\Theme\Translations;
use ColibriWP\Theme\View;


class FrontFooter extends ComponentBase {

	protected static $settings_prefix = "footer_post.footer.";
	//protected static $selector = "[data-identifier=\"front-page-footer\"]";
	protected static $selector = ".page-footer";

	protected $background_component = null;

	public static function selectiveRefreshSelector() {
		return Defaults::get( static::$settings_prefix . 'selective_selector', false );
	}

	/**
	 * @return array();
	 */
	protected static function getOptions() {
		$prefix = static::$settings_prefix;

		return array(
			"sections" => array(
				"{$prefix}section" => array(
					'title'  => Translations::get( 'title' ),
					'panel'  => 'footer_panel',
					'type'   => 'colibri_section',
					'hidden' => true
				)
			),

			"settings" => array(
				"{$prefix}props.useFooterParallax" => array(
					'default'   => (int) Defaults::get( "{$prefix}props.useFooterParallax" ),
					'transport' => 'refresh',
					'control'   => array(
						'label'       => Translations::get( 'footer_parallax' ),
						'type'        => 'switch',
						'show_toggle' => true,
						'section'     => "footer",
						'colibri_tab' => 'content',
					),
					'js_output' => array(
    					array(
							'selector' => ".page-footer",
							'action'   => "colibri-component-toggle",
							'value'    => 'footerParallax'
						),
					),
				),
			),
		);
	}

	public function printParalaxJsToggle() {
		$prefix = static::$settings_prefix;
		$parallax = $this->mod( "{$prefix}props.useFooterParallax", false );
		if ($parallax === false || $parallax === "")
		{
			$disable_parallax_js = <<<JS
			jQuery(window).load(function ()
			{
				var el = jQuery(".page-footer");
			    var component = el.data()['fn.colibri.footerParallax'];
			    if (component) {
					    component.stop();
			    }
			});
JS;
			wp_add_inline_script( 'wp-embed', $disable_parallax_js );
		}

	}

	public function renderContent() {

		View::partial( "front-footer", "footer", array(
			"component" => $this,
		) );
	}
}
