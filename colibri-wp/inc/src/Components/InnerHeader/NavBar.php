<?php
/**
 * Created by PhpStorm.
 * User: yupal
 * Date: 2/14/2019
 * Time: 7:07 PM
 */

namespace ColibriWP\Theme\Components\InnerHeader;

use ColibriWP\Theme\Components\FrontHeader\NavBar as FrontNavBar;
use ColibriWP\Theme\Components\Header\NavBarStyle;
use ColibriWP\Theme\Defaults;
use ColibriWP\Theme\View;


class NavBar extends FrontNavBar {
	protected static $settings_prefix = "header_post.navigation.";

	public function renderContent() {
		static::style()->renderContent();

		View::partial( "inner-header", "navigation", array(
			"component" => $this,
		) );
	}
}
