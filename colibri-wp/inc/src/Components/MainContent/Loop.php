<?php
namespace ColibriWP\Theme\Components\MainContent;

use ColibriWP\Theme\Core\ComponentBase;
use ColibriWP\Theme\Defaults;
use ColibriWP\Theme\Theme;
use ColibriWP\Theme\View;
use ColibriWP\Theme\Translations;

class Loop extends ComponentBase {

	protected static function getOptions() {
		return array();
	}

	public function renderContent() {
		if ( have_posts() ):
			while ( have_posts() ):
				the_post();

				View::partial( "main", "item_template", array(
					"component" => $this,
				) );

			endwhile;
		else:
			View::partial( 'main', '404', array(
				"component" => $this,
			) );
		endif;
	}
}
