<?php


namespace ColibriWP\Theme;


use ColibriWP\Theme\Core\Hooks;
use ColibriWP\Theme\Core\Utils;

class AssetsManager {

	private $theme;
	private $key;

	private $fonts = array();

	private $autoenqueue
		= array(
			'style'  => array(),
			'script' => array(),
		);


	private $registered
		= array(
			'style'  => array(),
			'script' => array(),
		);

	private $localized = array();

	/**
	 * AssetsManager constructor.
	 *
	 * @param Theme $theme
	 */
	public function __construct( $theme ) {
		$this->theme = $theme;
		$this->key   = Defaults::get( 'assets_js_key', 'THEME_DATA' );
	}

	public function boot() {
		add_action( 'wp_footer', array( $this, 'addFrontendJSData' ), 0 );
		add_action( 'wp_enqueue_scripts', array( $this, 'doEnqueueGoogleFonts' ), 1 );
		add_action( 'wp_enqueue_scripts', array( $this, 'doRegisterScript' ), 10 );
		add_action( 'wp_enqueue_scripts', array( $this, 'doAutoEnqueue' ), 20 );
		add_action( 'wp_enqueue_scripts', array( $this, 'doLocalize' ), 40 );
	}

	public function addFrontendJSData() {
		$data   = Hooks::apply_filters( "frontend_js_data", array() );
		$script = "window.{$this->key} = " . wp_json_encode( $data ) . ';';

		?>
        <script data-name="colibri-frontend-data"><?php echo $script; ?></script>
		<?php
	}


	public function doRegisterScript() {


		foreach ( $this->registered['style'] as $handle => $data ) {
			wp_register_style( $handle, $data['src'], $data['deps'], $data['ver'], $data['media'] );
		}

		foreach ( $this->registered['script'] as $handle => $data ) {
			wp_register_script( $handle, $data['src'], $data['deps'], $data['ver'], $data['in_footer'] );
		}
	}


	public function doEnqueueGoogleFonts() {
		$fontQuery = array();

		foreach ( $this->fonts as $family => $font ) {
			$fontQuery[] = $family . ":" . implode( ',', $font['weights'] );
		}

		$query_args = array(
			'family' => urlencode( implode( '|', $fontQuery ) ),
			'subset' => urlencode( 'latin,latin-ext' ),
		);

		$fontsURL = add_query_arg( $query_args, 'https://fonts.googleapis.com/css' );

		$this->registerStyle( $this->theme->getTextDomain() . "_google_fonts", $fontsURL );
	}

	public function doAutoEnqueue() {

		foreach ( Hooks::colibri_apply_filters( 'auto_enqueue_assets', $this->autoenqueue ) as $type => $content ) {
			foreach ( $content as $item ) {
				$this->enqueue( $type, $item );
			}
		}

		if (is_singular() && comments_open() && get_option('thread_comments')) {
			wp_enqueue_script('comment-reply');
		}
	}

	public function doLocalize() {
		foreach ( $this->localized as $handle => $data ) {
			\wp_localize_script( $handle, $data['key'], $data['data'] );
		}
	}

	/**
	 * @param       $type
	 * @param       $handle
	 * @param array $args
	 *
	 * @return AssetsManager
	 */
	public function register( $type, $handle, $args = array() ) {
		$ver  = $this->theme->getVersion();
		$data = array_merge( array(
			'src'          => '',
			'deps'         => array(),
			'has_min'      => false,
			'in_footer'    => true,
			'media'        => 'all',
			'ver'          => $ver,
			'in_preview'   => true,
			'auto_enqueue' => false,
		), $args );

		if ( $this->theme->getCustomizer()->isInPreview() && $data['in_preview'] === false ) {
			return $this;
		}

		if ( $data['has_min'] ) {
			if ( $type === 'style' ) {
				$data['src'] = Utils::replace_file_extension( $data['src'], '.css', '.min.css' );
			}

			if ( $type === 'script' ) {
				$data['src'] = Utils::replace_file_extension( $data['src'], '.js', '.min.js' );
			}
		}

		$this->registered[ $type ][ $handle ] = $data;

		if ( $data['auto_enqueue'] ) {
			if ( ! in_array( $handle, $this->autoenqueue[ $type ] ) ) {
				$this->autoenqueue[ $type ][] = $handle;
			}
		}


		return $this;
	}


	public function enqueue( $type, $handle, $args = array() ) {
		if ( ! empty( $args ) ) {
			$this->register( $type, $handle, $args );
		}

		if ( $type === 'style' ) {
			\wp_enqueue_style( $handle );
		}

		if ( $type === 'script' ) {

			if ( isset( $this->localized[ $handle ] ) ) {
				\wp_localize_script( $handle, $this->localized[ $handle ]['key'], $this->localized[ $handle ]['data'] );
				unset( $this->localized[ $handle ] );
			}

			\wp_enqueue_script( $handle );
		}
	}

	public function enqueueScript( $handle, $args = array() ) {
		$this->enqueue( "script", $handle, $args );
	}

	public function enqueueStyle( $handle, $args = array() ) {
		$this->enqueue( "style", $handle, $args );
	}


	/**
	 * @param string $handle
	 * @param string $rel
	 * @param array  $deps
	 * @param bool   $auto_enqueue
	 *
	 * @return AssetsManager
	 */
	public function registerScript( $handle, $url, $deps = array(), $auto_enqueue = true ) {

		$this->register( 'script', $handle, array(
			'src'          => $url,
			'deps'         => $deps,
			'auto_enqueue' => $auto_enqueue,
		) );

		return $this;
	}

	/**
	 * @param string $handle
	 * @param string $rel
	 * @param array  $deps
	 * @param bool   $auto_enqueue
	 *
	 * @return AssetsManager
	 */
	public function registerTemplateScript( $handle, $rel, $deps = array(), $auto_enqueue = true ) {
		$this->registerScript( $handle, get_template_directory_uri() . $rel, $deps, $auto_enqueue );

		return $this;
	}


	/**
	 * @param       $handle
	 * @param       $url
	 * @param array $deps
	 * @param bool  $auto_enqueue
	 *
	 * @return AssetsManager
	 */
	public function registerStyle( $handle, $url, $deps = array(), $auto_enqueue = true ) {
		$this->register( 'style', $handle, array(
			'src'          => $url,
			'deps'         => $deps,
			'auto_enqueue' => $auto_enqueue,
		) );

		return $this;
	}

	/**
	 * @param string $handle
	 * @param string $rel
	 * @param array  $deps
	 * @param bool   $auto_enqueue
	 *
	 * @return AssetsManager
	 */
	public function registerTemplateStyle( $handle, $rel, $deps = array(), $auto_enqueue = true ) {

		$this->registerStyle( $handle, get_template_directory_uri() . $rel, $deps, $auto_enqueue );

		return $this;
	}

	/**
	 * @param string $handle
	 * @param string $key
	 * @param array  $data
	 *
	 * @return AssetsManager
	 */
	public function localize( $handle, $key, $data = array() ) {
		$this->localized[ $handle ] = array(
			"key"  => $key,
			"data" => $data,
		);

		return $this;
	}

	public function addGoogleFont( $family, $weights ) {
		$this->fonts[ $family ] = compact( 'family', 'weights' );

		return $this;
	}

}
