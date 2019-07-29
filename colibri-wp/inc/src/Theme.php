<?php


namespace ColibriWP\Theme;


use ColibriWP\Theme\Core\ComponentInterface;
use ColibriWP\Theme\Core\Hooks;


class Theme {

	private static $instance = null;

	private $repository;
	private $customizer;
	private $assets_manager;

	private $registered_menus = array();
	private $sidebars = array();

	public function __construct() {

		$this->repository     = new ComponentsRepository();
		$this->customizer     = new Customizer( $this );
		$this->assets_manager = new AssetsManager( $this );

		add_action( 'after_setup_theme', array( $this, 'afterSetup' ) );
	}

	public static function load() {
		static::getInstance();
	}

	/**
	 * @return null|Theme
	 */
	public static function getInstance() {
		if ( ! static::$instance ) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	public function afterSetup() {
		Defaults::load();
		Translations::load();

		$this->registerMenus();

		$this->repository->load();
		$this->customizer->boot();
		$this->assets_manager->boot();

		add_action( 'widgets_init', array( $this, 'doInitWidgets' ) );

		Hooks::colibri_do_action( 'theme_loaded', $this );

	}

	public function doInitWidgets() {

		foreach ( $this->sidebars as $sidebar ) {
			\register_sidebar( $sidebar );
		}
	}


	private function registerMenus() {
		\register_nav_menus( $this->registered_menus );
	}

	/**
	 * @param $component_name
	 *
	 * @return ComponentInterface|null
	 * @throws \Exception
	 */
	public function get( $component_name ) {


		$component = $this->repository->getByName( $component_name );

		if ( ! $component ) {
			throw new \Exception( "Null component: `{$component_name}`" );
		}


		return $component;
	}

	/**
	 * @return \ColibriWP\Theme\ComponentsRepository
	 */
	public function getRepository() {
		return $this->repository;
	}

	/**
	 * @param \ColibriWP\Theme\ComponentsRepository $repository
	 */
	public function setRepository( $repository ) {
		$this->repository = $repository;
	}

	public function getVersion() {
		$theme = wp_get_theme();
		if ( $theme->get( 'Template' ) ) {
			$theme = wp_get_theme( $theme->get( 'Template' ) );
		}

		return $theme->get( 'Version' );
	}


	public function getTextDomain() {
		$theme = wp_get_theme();
		if ( $theme->get( 'Template' ) ) {
			$theme = wp_get_theme( $theme->get( 'Template' ) );
		}

		return $theme->get( 'TextDomain' );
	}

	/**
	 * @return Customizer
	 */
	public function getCustomizer() {
		return $this->customizer;
	}

	/**
	 * @return AssetsManager
	 */
	public function getAssetsManager() {
		return $this->assets_manager;
	}

	/**
	 * @param string $feature
	 * @param bool $args
	 *
	 * @return Theme
	 */
	public function add_theme_support( $feature, $args = true ) {

		if ( $args !== true ) {
			\add_theme_support( $feature, $args );
		} else {
			\add_theme_support( $feature );
		}

		return $this;
	}

	/**
	 * @param string $feature
	 * @param bool $args
	 *
	 * @return Theme
	 */
	public function register_menus( $menus ) {
		$this->registered_menus = array_merge( $this->registered_menus, $menus );

		return $this;
	}


	public function register_sidebars( $sidebar ) {

		$this->sidebars = array_merge( $this->sidebars, $sidebar );

		return $this;
	}


	public function contentWidth( $width = 1200 ) {
		global $content_width;
		$content_width = $width;
	}
}
