<?php
/**
 * Created by PhpStorm.
 * User: yupal
 * Date: 2/14/2019
 * Time: 7:07 PM
 */

namespace ColibriWP\Theme\Components\InnerHeader;

use ColibriWP\Theme\Components\FrontHeader\Hero as FrontHero;
use ColibriWP\Theme\View;

class Hero extends FrontHero {
	protected static $settings_prefix = "header_post.hero.";

	protected static function getOptions( $include_content_settings = true ) {
		$options = parent::getOptions( false );

		return $options;
	}

	public function printPostFeaturedImage() {
		$bgImage = '';
		if ( apply_filters( 'colibriwp_override_with_thumbnail_image', false ) ) {
			global $post;
			if ( $post ) {
				$thumbnail = get_the_post_thumbnail_url( $post->ID, 'mesmerize-full-hd' );

				$thumbnail = apply_filters( 'colibriwp_overriden_thumbnail_image', $thumbnail );

				if ( $thumbnail ) {
					$bgImage = $thumbnail;
				}
			}
		}

		if ( $bgImage ) {
			echo "background-image:url('$bgImage')";
		}
	}

	public function renderContent() {
		View::partial( "inner-header", "hero", array(
			"component" => $this,
		) );
	}
}
