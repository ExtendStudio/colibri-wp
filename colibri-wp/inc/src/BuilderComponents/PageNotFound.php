<?php
/**
 * Created by PhpStorm.
 * User: yupal
 * Date: 3/27/2019
 * Time: 10:30 AM
 */

namespace ColibriWP\Theme\BuilderComponents;


use ColibriWP\Theme\View;

class PageNotFound extends BuilderComponentBase {

	/**
	 * @return string
	 */
	protected function getName() {
		return 'main';
	}


	public function render( $parameters = array() ) {

		$self = $this;
		View::printIn( View::CONTENT_ELEMENT, function () use ( $self ) {
			/** SECTION START */
			View::printIn( View::SECTION_ELEMENT, function () use ( $self ) {
				/** ROW START */
				View::printIn( View::ROW_ELEMENT, function () use ( $self ) {
					/** COLUMN START */
					View::printIn( View::COLUMN_ELEMENT, function () use ( $self ) {
						$self->parentRender();
					} );
				}, array(
					'outer_class' => array(),
					'inner_class' => array( 'blog-content', 'gutters-col-0' )
				) );
				/** ROW END */
			} );
			/** SECTION END */
		}, array( array( 'blog-page' ) ) );
	}

	public function parentRender() {
		parent::render();
	}
}
