<?php
/**
 * Created by PhpStorm.
 * User: yupal
 * Date: 2/14/2019
 * Time: 6:28 PM
 */

namespace ColibriWP\Theme\Components\FrontHeader;


use ColibriWP\Theme\Components\Header\NavBarStyle;
use ColibriWP\Theme\Core\ComponentBase;
use ColibriWP\Theme\Core\Hooks;
use ColibriWP\Theme\Defaults;
use ColibriWP\Theme\Translations;
use ColibriWP\Theme\View;

class NavBar extends ComponentBase {

	protected static $settings_prefix = "header_front_page.navigation.";

	public static function selectiveRefreshSelector() {
		return Defaults::get( static::$settings_prefix . 'selective_selector', false );
	}


//	public static function rearrangeControls( $wp_customize ) {
//
//
//		$controls       = array( 'blogname', 'blogdescription', 'custom_logo', 'alternate_logo' );
//		$priority_start = 20;
//
//		foreach ( $controls as $index => $control ) {
//			/** @var \WP_Customize_Manager $wp_customize */
//			$instance = $wp_customize->get_control( $control );
//
//			if ( $instance ) {
//				$instance->section             = "nav_bar";
//				$instance->json['colibri_tab'] = "content";
//				$instance->priority            = ( $priority_start + $index * 5 );
//			}
//		}
//	}

	/**
	 * @return array();
	 */
	protected static function getOptions() {
		$style = static::style()->getOptions();
		return $style;
	}

	/**
	 * @return NavBarStyle
	 */
	public static function style() {
		return NavBarStyle::getInstance( static::getPrefix(), static::selectiveRefreshSelector() );
	}

	protected static function getPrefix() {
		return static::$settings_prefix;
	}

	protected static function getSelector() {
		return static::$selector;
	}

	public function renderContent() {
		static::style()->renderContent();

		$template = static::style()->mod( 'bar_type' );
		View::partial( "front-header", "navigation", array(
			"component" => $this,
		) );
	}

	public function printLogo() {
		$logo           = $this->mod( 'custom_logo', false );
		$alternate_logo = $this->mod( 'alternate_logo', $logo );
		$text           = get_bloginfo( 'name' );

		if ( ! $logo ) {
			View::partial( "NavBar", "Logo/Text", array(
				"text" => $text,
			) );
		} else {

			View::partial( "NavBar", "Logo/Image", array(
				"logo"           => wp_get_attachment_url( $logo ),
				"alternate_logo" => wp_get_attachment_url( $alternate_logo ),
			) );
		}

	}

	public function printHeaderMenu() {
		View::printMenu( array(
			'id'      => 'header-menu',
			'classes' => 'none',
		) );
	}

	public function printIdentifiers() {
		$attrs = array( trim( static::getSelector(), "[]" ) );


		if ( static::style()->mod( "props.sticky" ) ) {
			$attrs[] = "data-colibri-component=\"sticky\"";
		}

		$attrs = implode( " ", $attrs );

		echo $attrs . " ";
		$this->printSelectiveSelector();
	}

	public function printSticky() {
		$sticky = static::style()->mod( "props.sticky" );
		if ($sticky === false || $sticky === "")
		{
			$disable_sticky_js = <<<JS
			jQuery(window).load(function ()
			{
				var el = jQuery("#navigation");
			    var component = el.data()['fn.colibri.navigation'];
			    if (component) {
			        window.colibriNavStickyOpts = component.opts.data.sticky;
				    component.opts.data.sticky = false;
				    if (component.hasOwnProperty('restart')) {
					    component.restart();
				    } else {
					    component.stop();
					    component.start();
				    }
			    }
			});
JS;
			wp_add_inline_script( 'wp-embed', $disable_sticky_js );
		}

	}

	public function printWrapperClasses() {
		$classes = array( 'navigation-wrapper' );
		$prefix = static::getPrefix();

		if ( $this->mod( "{$prefix}boxed_navigation", false ) ) {
			$classes[] = "gridContainer";
		}

		echo esc_attr( implode( " ", $classes ) );
	}

	public function printNavigationClasses() {
		$classes = array();
		$prefix = static::getPrefix();

		if ( $this->mod( "{$prefix}props.overlap", false ) ) {
			$classes[] = "h-navigation_overlap";
		}

		echo esc_attr( implode( " ", $classes ) );
	}

	public function printContainerClasses() {
		$classes = array();
		$prefix  = static::getPrefix();

		if ( $width = $this->mod( "{$prefix}props.width", 'boxed' ) ) {
			$width_options     = array( 'boxed' => 'h-section-boxed-container', 'full-width' => 'h-section-fluid-container' );
			$classes[] = $width_options[$width];
		}
		echo esc_attr( implode( " ", $classes ) );
	}
}
