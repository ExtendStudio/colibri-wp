<?php

function colibriwp_get_shortocode_atts( $shortcode ) {
	$regex = str_replace( '_shortcode_', '\w+', get_shortcode_regex( array( '_shortcode_' ) ) );
	if ( preg_match( '/' . $regex . '/', $shortcode, $matches ) ) {
		$attr = shortcode_parse_atts( $matches[3] );

		return $attr;
	}

	return array();
}

function colibriwp_page_title( $atts = array() ) {
	$title = '';
    if (get_theme_mod('show_single_item_title', true)) {
	    $title = get_the_title();
	}
	$html = "<span><" . $atts['tag'] . " style='margin-bottom:0'>" . $title . "</" . $atts['tag'] . "></span>";

	return $html;
}

function colibriwp_post_thumb_placeholder_classes( $atts = array() ) {
	$result = 'colibri-post-thumbnail-has-placeholder';

	$show_placeholder = get_theme_mod('blog_show_post_thumb_placeholder', true);
	if ($show_placeholder == '1') {
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

	$show_placeholder = get_theme_mod('blog_show_post_thumb_placeholder', true);
	if ( ! has_post_thumbnail() && ! $show_placeholder) {
		return;
	}

	if ( has_post_thumbnail() ) {
		if ( $atts['link'] != "true" ) {
			echo get_the_post_thumbnail();
		} else {
			?>
            <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
				<?php echo get_the_post_thumbnail(); ?>
            </a>
			<?php
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
	ob_start();
	if ( $atts['prefix'] !== '' ) {
		echo '<span class="d-inline-block categories-prefix">' . $atts['prefix'] . '</span>';
	}
	if ( $categories ) {
		foreach ( $categories as $category ) {
			printf( '<a class="d-inline-block" href="%1$s">%2$s</a>',
				esc_url( get_category_link( $category->term_id ) ),
				esc_html( $category->name )
			);
		}
	}

	return ob_get_clean();
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
		$html .= '<span class="d-inline-block tags-prefix">' . $atts['prefix'] . '</span>';
	}
	if ( $tags ) {
		foreach ( $tags as $tag ) {
			$tag_link = get_tag_link( $tag->term_id );
			$html     .= "<a class=\"d-inline-block\" href=\"{$tag_link}\" title=\"{$tag->name} Tag\">";
			$html     .= "{$tag->name}</a>";
		}
	}
	ob_start();
	echo $html;

	return ob_get_clean();
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
	$meta = esc_html__( $atts["{$type}_post"] );

	$meta        = esc_html__( $atts["{$type}_post"] );
	$button_text = '<span class="meta-nav" aria-hidden="true">'
	               . $meta . '</span> ' .
	               '<span class="post-title" title="%title">%title</span>';
	colibriwp_print_navigation_button( $type, $button_text );

}


function colibriwp_button_pagination( $args, $atts ) {
	$type           = $atts['type'];
	$nav_direction = colibriwp_get_nav_direction_wp_name( $type );
	$label          = $atts["{$type}_label"];
	$fct_name       = "get_{$nav_direction}_posts_link";
	$link           = is_customize_preview()
		? '<a>' . $label . '</a>'
		: call_user_func( $fct_name,
			__( '<span>' . $label . '</span>', 'colibri-page-builder' ) );
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
	$empty
	       = '<span class="page-numbers current">1</span> <a class="page-numbers">2</a>';
	$template
	       = '<div class="navigation" role="navigation">
            <h2 class="screen-reader-text">' . $args["screen_reader_text"] . '</h2>
            <div class="nav-links"><div class="numbers-navigation">'
	         . ( is_customize_preview() ? $empty : $links ) . '</div></div>
            </div>';
	echo $template;
}


function colibriwp_render_pagination(
	$pagination_type,
	$atts = array(),
	$args = array()
) {
	$args = wp_parse_args( $args, array(
		'before_page_number' => '<span class="meta-nav screen-reader-text">'
		                        . __( 'Page', 'colibri-page-builder' )
		                        . ' </span>',
		'prev_text'          => '',
		'next_text'          => '',
		'prev_next'          => false,
		'screen_reader_text' => __( 'Posts navigation',
			'colibri-page-builder' ),
	) );

	if ( is_customize_preview() ) {
		global $wp_query, $paged;

		if ( isset($wp_query->query['paged']) ) {
			$paged = $wp_query->query['paged'];
		}
	}

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

	$sidebars_widgets = wp_get_sidebars_widgets();

	if ( empty( $sidebars_widgets[ $id ] ) || ! is_array( $sidebars_widgets[ $id ] ) ) {
		ob_start();
		colibri_preview_empty_area( $id );
		$content = ob_get_clean();
	}
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
add_filter( 'get_search_form', "colibri_output_sidebar_search_form", 100 );
