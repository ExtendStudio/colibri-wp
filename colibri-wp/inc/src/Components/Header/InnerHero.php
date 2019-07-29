<?php

// TODO - this should be removed - not user anymore

namespace ColibriWP\Theme\Components\Header;


use ColibriWP\Theme\View;

class InnerHero extends FrontHero {

	protected static $settings_prefix = "inner_page_hero_";
	protected static $selector        = "[data-identifier=\"inner-page-hero\"]";

	public function renderContent() {
		View::partial( "InnerHero", "Wrapper", array(
			"component" => $this,
		) );
	}

	protected static function getOptions() {
		$prefix = static::$settings_prefix;

		$style   = static::getBackgroundComponent()->getOptions();
		$content = array(
			"settings" => array_merge(
				array()
			),
		);

		$result = array_merge_recursive( $content, $style );

		return $result;
	}
}
