<?php

namespace ColibriWP\Theme\Components\Header;

use ColibriWP\Theme\Core\ComponentBase;
use ColibriWP\Theme\Core\Hooks;
use ColibriWP\Theme\Defaults;
use ColibriWP\Theme\Components\CSSOutput;
use ColibriWP\Theme\Translations;
use ColibriWP\Theme\View;

class TopBar extends ComponentBase {

	protected static $settings_prefix = "header_front_page.top_bar.";
	private $attrs = array();

	public static function selectiveRefreshSelector() {
		return Defaults::get( static::$settings_prefix . 'selective_selector', false );
	}

	public function __construct( $attrs = array() ) {
	}

	protected static function getOptions() {
		$prefix  = static::$settings_prefix;
		$section = 'nav_bar';

		return array(
			"settings" => array(
				"{$prefix}props.showTopBar" => array(
					'default'    => Defaults::get( "{$prefix}props.showTopBar" ),
					'control'    => array(
						'label'       => Translations::get( 'show_top_bar' ),
						'type'        => 'switch',
						'section'     => $section,
						'colibri_tab' => 'content',
						'priority'    => 12
					),
					'css_output' => array(
						array(
							'selector'    => static::selectiveRefreshSelector(),
							'property'    => 'display',
							'true_value'  => 'block',
							'false_value' => 'none',
						),
					),
				),
			),
		);
	}

	public function renderContent() {
		View::partial( 'front-header', 'top-bar', array(
			"component" => $this,
		) );
	}

}
