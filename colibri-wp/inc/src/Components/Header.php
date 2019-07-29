<?php


namespace ColibriWP\Theme\Components;


use ColibriWP\Theme\Core\ComponentBase;
use ColibriWP\Theme\Core\Hooks;
use ColibriWP\Theme\Theme;
use ColibriWP\Theme\Translations;
use ColibriWP\Theme\View;

class Header extends ComponentBase {

	protected static function getOptions() {
		return array(
			"settings" => array(),

			"sections" => array(
				"top_bar" => array(
					'title'    => Translations::get( 'top_bar_settings' ),
					'priority' => 0,
					'panel'    => 'header_panel',
					'type'     => 'colibri_section',
				),

				"nav_bar" => array(
					'title'    => Translations::get( 'nav_settings' ),
					'priority' => 0,
					'panel'    => 'header_panel',
					'type'     => 'colibri_section',
				),

				"hero" => array(
					'title'    => Translations::get( 'hero_settings' ),
					'priority' => 0,
					'panel'    => 'header_panel',
					'type'     => 'colibri_section',
				),
			),

			"panels" => array(
				"header_panel" => array(
					'priority' => 1,
					'title'    => Translations::get( 'header_sections' ),
					'type'     => 'colibri_panel',
				),
			),
		);
	}

	/**
	 * @throws \Exception
	 */
	public function renderContent() {

		Hooks::colibri_do_action( 'before_header' );
		$header_class = View::isFrontPage() ? "header-front-page" : "header-inner-page";

		?>
        <div class="header <?php echo $header_class; ?>">
			<?php View::isFrontPage() ? $this->renderFrontPageFragment() : $this->renderInnerPageFragment(); ?>
        </div>
		<?php
	}

	/**
	 * @throws \Exception
	 */
	private function renderFrontPageFragment() {

		//Theme::getInstance()->get( 'top-bar' )->render();
		Theme::getInstance()->get( 'front-nav-bar' )->render();
		Theme::getInstance()->get( 'front-hero' )->render();
	}

	private function renderInnerPageFragment() {
		//Theme::getInstance()->get( 'top-bar' )->render();
		Theme::getInstance()->get( 'inner-nav-bar' )->render();
		Theme::getInstance()->get( 'inner-hero' )->render();
	}


	public function getRenderData() {
		return array(
			'mods' => $this->mods(),
		);
	}
}
