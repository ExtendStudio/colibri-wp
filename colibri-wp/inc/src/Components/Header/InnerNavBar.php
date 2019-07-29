<?php

// TODO - this should be removed - not user anymore

namespace ColibriWP\Theme\Components\Header;


use ColibriWP\Theme\Defaults;
use ColibriWP\Theme\View;

class InnerNavBar extends FrontNavBar {

	protected static $settings_prefix = "header_post.navigation.";

	protected static function getSelector() {
		return Defaults::get( static::$settings_prefix . 'selective_selector', false );
	}

	protected static function getPrefix() {
		return self :: $settings_prefix;
	}

	public function renderContent() {
		static::style()->renderContent();

		$template = static::style()->mod( 'bar_type' );
		View::partial( "NavBar", "InnerWrapper/{$template}", array(
			"component" => $this,
		) );
	}
}
