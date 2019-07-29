<?php

namespace ColibriWP\Theme\Components\FrontHeader;

use ColibriWP\Theme\Core\ComponentBase;
use ColibriWP\Theme\Defaults;
use ColibriWP\Theme\Translations;
use ColibriWP\Theme\View;

class ButtonsGroup extends ComponentBase {

	protected static $settings_prefix = "header_front_page.button_group.";

	public static function selectiveRefreshSelector() {
		return Defaults::get( static::$settings_prefix . 'selective_selector', false );
	}

	public function renderContent() {

		if ( $this->mod( static::$settings_prefix . 'show' ) ) {
			View::partial( 'front-header', 'button_group', array(
				"component" => $this,
			) );
		}
	}

	public function printButtons() {
		$buttons = $this->mod( static::$settings_prefix . "value", array() );
		foreach ( $buttons as $button ) {
			$type = array_key_exists( 'button_type', $button ) ? $button['button_type'] : 0;
			View::partial( 'front-header', "buttons/button-{$type}", $button );
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
					'title'  => Translations::get( 'buttons' ),
					'panel'  => 'header_panel',
					'type'   => 'colibri_section',
					'hidden' => true
				)
			),

			"settings" => array(
				"{$prefix}show"  => array(
					'default'   => (int)Defaults::get( "{$prefix}show" ),
					'transport' => 'refresh',
					'control'   => array(
						'label'       => Translations::get( 'buttons' ),
						'type'        => 'switch',
						'show_toggle' => true,
						'section'     => "hero",
						'colibri_tab' => 'content',
					),

				),
				"{$prefix}value" => array(
					'default' => Defaults::get( "{$prefix}value" ),
					'control' => array(
						'label'          => Translations::get( 'buttons' ),
						'type'           => 'repeater',
						'input_type'     => 'textarea',
						'section'        => "{$prefix}section",
						'colibri_tab'    => 'content',
						'item_add_label' => Translations::get( 'add_button' ),
						'max'            => 2,
						'fields'         => array(
							'label' => array(
								'type'    => 'text',
								'label'   => Translations::get( 'label' ),
								'default' => Translations::get( 'button' ),
							),

							'url' => array(
								'type'    => 'text',
								'label'   => Translations::get( 'link' ),
								'default' => '#',
							),

							'button_type' => array(
								'type'    => 'select',
								'label'   => Translations::get( 'button_type' ),
								'default' => '0',
								'props'   => array(
									'options' => array(
										'0' => Translations::escHtml( "primary_button" ),
										'1' => Translations::escHtml( "secondary_button" ),
									),
								)
							),
						)
					),
				),
			),
		);
	}
}
