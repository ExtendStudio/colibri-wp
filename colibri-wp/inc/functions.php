<?php

require_once get_template_directory() . "/inc/vendor/autoload.php";


function colibriwp_page_builder_components( $components ) {
	$namespace = "ColibriWP\\Theme\\BuilderComponents";

	$components = array_merge( $components, array(

		'css'                => "{$namespace}\\CSSOutput",

		// header components
		'header'             => "{$namespace}\\Header",

		// footer components
		'footer'             => "{$namespace}\\Footer",

		// page content
		'main'               => "{$namespace}\\MainContent",
		'single'             => "{$namespace}\\SingleContent",
		'content'            => "{$namespace}\\PageContent",
		'front-page-content' => "{$namespace}\\FrontPageContent",
		// sidebar
		'sidebar'            => "{$namespace}\\Sidebar",
		// 404
		'page-not-found'     => "{$namespace}\\PageNotFound",

	) );

	return $components;
}

function colibriwp_default_components( $components ) {

	$namespace = "ColibriWP\\Theme\\Components";

	$components = array_merge( $components, array(

		// header components
		'header'               => "{$namespace}\\Header",
		'logo'                 => "{$namespace}\\Header\\Logo",
		'header-menu'          => "{$namespace}\\Header\\HeaderMenu",

		// inner page fragments
		'inner-nav-bar'        => "{$namespace}\\InnerHeader\\NavBar",
		'inner-top-bar'        => "{$namespace}\\InnerHeader\\TopBar",
		'inner-hero'           => "{$namespace}\\InnerHeader\\Hero",
		'inner-title'          => "{$namespace}\\InnerHeader\\Title",

		// front page fragments
		'front-hero'           => "{$namespace}\\FrontHeader\\Hero",
		'front-title'          => "{$namespace}\\FrontHeader\\Title",
		'front-subtitle'       => "{$namespace}\\FrontHeader\\Subtitle",
		'front-buttons'        => "{$namespace}\\FrontHeader\\ButtonsGroup",
		'top-bar-list-icons'   => "{$namespace}\\FrontHeader\\TopBarListIcons",
		'top-bar-social-icons' => "{$namespace}\\FrontHeader\\TopBarSocialIcons",
		'front-nav-bar'        => "{$namespace}\\FrontHeader\\NavBar",
		'front-top-bar'        => "{$namespace}\\FrontHeader\\TopBar",
		'front-image'          => "{$namespace}\\FrontHeader\\Image",


		// footer components
		'footer'               => "{$namespace}\\Footer",
		'front-footer'         => "{$namespace}\\Footer\\FrontFooter",

		// general components
		'css'                  => "{$namespace}\\CSSOutput",

		// page content
		'main'                 => "{$namespace}\\MainContent",
		'single'               => "{$namespace}\\SingleContent",
		'content'              => "{$namespace}\\PageContent",
		'front-page-content'   => "{$namespace}\\FrontPageContent",
		'search'               => "{$namespace}\\PageSearch",
		'page-not-found'       => "{$namespace}\\PageNotFound",

		// inner content fragments

		//main content
		'main-loop'            => "{$namespace}\\MainContent\ArchiveLoop",
		'post-loop'            => "{$namespace}\\MainContent\PostLoop",
		'archive-loop'         => "{$namespace}\\MainContent\ArchiveLoop",
		'single-template'      => "{$namespace}\\MainContent\SingleItemTemplate",

		// sidebar
		'sidebar'              => "{$namespace}\\Sidebar",
	) );

	return $components;
}

function colibriwp_register_components( $components = array() ) {
	if ( apply_filters( 'colibri_page_builder/installed', false ) ) {
		$components = colibriwp_page_builder_components( $components );
	} else {
		$components = colibriwp_default_components( $components );
	}

	return $components;
}

\ColibriWP\Theme\Core\Hooks::colibri_add_action( 'components', 'colibriwp_register_components' );
\ColibriWP\Theme\Theme::load();


/**
 * @return \ColibriWP\Theme\Theme
 */
function colibri_theme() {
	return \ColibriWP\Theme\Theme::getInstance();
}


/**
 * @return \ColibriWP\Theme\AssetsManager
 */
function colibriwp_assets() {
	return colibri_theme()->getAssetsManager();
}


colibri_theme()
	->add_theme_support( 'automatic-feed-links' )
	->add_theme_support( 'title-tag' )
	->add_theme_support( 'post-thumbnails' )
	->add_theme_support( 'custom-logo', array(
		'flex-height' => true,
		'flex-width'  => true,
		'width'       => 150,
		'height'      => 70,
	) )
	->register_menus( array(
		'header-menu' => esc_html__( 'Header Menu', 'colibri-wp' ),
		'footer-menu' => esc_html__( 'Footer Menu', 'colibri-wp' ),
	) )
	->register_sidebars( array(
		array(
			'name'          => esc_html__( 'Blog sidebar widget area', 'colibri-wp' ),
			'id'            => 'colibri-sidebar-1',
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h5 class="widgettitle">',
			'after_title'   => '</h5>',
		),
	) );


