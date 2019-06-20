<?php
/**
 * Created by PhpStorm.
 * User: Extend Studio
 * Date: 2/19/2019
 * Time: 6:24 PM
 */

namespace ColibriWP\Theme\Components\Header;


use ColibriWP\Theme\Components\CSSOutput;
use ColibriWP\Theme\Core\ComponentBase;
use ColibriWP\Theme\Defaults;
use ColibriWP\Theme\Translations;
use ColibriWP\Theme\View;

class HeaderMenu extends ComponentBase {

	protected static $settings_prefix = "header_front_page.header-menu.";
	private $attrs = array();

	public function __construct() {
		$prefix  = static::$settings_prefix;
		$classes = static::mod( "{$prefix}props.hoverEffect.type" );
		if ( strpos( $classes, 'bordered-active-item' ) !== - 1 ) {
			$classes .= ' bordered-active-item ';
		}

		$classes .= ' ' . static::mod( "{$prefix}props.hoverEffect.group.border.transition" );

		$defaultAttrs = array(
			'id'                 => "header-menu",
			'classes'            => $classes,
			'show_shopping_cart' => '0',
		);

		$this->attrs = $defaultAttrs;
	}

	public static function selectiveRefreshSelector() {
		return Defaults::get( static::$settings_prefix . 'selective_selector', false );
	}

	protected static function getOptions() {
		$prefix   = static::$settings_prefix;
		$settings = array_merge(
			static::getContentOptions(),
			static::getStyleOptions()
		);

		return array(
			"sections" => array(
				"{$prefix}section" => array(
					'title'  => Translations::get( 'menu' ),
					'panel'  => 'header_panel',
					'type'   => 'colibri_section',
					'hidden' => true
				)
			),

			"settings" => $settings,
		);
	}

	/**
	 * @return array();
	 */
	protected static function getContentOptions() {
		$prefix   = static::$settings_prefix;
		$selector = '[data-colibri-component="dropdown-menu"]';

		$menu_choices = array( 0 => Translations::get( 'no_menu' ) );
		$menus        = wp_get_nav_menus();
		foreach ( $menus as $menu ) {
			$menu_choices[ (string) $menu->term_id ] = $menu->name;
		}

		return array(

			"{$prefix}edit" => array(
				'default'   => Defaults::get( "{$prefix}value" ),
				'control'   => array(
					'label'       => Translations::get( 'edit_menu_structure' ),
					'type'        => 'button',
					'section'     => "{$prefix}section",
					'colibri_tab' => "content",
				),
				'js_output' => array(
					array(
						'selector' => "#navigation",
						'action'   => "focus",
						'value'    => array(
							'entity'    => 'panel',
							'entity_id' => 'nav_menus',
						),
					),
				),
			),

			"{$prefix}style.descendants.innerMenu.justifyContent" => array(
				'default'    => Defaults::get( "{$prefix}style.descendants.innerMenu.justifyContent" ),
				'control'    => array(
					'label'       => Translations::escHtml( "button_align" ),
					'type'        => 'align-button-group',
					'button_size' => 'medium',
					//labels are used as values for align-button-group
					'choices'     => array(
						'flex-start' => 'left',
						'center'     => 'center',
						'flex-end'   => 'right',
					),
					'none_value'  => 'flex-start',
					'section'     => "{$prefix}section",
					'colibri_tab' => "content",
				),
				'css_output' => array(
					array(
						'selector'      => "$selector ul",
						'media'         => CSSOutput::NO_MEDIA,
						'property'      => 'justify-content',
						'value_pattern' => '%s !important',
					),
				),
			),

			"{$prefix}props.showOffscreenMenuOn" => array(
				'default' => Defaults::get( "{$prefix}props.showOffscreenMenuOn" ),
				'control' => array(
					'label'       => Translations::get( 'show_offscreen_menu_on' ),
					'type'        => 'select',
					'section'     => "{$prefix}section",
					'colibri_tab' => "content",
					'choices'     => array(
						'has-offcanvas-mobile'  => Translations::escHtml( "mobile" ),
						'has-offcanvas-tablet'  => Translations::escHtml( "mobile_tablet" ),
						'has-offcanvas-desktop' => Translations::escHtml( "mobile_tablet_desktop" ),
						'has-offcanvas-none'    => Translations::escHtml( "none" ),
					),
				),
			),
		);
	}

