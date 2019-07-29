<?php

// TODO - this should be removed - not user anymore

namespace ColibriWP\Theme\Components\Header;


use ColibriWP\Theme\Core\ComponentBase;
use ColibriWP\Theme\Core\Hooks;
use ColibriWP\Theme\Defaults;
use ColibriWP\Theme\Translations;
use ColibriWP\Theme\View;


class FrontNavBar extends ComponentBase {


	public static function rearrangeControls( $wp_customize ) {


		$controls       = array( 'blogname', 'blogdescription', 'custom_logo', 'alternate_logo' );
		$priority_start = 20;

		foreach ( $controls as $index => $control ) {
			/** @var \WP_Customize_Manager $wp_customize */
			$instance = $wp_customize->get_control( $control );

			if ( $instance ) {
				$instance->section             = "nav_bar";
				$instance->json['colibri_tab'] = "content";
				$instance->priority            = ( $priority_start + $index * 5 );
			}
		}
	}

	/**
	 * @return array();
	 */
	protected static function getOptions() {
		//Hooks::colibri_add_action( 'rearrange_customizer_components', array( __CLASS__, "rearrangeControls" ) );

		$style = static::style()->getOptions();

		$content = array(
			"settings" => array(

				"alternate_logo" => array(
					'default' => Defaults::get( "dark_logo", "" ),
					'control' => array(
						'label'       => Translations::escHtml( "alternate_logo_image" ),
						'type'        => 'image',
						'section'     => 'nav_bar',
						'colibri_tab' => 'content',
					),

				),
			),
		);
		$result  = array_merge_recursive( $content, $style );

		return $result;
	}

	/**
	 * @return NavBarStyle
	 */
	public static function style() {
		return NavBarStyle::getInstance( static::getPrefix(), static::getSelector() );
	}

	protected static function getPrefix() {
		return "front_page_nav_bar__";
	}

	protected static function getSelector() {
		return "[data-identifier=\"front-page-nav-bar\"]";
	}

	public function renderContent() {
		static::style()->renderContent();

		$template = static::style()->mod( 'bar_type' );
		View::partial( "NavBar", "Wrapper/{$template}", array(
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


		if ( static::style()->mod( 'props.sticky' ) ) {
			$attrs[] = "data-colibri-component=\"sticky\"";
		}

		$attrs = implode( " ", $attrs );

		echo $attrs . " ";
		$this->printSelectiveSelector();
	}

	public function printWrapperClasses() {
		$classes = array( 'navigation-wrapper' );
		$prefix = static::getPrefix();

		if ( $this->mod( "{$prefix}boxed_navigation", false ) ) {
			$classes[] = "gridContainer";
		}

		echo esc_attr( implode( " ", $classes ) );
	}

}
