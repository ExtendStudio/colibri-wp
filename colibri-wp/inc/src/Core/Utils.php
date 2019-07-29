<?php


namespace ColibriWP\Theme\Core;


class Utils {

	public static function camel2dashed( $string ) {
		return strtolower( preg_replace( '/([a-zA-Z])(?=[A-Z])/', '$1-', $string ) );
	}

	public static function replace_file_extension( $filename, $old_extenstion, $new_extension ) {

		return preg_replace( '#\\' . $old_extenstion . '$#', $new_extension, $filename );
	}

	public static function pathGet( $data, $path = null, $fallback = null ) {

		if ( ! $path ) {
			return $data;
		}

		$path = preg_replace( "#\.\.+#", '.', $path );

		$result = $data;

		$path = explode( ".", $path );

		if ( count( $path ) ) {
			foreach ( $path as $key ) {

				if ( ! isset( $result[ $key ] ) ) {
					$result = $fallback;
					break;
				}

				$result = $result[ $key ];
			}
		}

		return $result;

	}

	public static function pathSet( &$data, $path, $value ) {
		if ( ! is_array( $path ) ) {
			$path = preg_replace( "#\.\.+#", '.', $path );
			$path = explode( ".", (string) $path );
		}

		$ref = &$data;

		foreach ( $path as $parent ) {
			if ( isset( $ref ) && ! is_array( $ref ) ) {
				$ref = array();
			}

			$ref = &$ref[ $parent ];
		}

		$ref = $value;

		return $data;
	}
}
