<?php

function colibriwp_page_title( $atts = array() ) {
	$title = '';
	if ( is_404() ) {
		$title = __( 'Page not found', 'colibri-wp' );
	} elseif ( is_search() ) {
		$title = sprintf( __( 'Search Results for &#8220;%s&#8221;', 'colibri-wp' ), get_search_query() );
	} elseif ( is_home() ) {
		if ( is_front_page() ) {
			$title = get_bloginfo( 'name' );
		} else {
			$title = single_post_title( '', false );
		}
	} elseif ( is_archive() ) {
		if ( is_post_type_archive() ) {
			$title = post_type_archive_title( '', false );
		} else {
			$title = get_the_archive_title();
		}
	} elseif ( is_single() ) {
		$title = get_bloginfo( 'name' );

		global $post;
		if ( $post ) {
			// apply core filter
			$title = apply_filters( 'single_post_title', $post->post_title, $post );
		}
	} else {
		$title = get_the_title();
	}

	echo "<span><" . $atts['tag'] . ">" . $title . "</" . $atts['tag'] . "></span>";
}

function colibriwp_post_thumb_placeholder_classes( $atts = array() ) {
	$result = 'colibri-post-thumbnail-has-placeholder';

	$show_placeholder = get_theme_mod( 'blog_show_post_thumb_placeholder', true );
	if ( $show_placeholder == '1' ) {
		echo $result;
	}
}

function colibriwp_post_thumbnail_classes( $atts = array() ) {
	$result = 'colibri-post-has-no-thumbnail';

	if ( has_post_thumbnail() ) {
		$result = 'colibri-post-has-thumbnail';
	}

	echo $result;
}

function colibriwp_post_thumbnail( $atts = array() ) {

	$show_placeholder = get_theme_mod( 'blog_show_post_thumb_placeholder', true );
	if ( ! has_post_thumbnail() && ! $show_placeholder ) {
		return;
	}

	if ( has_post_thumbnail() ) {
		if ( \ColibriWP\Theme\Core\Utils::pathGet( $atts, 'link', false ) ) {
			?>
            <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
				<?php echo get_the_post_thumbnail(); ?>
            </a>
			<?php
		} else {
			echo get_the_post_thumbnail();
		}
	}
}

function colibriwp_post_meta_date_url( $atts = array() ) {
	$id   = get_the_ID();
	$link = get_day_link( get_post_time( 'Y', false, $id, true ),
		get_post_time( 'm', false, $id, true ),
		get_post_time( 'j', false, $id, true ) );

	echo $link;
}

function colibriwp_post_categories( $attrs = array() ) {
	$categories = get_the_category( get_the_ID() );
	$atts       = shortcode_atts(
		array(
			'prefix' => '',
		),
		$attrs
	);

	$html = "";
	if ( $atts['prefix'] !== '' ) {
		$html .= '<span class="d-inline-block categories-prefix">' . colibriwp_esc_html_preserve_spaces( $atts['prefix'] ) . '</span>';
	}
	if ( $categories ) {
		foreach ( $categories as $category ) {
			$html .= sprintf( '<a class="d-inline-block" href="%1$s">%2$s</a>',
				esc_url( get_category_link( $category->term_id ) ),
				esc_html( $category->name )
			);
		}
	} else {
		$html .= sprintf( '<span class="d-inline-block">%s</span>', esc_attr__( 'No Category', 'colibri-wp' ) );
	}

	echo $html;
}

function colibriwp_esc_html_preserve_spaces( $text ) {
	return esc_html( str_replace( " ", "&nbsp;", $text ) );
}

function colibriwp_post_tags( $attrs = array() ) {
	$atts = shortcode_atts(
		array(
			'prefix' => '',
		),
		$attrs
	);
	$tags = get_the_tags( get_the_ID() );
	$html = '';
	if ( $atts['prefix'] !== '' ) {
		$html .= '<span class="d-inline-block tags-prefix">' . colibriwp_esc_html_preserve_spaces( $atts['prefix'] ) . '</span>';
	}
	if ( $tags ) {
		foreach ( $tags as $tag ) {
			$tag_link = get_tag_link( $tag->term_id );
			$html     .= "<a class=\"d-inline-block\" href=\"{$tag_link}\" title=\"{$tag->name} Tag\">";
			$html     .= "{$tag->name}</a>";
		}
	} else {
		$html .= sprintf( '<span class="d-inline-block">%s</span>', esc_html__( 'No Tag', 'colibri-wp' ) );
	}

	echo $html;
}


function colibriwp_get_nav_direction_wp_name( $type ) {
	return $type == "next" ? $type : "previous";
}


function colibriwp_print_navigation_button( $type, $button_text ) {
	$args = array(
		'prev_text'          => '%title',
		'next_text'          => '%title',
		'in_same_term'       => false,
		'excluded_terms'     => '',
		'taxonomy'           => 'category',
		'screen_reader_text' => __( 'Post navigation', 'colibri-wp' ),
	);

	$navigation        = '';
	$direction_wp_name = colibriwp_get_nav_direction_wp_name( $type );
	$outer             = "<div class=\"nav-{$direction_wp_name}\">%link</div>";
	$nav_link_fct      = "get_{$direction_wp_name}_post_link";
	$navigation        = call_user_func( $nav_link_fct,
		$outer,
		$button_text,
		$args['in_same_term'],
		$args['excluded_terms'],
		$args['taxonomy']
	);

	// Only add markup if there's somewhere to navigate to.
	if ( $navigation ) {
		$navigation = _navigation_markup( $navigation, 'post-navigation',
			$args['screen_reader_text'] );
	}

	echo $navigation;
}


