<?php
/**
 * Created by PhpStorm.
 * User: yupal
 * Date: 3/27/2019
 * Time: 10:27 AM
 */

namespace ColibriWP\Theme\Components;


use ColibriWP\Theme\Core\ComponentBase;
use ColibriWP\Theme\View;

class PageNotFound extends ComponentBase {

	public function renderContent() {

		View::printIn( View::CONTENT_ELEMENT, function () {
			View::printIn( View::SECTION_ELEMENT, function () {
				View::printIn( View::ROW_ELEMENT, function () {
					View::printIn( View::COLUMN_ELEMENT, function () {
						View::partial( 'main', '404', array(
							"component" => $this,
						) );
					} );
				} );
			} );
		}, array( array( 'post-single' ) ) );
	}


	/**
	 * @return array();
	 */
	protected static function getOptions() {
		return array();
	}
}
