<?php
/**
 * Created by PhpStorm.
 * User: Extend Studio
 * Date: 2/19/2019
 * Time: 6:38 PM
 */

namespace ColibriWP\Theme\Components\Header;


use ColibriWP\Theme\Core\ComponentBase;

class Navigation extends ComponentBase {

	public function renderContent() {
		View::partial( "front-header", "navigation", array(
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
