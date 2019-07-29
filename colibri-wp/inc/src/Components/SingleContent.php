<?php
/**
 * Created by PhpStorm.
 * User: yupal
 * Date: 2/11/2019
 * Time: 7:02 PM
 */

namespace ColibriWP\Theme\Components;


use ColibriWP\Theme\Theme;
use ColibriWP\Theme\View;

class SingleContent extends MainContent {

	public function renderContent() {

		View::printIn( View::CONTENT_ELEMENT, function () {
			View::printIn( View::SECTION_ELEMENT, function () {
				View::printIn( View::ROW_ELEMENT, function () {
					View::printIn( View::COLUMN_ELEMENT, function () {

						Theme::getInstance()->get( 'single-template' )->render();

					} );
					Theme::getInstance()->get( 'sidebar' )->render();
				} );
			} );
		}, array( array( 'post-single' ) ) );
	}
}
