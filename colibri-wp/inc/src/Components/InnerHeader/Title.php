<?php
/**
 * Created by PhpStorm.
 * User: yupal
 * Date: 2/14/2019
 * Time: 7:07 PM
 */

namespace  ColibriWP\Theme\Components\InnerHeader;
use ColibriWP\Theme\Components\FrontHeader\Title as FrontTitle;
use ColibriWP\Theme\View;

class Title extends FrontTitle{
	protected static $settings_prefix = "header_post.title.";

	public function renderContent() {

		if ( $this->mod( static::$settings_prefix . 'show' ) ) {
			View::partial( 'inner-header', 'title', array(
				"component" => $this,
			) );
		}
	}

	public function printTitle($shortcode = '') {

		if ( $this->mod( static::$settings_prefix . 'show' ) ) {

			$atts = colibriwp_get_shortocode_atts( urldecode( $shortcode ) );
			echo \colibriwp_page_title( $atts );
		}
	}

	protected static function getOptions() {
		$prefix = static::$settings_prefix;
		$options = parent::getOptions();
		unset($options['settings']["{$prefix}localProps.content"]);
		return $options;
	}
}
