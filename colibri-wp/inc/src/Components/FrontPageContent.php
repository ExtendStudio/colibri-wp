<?php
/**
 * Created by PhpStorm.
 * User: yupal
 * Date: 2/11/2019
 * Time: 11:14 AM
 */

namespace ColibriWP\Theme\Components;


use ColibriWP\Theme\Core\ComponentBase;
use ColibriWP\Theme\Translations;

class FrontPageContent extends ComponentBase {

	protected static function getOptions() {
		$prefix = 'page_content_';

		return array(
			"sections" => array(
				"{$prefix}section" => array(
					'title' => Translations::get( 'content_settings' ),
					'panel' => 'content_panel',
					'type'  => 'colibri_section',
				)
			),

			"settings" => array(
				"{$prefix}pen" => array(
					'control' => array(
						'type'        => 'pen',
						'section'     => "{$prefix}section",
						'colibri_tab' => 'content',
					),

				),

				"{$prefix}plugin-content" => array(
					'control' => array(
						'type'        => 'plugin-message',
						'section'     => "{$prefix}section",
						'colibri_tab' => 'content',
					)
				),

			),

			"panels" => array(
				"content_panel" => array(
					'priority' => 2,
					'title'    => Translations::get( 'content_sections' ),
					'type'     => 'colibri_panel',
				),
			),
		);
	}

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


}
