<?php

namespace ColibriWP\Theme\Components\FrontHeader;

use ColibriWP\Theme\Core\ComponentBase;
use ColibriWP\Theme\Defaults;
use ColibriWP\Theme\Translations;
use ColibriWP\Theme\View;

class TopBarListIcons extends ComponentBase {

	protected static $settings_prefix = "header_front_page.icon_list.";

	public static function selectiveRefreshSelector() {
		return Defaults::get( static::$settings_prefix . 'selective_selector', false );
	}

	public function renderContent() {
		View::partial( 'front-header', 'top-bar/list-icons', array(
			"component" => $this,
		) );
	}

	public function printIcons() {
		$icons = $this->mod( static::$settings_prefix . 'localProps.iconList', array() );
		if ($icons) {
			$count = count($icons);
			$i = 0;
			foreach ( $icons as $icon ) {
				if ($i == 0) {
					$name = 'first';
				} else if ($i == $count - 1) {
					$name = 'last';
				} else
				{
					$name = 'middle';
				}
				$i++;
				View::partial( 'front-header', "top-bar/list-icon-$name", $icon );
			}
		}
	}


	/**
	 * @return array();
	 */
	protected static function getOptions() {
		$prefix = static::$settings_prefix;

		return array(
			"sections" => array(
				"{$prefix}section" => array(
					'title'  => Translations::get( 'icons' ),
					'panel'  => 'header_panel',
					'type'   => 'colibri_section',
					'hidden' => true
				)
			),

			"settings" => array(

				"{$prefix}localProps.iconList" => array(
					'default' => Defaults::get( "{$prefix}localProps.iconList" ),
					'control' => array(
						'label'          => Translations::get( 'icons' ),
						'type'           => 'repeater',
						'input_type'     => 'textarea',
						'section'        => "{$prefix}section",
						'colibri_tab'    => 'content',
						'item_add_label' => Translations::get( 'add_item' ),
						'max'            => 10,
						'fields'         => array(
							'text' => array(
								'type'    => 'text',
								'label'   => Translations::get( 'text' ),
								'default' => Translations::get( 'text' ),
							),

							'icon' => array(
								'type'    => 'icon',
								'label'   => Translations::get( 'icon' ),
								'default' =>Defaults::get('icons.facebook'),
							),

							'link_value' => array(
								'type'    => 'text',
								'label'   => Translations::get( 'link' ),
								'default' => '#',
							),

						)
					),
				),
			),
		);
	}
}
