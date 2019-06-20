<?php
/**
 * Created by PhpStorm.
 * User: yupal
 * Date: 2/11/2019
 * Time: 11:11 AM
 */

namespace ColibriWP\Theme\BuilderComponents;


use ColibriWP\Theme\Core\ComponentBase;

class FrontPageContent extends ComponentBase {

	public function renderContent() {
		?>
        <div class="page-content">
            <div class="content">
				<?php
				while ( have_posts() ) : the_post();
					the_content();
				endwhile;
				?>
            </div>
        </div>
		<?php
	}

	/**
	 * @return array();
	 */
	protected static function getOptions() {
		return array();
	}
}
