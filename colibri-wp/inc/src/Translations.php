<?php


namespace ColibriWP\Theme;


class Translations {
	private static $texts = array();

	public static function load() {
		static::$texts = require_once get_template_directory() . "/inc/translations.php";
	}

	public static function e( $key, $params = array() ) {
		static::render( $key, $params );
	}

	public static function render( $key, $params = array() ) {
		echo static::get( $key, $params );
	}

	public static function get( $key, $params = array() ) {
		$text = "__[{$key}]__";
		if ( isset( static::$texts[ $key ] ) ) {
			$text = static::$texts[ $key ];
		}
		$params = (array) $params;


		if ( empty( $params ) ) {
			return $text;
		}

		array_unshift( $params, $text );

		return call_user_func_array( 'sprintf', $params );
	}

	public static function escHtmlE( $key, $params = array() ) {
		echo static::escHtml( $key, $params );
	}

	public static function escHtml( $key, $params = array() ) {
		return esc_html( static::get( $key, $params ) );
	}

	public static function escAttrE( $key, $params = array() ) {
		echo esc_attr( static::get( $key, $params ) );
	}

	public static function translate( $key, $params = array() ) {
		return static::get( $key, $params );
	}

	public static function all() {
		return static::$texts;
	}
}
