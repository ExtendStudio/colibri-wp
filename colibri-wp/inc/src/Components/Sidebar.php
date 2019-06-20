<?php
namespace ColibriWP\Theme\Components;


use ColibriWP\Theme\Core\ComponentBase;
use ColibriWP\Theme\View;

class Sidebar extends ComponentBase {

	public function renderContent() {
		View::partial( 'sidebar', 'post', array(
			"component" => $this,
		) );

	}

	/**
	 * @return array();
	 */
	protected static function getOptions() {
		return array();
	}
}
