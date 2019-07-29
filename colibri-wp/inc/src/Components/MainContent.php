<?php
/**
 * Created by PhpStorm.
 * User: yupal
 * Date: 2/11/2019
 * Time: 6:58 PM
 */

namespace ColibriWP\Theme\Components;


use ColibriWP\Theme\Core\ComponentBase;
use ColibriWP\Theme\Defaults;
use ColibriWP\Theme\View;
use ColibriWP\Theme\Translations;

class MainContent extends ComponentBase {

	protected static function getOptions() {
		$prefix   = 'content.';
		$selector = 'content';
		return array(
			"settings" => array(

				"blog_posts_per_row"                => array(
					'default' => Defaults::get( "blog_posts_per_row" ),
					'control' => array(
						'label'       => Translations::get( 'posts_per_row' ),
						'type'        => 'hidden',
						'section'     => "content",
						'colibri_tab' => 'content',
						'type'        => 'button-group',
						'button_size' => 'medium',
						'choices'     => array(
							1 => '1',
							2 => '2',
							3 => '3',
							4 => '4',
						),
						'none_value'  => '',
					)
				),

				"{$prefix}separator1"        => array(
					'default' => '',
					'control' => array(
						'label'       => '',
						'type'        => 'separator',
						'section'     => 'content',
						'colibri_tab' => 'content',
					),
				),

				"blog_sidebar_enabled"              => array(
					'default' => Defaults::get( "blog_sidebar_enabled" ),
					'control' => array(
						'label'       => Translations::get( 'show_blog_sidebar' ),
						'type'        => 'switch',
						'section'     => "content",
						'colibri_tab' => 'content',
					)
				),
				/*
				"show_single_item_title"            => array(
					'default' => Defaults::get( "show_single_item_title" ),
					'control' => array(
						'label'       => Translations::get( 'show_post_title_in_post_page' ),
						'type'        => 'switch',
						'section'     => "content",
						'colibri_tab' => 'content',
					)
				),*/
				"blog_post_meta_enabled"            => array(
					'default' => Defaults::get( "blog_post_meta_enabled" ),
					'control' => array(
						'label'       => Translations::get( 'show_post_meta' ),
						'type'        => 'switch',
						'section'     => "content",
						'colibri_tab' => 'content',
					)
				),
				"blog_enable_masonry"            => array(
					'default' => Defaults::get( "blog_enable_masonry" ),
					'control' => array(
						'label'       => Translations::get( 'enable_masonry' ),
						'type'        => 'switch',
						'section'     => "content",
						'colibri_tab' => 'content',
					),
					'js_output' => array(
						array(
							'selector' => '[data-colibri-component="masonry"]',
							'action'   => "colibri-set-attr",
							'value'    => 'data-show-masonry'
						),
						array(
							'selector' => '[data-colibri-component="masonry"]',
							'action'   => "colibri-component-toggle",
							'value'    => 'masonry'
						),
					),
				),
/*
				"blog_post_highlight_enabled" => array(
					'default' => Defaults::get( "blog_post_highlight_enabled" ),
					'control' => array(
						'label'       => Translations::get( 'post_highlight' ),
						'type'        => 'switch',
						'section'     => "content",
						'colibri_tab' => 'content',
					),
				),
*/
				"{$prefix}separator3"        => array(
					'default' => '',
					'control' => array(
						'label'       => '',
						'type'        => 'separator',
						'section'     => 'content',
						'colibri_tab' => 'content',
					),
				),
				"blog_show_post_thumb_placeholder"  => array(
					'default' => Defaults::get( "blog_show_post_thumb_placeholder" ),
					'control' => array(
						'label'       => Translations::get( 'show_thumbnail_placeholder' ),
						'type'        => 'switch',
						'section'     => "content",
						'colibri_tab' => 'content',
					)
				),
				"blog_post_thumb_placeholder_color" => array(
					'default'    => Defaults::get( "blog_post_thumb_placeholder_color" ),
					'control'    => array(
						'label'       => Translations::get( 'thumbnail_placeholder_color' ),
						'type'        => 'color',
						'section'     => "content",
						'colibri_tab' => 'content',
					),
					'css_output' => array(
						array(
							'selector' => '.colibri-post-has-no-thumbnail.colibri-post-thumbnail-has-placeholder .colibri-post-thumbnail-content',
							'media'    => CSSOutput::NO_MEDIA,
							'property' => 'background-color',
						),
					),
				),

				"{$prefix}separator4"        => array(
					'default' => '',
					'control' => array(
						'label'       => '',
						'type'        => 'separator',
						'section'     => 'content',
						'colibri_tab' => 'content',
					),
				),

				"blog_show_post_featured_image" => array(
					'default' => Defaults::get( "}blog_show_post_featured_image" ),
					'control' => array(
						'label'       => Translations::get( 'blog_show_post_featured_image' ),
						'description' => Translations::get( 'blog_show_post_featured_image_desc' ),
						'type'        => 'switch',
						'section'     => "content",
						'colibri_tab' => 'content',
					)
				),
			),
			"sections" => array(

				"content" => array(
					'title'    => Translations::get( 'content_settings' ),
					'priority' => 2,
					'panel'    => 'content_panel',
					'type'     => 'colibri_section',
				),
			),

			"panels" => array(
				"content_panel" => array(
					'priority' => 2,
					'title'    => Translations::get( 'content_sections' ),
					'type'     => 'colibri_panel',
				),
			),
		);
	}


	public function printMasonryFlag() {
		$value = $this->mod( "blog_enable_masonry", false );
		if ( $value ) {
			$value = 'true';
		} else {
			$value = 'false';
		}
		echo $value;
	}

	public function renderContent() {

		View::printIn( View::CONTENT_ELEMENT, function () {
			View::printIn( View::SECTION_ELEMENT, function () {
				View::printIn( View::ROW_ELEMENT, function () {
					View::printIn( View::COLUMN_ELEMENT, function () {
						View::partial( 'main', 'archive', array(
							"component" => $this,
						) );
					} );
					View::partial( 'sidebar', 'post', array(
						"component" => $this,
					) );
				} );

			} );
		}, array( array( 'blog-page' ) ) );
	}

}