	/**
	 * @return array();
	 */
	protected static function getStyleOptions() {
		$prefix   = static::$settings_prefix;
		$selector = '[data-colibri-component="dropdown-menu"]';

		return array(

			"{$prefix}props.hoverEffect.type" => array(
				'default'   => Defaults::get( "{$prefix}props.hoverEffect.type" ),
				'control'   => array(
					'label'       => Translations::get( 'button_highlight_type' ),
					'type'        => 'select',
					'linked_to'   => "{$prefix}props.hoverEffect.group.border.transition",
					'section'     => "{$prefix}section",
					'colibri_tab' => "style",
					'choices'     => array(
						'none'                                                      => Translations::escHtml( "none" ),
						'bordered-active-item bordered-active-item--bottom'         => Translations::escHtml( "bottom_line" ),
						'bordered-active-item bordered-active-item--top'            => Translations::escHtml( "top_line" ),
						'bordered-active-item bordered-active-item--top-and-bottom' => Translations::escHtml( "double_line" ),
						'solid-active-item'                                         => Translations::escHtml( "background" ),
					),
				),
				'js_output' => array(
					array(
						'selector' => "$selector ul",
						'action'   => "set-class",
					),
				),
			),

			"{$prefix}props.hoverEffect.activeGroup" => array(
				'default' => 'border',
				'control' => array(
					'label'       => "&nbsp;",
					'type'        => 'hidden',
					'section'     => "{$prefix}section",
					'colibri_tab' => "style",
				)
			),

			"{$prefix}props.hoverEffect.group.border.transition" => array(
				'default'   => Defaults::get( "{$prefix}props.hoverEffect.group.border.transition" ),
				'control'   => array(
					'label'       => Translations::get( 'button_hover_effect' ),
					'type'        => 'linked-select',
					'linked_to'   => "{$prefix}props.hoverEffect.type",
					//'hide_on'   => 'none',
					'section'     => "{$prefix}section",
					'colibri_tab' => "style",
					'choices'     =>
						array(
							'bordered-active-item bordered-active-item--bottom'         => array(
								'effect-none'                          => Translations::escHtml( "none" ),
								'effect-borders-in'                    => Translations::escHtml( "drop_in" ),
								'effect-borders-out'                   => Translations::escHtml( "drop_out" ),
								'effect-borders-grow grow-from-left'   => Translations::escHtml( "grow_from_left" ),
								'effect-borders-grow grow-from-right'  => Translations::escHtml( "grow_from_right" ),
								'effect-borders-grow grow-from-center' => Translations::escHtml( "grow_from_center" ),
							),
							'bordered-active-item bordered-active-item--top'            => array(
								'effect-none'                          => Translations::escHtml( "none" ),
								'effect-borders-in'                    => Translations::escHtml( "drop_in" ),
								'effect-borders-out'                   => Translations::escHtml( "drop_out" ),
								'effect-borders-grow grow-from-left'   => Translations::escHtml( "grow_from_left" ),
								'effect-borders-grow grow-from-right'  => Translations::escHtml( "grow_from_right" ),
								'effect-borders-grow grow-from-center' => Translations::escHtml( "grow_from_center" ),
							),
							'bordered-active-item bordered-active-item--top-and-bottom' => array(
								'effect-none'                          => Translations::escHtml( "none" ),
								'effect-borders-in'                    => Translations::escHtml( "drop_in" ),
								'effect-borders-out'                   => Translations::escHtml( "drop_out" ),
								'effect-borders-grow grow-from-left'   => Translations::escHtml( "grow_from_left" ),
								'effect-borders-grow grow-from-right'  => Translations::escHtml( "grow_from_right" ),
								'effect-borders-grow grow-from-center' => Translations::escHtml( "grow_from_center" ),
							),
							'solid-active-item'                                         => array(
								'solid-active-item effect-none'                    => Translations::escHtml( "none" ),
								'solid-active-item effect-pull-up'                 => Translations::escHtml( "grow_up" ),
								'solid-active-item effect-pull-down'               => Translations::escHtml( "grow_down" ),
								'solid-active-item effect-pull-left'               => Translations::escHtml( "grow_left" ),
								'solid-active-item effect-pull-right'              => Translations::escHtml( "grow_right" ),
								'solid-active-item effect-pull-up-down'            => Translations::escHtml( "shutter_in_horizontal" ),
								'solid-active-item effect-pull-up-down-reverse'    => Translations::escHtml( "shutter_out_horizontal" ),
								'solid-active-item effect-pull-left-right'         => Translations::escHtml( "shutter_in_vertical" ),
								'solid-active-item effect-pull-left-right-reverse' => Translations::escHtml( "shutter_out_vertical" ),
							)
						),
				),
				'js_output' => array(
					array(
						'selector' => "$selector ul",
						'action'   => "set-class",
					),
				),
			),
		);
	}

	public function getPenPosition() {
		return static::PEN_ON_RIGHT;
	}

	public function renderContent() {
		View::partial( 'front-header', 'header-menu', array(
			"component" => $this,
		) );
	}

	public function printHeaderMenu() {
		$theme_location         = $this->attrs['id'];
		$customClasses          = $this->attrs['classes'];
		$drop_down_menu_classes = apply_filters( 'colibri_primary_drop_menu_classes', array( 'colibri-menu' ) );
		$drop_down_menu_classes = array_merge( $drop_down_menu_classes, array( $customClasses ) );

		wp_nav_menu( array(
			'echo'            => true,
			'theme_location'  => $theme_location,
			'menu_class'      => esc_attr( implode( " ", $drop_down_menu_classes ) ),
			'container_class' => 'colibri-menu-container',
			'fallback_cb'     => array( $this, "colibriNomenuFallback" ),
		) );

	}

	public function hasOffCanvasMobile() {
		$prefix = static::$settings_prefix;
		$type   = static::mod( "{$prefix}props.hoverEffect.type" );

		return ( $type == 'none' ) ? 'has-offcanvas-mobile' : '';
	}

	public function printContainerClasses() {
		$prefix            = static::$settings_prefix;
		$container_classes = static::mod( "{$prefix}props.showOffscreenMenuOn" );

		echo esc_attr( $container_classes );
	}

	function colibriNomenuFallback() {
		$customClasses          = $this->attrs['classes'];
		$drop_down_menu_classes = apply_filters( 'colibri_primary_drop_menu_classes', array( 'colibri-menu' ) );
		$drop_down_menu_classes = array_merge( $drop_down_menu_classes, array( $customClasses ) );

		return wp_page_menu( array(
			"menu_class" => 'colibri-menu-container',
			'before'     => '<ul class="' . esc_attr( implode( " ", $drop_down_menu_classes ) ) . '">',
			'after'      => apply_filters( 'colibri_nomenu_after', '' ) . "</ul>",
		) );
	}

	function colibriMenuAddShopingCart() {
		add_filter( 'wp_nav_menu_items', array( $this, 'colibri_woocommerce_cart_menu_item' ), 10, 2 );
		add_filter( 'colibri_nomenu_after', array( $this, 'colibri_woocommerce_cart_menu_item' ), 10, 2 );
	}

}
