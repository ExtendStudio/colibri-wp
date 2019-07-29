<?php

namespace ColibriWP\Theme\Components;


use ColibriWP\Theme\Core\ComponentBase;
use ColibriWP\Theme\View;

class PageContent extends ComponentBase {


	public function renderContent() {

		View::printIn( View::CONTENT_ELEMENT, function () {
			View::printIn( View::SECTION_ELEMENT, function () {
				View::printIn( View::ROW_ELEMENT, function () {
					View::printIn( View::COLUMN_ELEMENT, function () {
						while ( have_posts() ) : the_post();
							get_template_part( 'template-parts/content/content', 'page' );
						endwhile;
					} );
				} );
			} );
		}, array(array('page-content')) );
	}

	/**
	 * @return array();
	 */
	protected static function getOptions() {
		return array();
	}
}
