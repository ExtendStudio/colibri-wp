<?php
/**
 * Created by PhpStorm.
 * User: Extend Studio
 * Date: 2/19/2019
 * Time: 6:24 PM
 */

namespace ColibriWP\Theme\Components\Header;


use ColibriWP\Theme\Core\ComponentBase;
use ColibriWP\Theme\Core\Hooks;
use ColibriWP\Theme\Defaults;
use ColibriWP\Theme\Components\CSSOutput;
use ColibriWP\Theme\Translations;
use ColibriWP\Theme\View;

class HeaderMenu extends ComponentBase {

	protected static $settings_prefix = "header_front_page.header-menu.";
	//protected static $settings_prefix = "style.descendants.innerMenu.";
	private $attrs = array();

	public static function selectiveRefreshSelector() {
		return Defaults::get( static::$settings_prefix . 'selective_selector', false );
	}


	public function __construct( $attrs = array() ) {
		$prefix  = static::$settings_prefix;
		$classes = self:: mod( "{$prefix}props.hoverEffect.type" );
		if ( strpos( $classes, 'bordered-active-item' ) !== - 1 ) {
			$classes .= ' bordered-active-item ';
		}

		$classes .= ' ' . self:: mod( "{$prefix}props.hoverEffect.group.border.transition" );

		$defaultAttrs = array(
			'id'                 => null,
			'classes'            => $classes,
			'show_shopping_cart' => '0',
		);

		$this->attrs = array_merge( $defaultAttrs, $attrs );
	}

	public function renderContent() {
		View::partial( 'front-header', 'header-menu', array(
			"component" => $this,
		) );
	}

	public function printHeaderMenu() {
		$this->colibriPrintMenu( $this->attrs );
	}

	public function hasOffCanvasMobile() {
		$prefix            = static::$settings_prefix;
		$type = self:: mod( "{$prefix}props.hoverEffect.type" );

        return ($type == 'none') ? 'has-offcanvas-mobile':'';
	}

	public function printContainerClasses() {
		$prefix            = static::$settings_prefix;
		$container_classes = self:: mod( "{$prefix}props.showOffscreenMenuOn" );

		echo esc_attr( $container_classes );
	}

	function colibriThemeLocationMenuIsEmpty( $theme_location ) {
		$theme_locations = get_nav_menu_locations();
		if ( ! isset( $theme_locations[ $theme_location ] ) ) {
			return false;
		}

		$menu_id    = $theme_locations[ $theme_location ];
		$menu_items = wp_get_nav_menu_items( $menu_id );

		if ( $menu_items !== false && count( $menu_items ) === 0 ) {
			return true;
		}

		return false;
	}

	function colibriPrintMenu() {
		$theme_location         = $this->attrs['id'];
		$customClasses          = $this->attrs['classes'];
		$drop_down_menu_classes = apply_filters( 'colibri_primary_drop_menu_classes', array( 'colibri-menu' ) );
		$drop_down_menu_classes = array_merge( $drop_down_menu_classes, array( $customClasses ) );

		if ( is_customize_preview() ) {
			global $wp_customize;
			$wp_customize->nav_menus->customize_preview_init();
		}

		if ( $this->colibriThemeLocationMenuIsEmpty( $theme_location ) ) {
			echo 'No menu items';

			return;
		}

		wp_nav_menu( array(
			'echo'            => true,
			'theme_location'  => $theme_location,
			'menu_class'      => esc_attr( implode( " ", $drop_down_menu_classes ) ),
			'container_class' => 'colibri-menu-container',
			'fallback_cb'     => array( $this, "colibriNomenuFallback" ),
		) );


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

	function colibriNomenuCb() {
		//$attrs = $this->colibri_cache_set('colibri_nomenu_cb', $this->attrs);
		return $this->colibriNomenuFallback();
	}

	function colibriMenuAddShopingCart() {
		add_filter( 'wp_nav_menu_items', array( $this, 'colibri_woocommerce_cart_menu_item' ), 10, 2 );
		add_filter( 'colibri_nomenu_after', array( $this, 'colibri_woocommerce_cart_menu_item' ), 10, 2 );
	}

	function colibriWoocommerceCartMenuItem( $items, $args = false ) {
		$cart_url = wc_get_cart_url();

		$cart_id   = wc_get_page_id( 'cart' );
		$cartLabel = get_the_title( $cart_id );
		ob_start();
		?>
        <li class="mesmerize-menu-cart">
            <a href="<?php echo $cart_url ?>">
            <span>
                <i class='fa fa-shopping-cart'></i>
                <span class='cart-label'><?php echo $cartLabel ?></span>
            </span>
            </a>
        </li>
		<?php
		$item = ob_get_contents();
		ob_end_clean();

		return $items . $item;
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

		//$menu_id = get_theme_mod( "{$prefix}menu" );

		return array(

//			"{$prefix}menu" => array(
//				'default' => Defaults::get( "{$prefix}menu" ),
//				'control' => array(
//					'label'       => Translations::get( 'menu' ),
//					'type'        => 'select',
//					'section'     => "{$prefix}section",
//					'colibri_tab' => "content",
//					'hidden'      => true,
//					'choices'     => $menu_choices
//				),
//			),

			"{$prefix}edit" => array(
				'default'   => Defaults::get( "{$prefix}value" ),
				//'settingless' => true,
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

	protected static function getOptions() {
		$prefix   = static::$settings_prefix;
		$settings = array_merge(
			self:: getContentOptions( $prefix ),
			self:: getStyleOptions( $prefix )
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
}