if ( ! apply_filters( 'colibri_page_builder/installed', false ) ) {
	colibriwp_assets()
		->registerTemplateScript(
			"colibri-theme",
			"/theme/theme.js",
			array( 'jquery', 'jquery-effects-slide', 'jquery-effects-core' )
		)
		->registerStylesheet( "colibri-theme", "/theme/theme.css" )
		->addGoogleFont( "Open Sans", array( "300", "400", "600", "700" ) )
		->addGoogleFont(
			"Muli",
			array(
				"300",
				"300italic",
				"400",
				"400italic",
				"600",
				"600italic",
				"700",
				"700italic",
				"900",
				"900italic"
			)
		);
}

\ColibriWP\Theme\Core\Hooks::colibri_do_action( 'theme_loaded', 'colibri_theme_loaded' );
add_filter( 'colibri_page_builder/theme_supported', '__return_true' );

add_action( 'colibri_page_builder/default_theme_data', 'colibriwp_merge_default_theme_data' );


//blog options

function colibriwp_show_post_meta_setting_filter( $value ) {

	$value = get_theme_mod( 'blog_post_meta_enabled', $value );

	return ( $value == 1 );
}

add_filter( 'colibriwp_show_post_meta', 'colibriwp_show_post_meta_setting_filter' );


function colibriwp_posts_per_row_setting_filter( $value ) {

	$value = get_theme_mod( 'blog_posts_per_row', $value );

	return $value;
}

add_filter( 'colibriwp_posts_per_row', 'colibriwp_posts_per_row_setting_filter' );

function colibriwp_archive_post_highlight_setting_filter( $value ) {

	$value = get_theme_mod( 'blog_post_highlight_enabled', $value );

	return $value;
}

add_filter( 'colibriwp_archive_post_highlight', 'colibriwp_archive_post_highlight_setting_filter' );


function colibriwp_blog_sidebar_enabled_setting_filter( $value ) {

	$value = get_theme_mod( 'blog_sidebar_enabled', $value );

	return ( $value == 1 );
}

add_filter( 'colibriwp_blog_sidebar_enabled', 'colibriwp_blog_sidebar_enabled_setting_filter' );


add_filter( 'colibriwp_override_with_thumbnail_image', function ( $value ) {
	global $post;

	if ( isset( $post ) && $post->post_type === 'post' ) {
		$value = get_theme_mod( 'blog_show_post_featured_image', true );
		$value = ( intval( $value ) === 1 );
	}

	return $value;
} );


function colibriwp_is_wporg_preview() {

	if ( defined( 'COLIBRIWP_IS_WPORG_PREVIEW' ) && COLIBRIWP_IS_WPORG_PREVIEW ) {
		return COLIBRIWP_IS_WPORG_PREVIEW;
	}

	$url    = site_url();
	$parse  = parse_url( $url );
	$wp_org = 'wp-themes.com';
	$result = false;

	if ( isset( $parse['host'] ) && $parse['host'] === $wp_org ) {
		$result = true;
	}

	return $result;
}

function colibriwp_print_archive_entry_class( $class = "" ) {

	$classes = array( "post-list-item", "h-col-xs-12", "space-bottom" );
	$classes = array_merge( $classes, explode( " ", $class ) );
	$classes = get_post_class( $classes );

	$default     = get_theme_mod( 'blog_posts_per_row', \ColibriWP\Theme\Defaults::get( 'blog_posts_per_row' ) );
	$postsPerRow = max( 1, apply_filters( 'colibriwp_posts_per_row', $default ) );
	$classes[]   = "h-col-sm-12 h-col-md-" . ( 12 / intval( $postsPerRow ) );

	$classes = apply_filters( 'colibriwp_archive_entry_class', $classes );

	$classesText = implode( " ", $classes );

	echo esc_attr( $classesText );
}

function colibriwp_print_masonry_col_class( $echo = false ) {

	global $wp_query;
	$index        = $wp_query->current_post;
	$hasBigClass  = ( is_sticky() || ( $index === 0 && apply_filters( 'colibriwp_archive_post_highlight', false ) ) );
	$showBigEntry = ( is_archive() || is_home() );

	$class = "";
	if ( $showBigEntry && $hasBigClass ) {
		$class = "col-md-12";
	} else {
		$default     = get_theme_mod( 'blog_posts_per_row', \ColibriWP\Theme\Defaults::get( 'blog_posts_per_row' ) );
		$postsPerRow = max( 1, apply_filters( 'colibriwp_posts_per_row', $default ) );
		$class       = "col-sm-12.col-md-" . ( 12 / intval( $postsPerRow ) );
	}

	if ( $echo ) {
		echo esc_attr( $class );

		return;
	}

	return esc_attr( $class );
}
