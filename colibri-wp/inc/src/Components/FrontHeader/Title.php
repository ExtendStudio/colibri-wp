<?php
/**
 * Created by PhpStorm.
 * User: yupal
 * Date: 2/14/2019
 * Time: 6:34 PM
 */

namespace ColibriWP\Theme\Components\FrontHeader;


use ColibriWP\Theme\Core\ComponentBase;
use ColibriWP\Theme\Defaults;
use ColibriWP\Theme\Translations;
use ColibriWP\Theme\View;

class Title extends ComponentBase {

	protected static $settings_prefix = "header_front_page.title.";

	public static function selectiveRefreshSelector() {
		return Defaults::get( static::$settings_prefix . 'selective_selector', false );
	}

	public function renderContent() {

		if ( $this->mod( static::$settings_prefix . 'show' ) ) {
			View::partial( 'front-header', 'title', array(
				"component" => $this,
			) );
		}
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
					'panel'  => 'header_panel',
					'type'   => 'colibri_section',
					'hidden' => true
				)
			),

			"settings" => array(
				"{$prefix}show"  => array(
					'default'   => (int)Defaults::get( "{$prefix}show" ),
					'transport' => 'refresh',
					'control'   => array(
						'label'       => Translations::get( 'show_title' ),
						'type'        => 'switch',
						'show_toggle' => true,
						'section'     => "hero",
						'colibri_tab' => 'content',
					),

				),
				"{$prefix}localProps.content" => array(
					'default' => Defaults::get( "edit_this_text_in_customizer" ),
					'control' => array(
						'label'       => Translations::get( 'title' ),
						'type'        => 'input',
						'input_type'  => 'textarea',
						'section'     => "{$prefix}section",
						'colibri_tab' => "content",
					),
				)
			),
		);
	}

	public function printTitle($shortcode = '') {

		$prefix = static::$settings_prefix;
		echo $this->mod( "{$prefix}localProps.content" );
	}
}
