<?php

namespace ColibriWP\Theme\Components\InnerHeader;

use ColibriWP\Theme\Components\Header\TopBar as FrontTopBar;
use ColibriWP\Theme\View;


class TopBar extends FrontTopBar {
	protected static $settings_prefix = "header_post.top_bar.";

	public function renderContent() {
		View::partial( "inner-header", "top-bar", array(
			"component" => $this,
		) );
	}
}
