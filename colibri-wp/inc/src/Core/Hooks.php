<?php


namespace ColibriWP\Theme\Core;

/**
 * Class Hooks
 * @package ColibriTheme\Core
 *
 * @method static colibri_add_action( $tag, $function_to_add, $priority = 10, $accepted_args = 1 )
 * @method static colibri_add_filter( $tag, $function_to_add, $priority = 10, $accepted_args = 1 )
 * @method static colibri_do_action( $tag, ...$args )
 * @method static mixed colibri_apply_filters( $tag, $value, ...$args )
 */
class Hooks {

	const HOOK_PREFIX = "colibriwp_theme_";

	public static function add_action( $tag, $function_to_add, $priority = 10, $accepted_args = 1 ) {
		\add_action( $tag, $function_to_add, $priority, $accepted_args );
	}

	public static function add_filter( $tag, $function_to_add, $priority = 10, $accepted_args = 1 ) {

		\add_filter( $tag, $function_to_add, $priority, $accepted_args );
	}

	public static function do_action( $tag, $arg = '' ) {
		\do_action( $tag, $arg );
	}


	/**
	 * @param string $tag     The name of the filter hook.
	 * @param mixed  $value   The value on which the filters hooked to `$tag` are applied on.
	 * @param mixed  $var,... Additional variables passed to the functions hooked to `$tag`.
	 *
	 * @return mixed The filtered value after all hooked functions are applied to it.
	 */
	public static function apply_filters( $tag, $value ) {
		return \apply_filters( $tag, $value );
	}

	public static function __callStatic( $name, $arguments ) {
		if ( strpos( $name, "colibri_" ) === 0 ) {
			$name         = str_replace( "colibri_", "", $name );
			$arguments[0] = self::HOOK_PREFIX . $arguments[0];

			return call_user_func_array( array( __CLASS__, $name ), $arguments );
		}
	}
}
