<?php


namespace ColibriWP\Theme;


use ColibriWP\Theme\Core\Hooks;
use ColibriWP\Theme\Core\Utils;

class HeaderPresets {

	private $headers_data = array();

	public function __construct() {
		$this->loadHeadersData();
		$this->normalizeHeaders();
		Hooks::colibri_add_filter( 'customizer_js_data',
			array( $this, 'addHeadersToJSData' ) );
	}

	public function loadHeadersData() {

		if ( ! file_exists( get_template_directory() . "/inc/headers" ) ) {
			return;
		}

//		$headers = scandir( get_template_directory() . "/inc/headers" );
//		foreach ( $headers as $header ) {
//			if ( is_file( get_template_directory() . "/inc/headers/$header" ) && strpos( $header, ".php" ) !== false ) {
//				$key                        = str_replace( ".php", "", $header );
//				$this->headers_data[ $key ] = require_once get_template_directory() . "/inc/headers/$header";
//			}
//
//		}
	}

	public function normalizeHeaders() {
		$default = Utils::recursiveWithout( Defaults::get( 'header_front_page' ), array(
			'selective_selector',
			'id',
			'nodeId',
			'partialId',
			'styleRef',
		) );
		foreach ( $this->headers_data as $key => $value ) {
			$data                       = array_replace_recursive( $default, $value );
			$flatten                    = Utils::flatten( $data, 'header_front_page' );
			$this->headers_data[ $key ] = $flatten;
		}
	}

	public function addHeadersToJSData( $data ) {

		$data['headers'] = $this->headers_data;

		return $data;
	}
}