function colibriwp_post_nav_button( $atts = array() ) {
	$type = $atts['type'];
	$meta = $atts["{$type}_post"];

	$button_text = '<span class="meta-nav" aria-hidden="true">' . $meta . '</span> ' .
	               '<span class="post-title" title="%title">%title</span>';
	colibriwp_print_navigation_button( $type, $button_text );

}


function colibriwp_button_pagination( $args, $atts ) {
	$type          = $atts['type'];
	$nav_direction = colibriwp_get_nav_direction_wp_name( $type );
	$label         = $atts["{$type}_label"];
	$link          = call_user_func( "get_{$nav_direction}_posts_link", '<span>' . $label . '</span>' );
	?>
    <div class="navigation" role="navigation">
        <h2 class="screen-reader-text"><?php echo $args['screen_reader_text'] ?></h2>
        <div class="nav-links">
            <div class="<?php echo $type ?>-navigation"><?php echo $link; ?></div>
        </div>
    </div>
	<?php
}

function colibriwp_numbers_pagination( $args, $atts ) {
	$links = paginate_links( $args );
	$template
	       = '<div class="navigation" role="navigation">' .
	         '  <h2 class="screen-reader-text">' . $args["screen_reader_text"] . '</h2>' .
	         '  <div class="nav-links">' .
	         '      <div class="numbers-navigation">' . $links . '</div>' .
	         ' </div>' .
	         '</div>';
	echo $template;
}


function colibriwp_render_pagination( $pagination_type, $atts = array(), $args = array() ) {
	$args = wp_parse_args( $args, array(
		'before_page_number' => '<span class="meta-nav screen-reader-text">'
		                        . __( 'Page', 'colibri-wp' )
		                        . ' </span>',
		'prev_text'          => '',
		'next_text'          => '',
		'prev_next'          => false,
		'screen_reader_text' => __( 'Posts navigation',
			'colibri-wp' ),
	) );

	call_user_func( $pagination_type, $args, $atts );
}


function colibriwp_archive_nav_button( $attrs = array() ) {

	$atts = shortcode_atts(
		array(
			'type'       => 'next',
			'next_label' => '',
			'prev_label' => ''
		),
		$attrs
	);
	colibriwp_render_pagination( 'colibriwp_button_pagination', $atts );
}


function colibriwp_archive_pagination() {
	colibriwp_render_pagination( '\colibriwp_numbers_pagination' );
}

function colibriwp_post_comments( $attrs = array() ) {
	// comments won't render without post//
	if ( is_customize_preview() ) {
		the_post();
	}

	$atts = shortcode_atts(
		array(
			'none'        => 'No responses yet',
			'one'         => 'One response',
			'multiple'    => 'Responses',
			'avatar_size' => 32
		),
		$attrs
	);

	//colibri_cache_set( 'post_comments_atts', $atts );

	ob_start();


	add_filter( 'comments_template', 'colibriwp_post_comments_template' );
	if ( comments_open( get_the_ID() ) ) {
		comments_template();
	} else {
		return "";
	}
	$content = ob_get_clean();

	remove_filter( 'comments_template', 'colibriwp_post_comments_template' );

	echo $content;
}

function colibriwp_post_comment_form() {

}

function colibriwp_widget_area( $atts ) {

	if ( is_customize_preview() ) {
		global $wp_customize;
		$wp_customize->widgets->selective_refresh_init();
	}

	$atts = shortcode_atts(
		array(
			'id' => 'widget-1',
		),
		$atts
	);

	$id = "colibri-" . $atts['id'];

	ob_start();
	dynamic_sidebar( $id );
	$content = ob_get_clean();
	echo $content;
}

function colibriwp_post_meta_time_url() {
	return '';
}

function colibriwp_post_meta_time_content() {
	return get_the_time();
}

function colibri_output_sidebar_search_form( $form = '' ) {

	ob_start();

	get_template_part( 'template-parts/blog/searchform' );

	return ob_get_clean();
}

function colibriwp_post_comments_template( $form = '' ) {
	return 'template-parts/blog/comments.php';
}

function colibriwp_theme_print_footer_copyright() {
	?>
    <p>
        <span style="font-weight: 600;">&copy; <?php echo date( 'Y' ); ?> <?php bloginfo( 'blogname' ); ?></span>.
		<?php printf( __( 'Built using WordPress and %s', 'colibri-wp' ),
			'<a target="_blank" href="https://colibriwp.com/">ColibriWP Theme</a>'
		); ?> .
    </p>
	<?php
}

function colibriwp_print_offscreen_copyright() {
	echo "&copy; " . date( 'Y' );
}

add_filter( 'get_search_form', "colibri_output_sidebar_search_form", 100 );
