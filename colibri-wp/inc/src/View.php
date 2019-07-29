<?php


namespace ColibriWP\Theme;


use ColibriWP\Theme\Core\Hooks;
use ColibriWP\Theme\Core\Tree;
use ColibriWP\Theme\Core\Utils;


class View {


	const CONTENT_ELEMENT = 'content';
	const SECTION_ELEMENT = 'section';
	const ROW_ELEMENT = 'row';
	const COLUMN_ELEMENT = 'column';

	/**
	 * @param       $category
	 * @param       $slug
	 * @param array $data
	 */

	public static function partial( $category, $slug, $data = array() ) {

		$category = Utils::camel2dashed( $category );
		$slug     = Utils::camel2dashed( $slug );

		static::make( "template-parts/{$category}/{$slug}", $data );

	}

	public static function make( $path, $data = array() ) {
		global $wp_query;

		$wp_query->query_vars['colibri_data'] = new Tree( $data );

		if ( file_exists( $path ) ) {
			load_template( $path );
		} else {
			get_template_part( $path );
		}


		$wp_query->query_vars['colibri_data'] = null;
	}

	public static function getData( $path, $default = null ) {
		global $wp_query;
		$colibri_data = $wp_query->query_vars['colibri_data'];
		if ( $colibri_data ) {
			/** @var \ColibriWP\Theme\Core\Tree $colibri_data */
			return $colibri_data->findAt( $path, $default );
		}

		return $default;
	}

	public static function isFrontPage() {
		return is_front_page();
	}

	public static function printMenu( $attrs, $walker = "" ) {
		$attrs = array_merge( array(
			'id'      => null,
			'classes' => '',
		), $attrs );

		$theme_location         = $attrs['id'];
		$customClasses          = $attrs['classes'];
		$drop_down_menu_classes = apply_filters( 'colibri_primary_drop_menu_classes', array( 'colibri-menu' ) );
		$drop_down_menu_classes = array_merge( $drop_down_menu_classes, array( $customClasses ) );


		if ( static::emptyMenu( $theme_location ) ) {
			echo 'No menu items';

			return;
		}

		wp_nav_menu( array(
			'theme_location'  => $theme_location,
			'menu_class'      => esc_attr( implode( " ", $drop_down_menu_classes ) ),
			'container_class' => 'colibri-menu-container',
			'fallback_cb'     => function () use ( $attrs ) {
				static::menuFallback( $attrs );
			},
			'walker'          => $walker,
		) );
	}

	private static function emptyMenu( $theme_location ) {
		$theme_locations = get_nav_menu_locations();
		$menu_id         = 0;

		if ( array_key_exists( $theme_location, $theme_locations ) ) {
			$menu_id = $theme_locations[ $theme_location ];
		}

		$menu_items = wp_get_nav_menu_items( $menu_id );

		if ( $menu_items && count( $menu_items ) === 0 ) {
			return true;
		}

	}

	public static function menuFallback( $attrs, $walker = '' ) {

		$customClasses          = $attrs['classes'];
		$drop_down_menu_classes = apply_filters( 'colibri_primary_drop_menu_classes', array( 'colibri-menu' ) );
		$drop_down_menu_classes = array_merge( $drop_down_menu_classes, array( $customClasses ) );

		return wp_page_menu( array(
			"menu_class" => 'colibri-menu-container',
			'before'     => '<ul class="' . esc_attr( implode( " ", $drop_down_menu_classes ) ) . '">',
			'after'      => apply_filters( 'colibri_nomenu_after', '' ) . "</ul>",
			'walker'     => $walker,
		) );
	}


	public static function printContentWrapperAttrs( $classes = array() ) {

		$classes = is_array( $classes ) ? $classes : array( $classes );
		$classes = array_merge( array( 'gridContainer', 'content' ), $classes );

		$classes = Hooks::colibri_apply_filters( 'content_wrapper_class', $classes );
		$classes = array_unique( $classes );

		$atts = ' class="%s" ';

		printf( $atts, esc_attr( implode( " ", $classes ) ) );
	}

	public static function printEntryThumb( $classes = "" ) {

		$placeholder_color = "#333";
		?>
        <a href="<?php the_permalink(); ?>">
            <div class="image-container-frame">
				<?php
				if ( has_post_thumbnail() ) {
					the_post_thumbnail( 'post-thumbnail', array(
						"class" => $classes,
					) );
				} else {
					?>
                    <svg class="colibri-post-list-item-thumb-placeholder <?php echo esc_attr( $classes ); ?>"
                         width="890" height="580"
                         viewBox="0 0 890 580" preserveAspectRatio="none">
                        <rect width="890" height="580"
                              style="fill:<?php echo esc_attr( $placeholder_color ); ?>;"></rect>
                    </svg>
					<?php
				}
				?>
            </div>
        </a>
		<?php
	}

	public static function printPagination( $args = array(), $class = 'pagination' ) {
		if ( $GLOBALS['wp_query']->max_num_pages <= 1 ) {
			return;
		}

		$args = wp_parse_args( $args, array(
			'mid_size'           => 2,
			'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'colibri-wp' )
			                        . ' </span>',
			'prev_text'          => __( '<i class="fa fa-angle-left" aria-hidden="true"></i>', 'colibri-wp' ),
			'next_text'          => __( '<i class="fa fa-angle-right" aria-hidden="true"></i>', 'colibri-wp' ),
			'screen_reader_text' => __( 'Posts navigation', 'colibri-wp' ),
		) );

		$links = paginate_links( $args );

		$next_link = get_previous_posts_link( __( '<i class="fa fa-angle-left" aria-hidden="true"></i>',
			'colibri-wp' ) );
		$prev_link = get_next_posts_link( __( '<i class="fa fa-angle-right" aria-hidden="true"></i>',
			'colibri-wp' ) );

		$template = '<div class="navigation %1$s" role="navigation">' .
		            '  <h2 class="screen-reader-text">%2$s</h2>' .
		            '  <div class="nav-links">' .
		            '    <div class="prev-navigation">%3$s</div>' .
		            '    <div class="numbers-navigation">%4$s</div>' .
		            '    <div class="next-navigation">%5$s</div>' .
		            '  </div>' .
		            '</div>';

		echo sprintf( $template, esc_attr( $class ), $args['screen_reader_text'], $next_link, $links, $prev_link );
	}

	public static function printRowStart( $outer_classes = array(), $inner_classes = array() ) {
		$outer_classes = array_merge( array(
			"gutters-row-2",
			"gutters-row-lg-2",
			"gutters-row-md-2",
			"gutters-row-v-2",
			"gutters-row-v-lg-2",
			"gutters-row-v-md-2",
			"h-row-container",
			"h-section-fluid-container"
		), $outer_classes );

		$inner_classes = array_merge( array( 'h-row' ), $inner_classes );

		?>
        <div class="<?php echo esc_attr( implode( " ", $outer_classes ) ); ?>">
        <div class="<?php echo esc_attr( implode( " ", $inner_classes ) ); ?>">
		<?php
	}

	public static function printRowEnd() {
		?>
        </div>
        </div>
		<?php
	}

	public static function printSectionStart() {
		?>
        <div class="d-flex h-section h-section-global-spacing position-relative">
        <div class="h-section-grid-container h-section-boxed-container">
		<?php
	}

	public static function printSectionEnd() {
		?>
        </div>
        </div>
		<?php
	}

	public static function printContentStart( $class = array() ) {
		$class = array_merge( array( 'content position-relative' ), $class );
		?>
        <div id="content" class="<?php echo esc_attr( implode( " ", $class ) ); ?>">
		<?php
	}

	public static function printContentEnd() {
		?>
        </div>
		<?php
	}


	public static function printColumnStart( $class = array() ) {
		$class = array_merge( array( 'h-col' ), $class );
		?>
        <div class="<?php echo esc_attr( implode( " ", $class ) ); ?>">
		<?php
	}

	public static function printColumnEnd() {
		?>
        </div>
		<?php
	}

	public static function printIn( $wrapper, $to_print, $args = array() ) {
		$wrapper              = ucfirst( strtolower( $wrapper ) );
		$wrapperFunctionStart = "print{$wrapper}Start";
		$wrapperFunctionEnd   = "print{$wrapper}End";
		if ( method_exists( View::class, "{$wrapperFunctionStart}" ) ) {
			if ( method_exists( View::class, "{$wrapperFunctionEnd}" ) ) {
				call_user_func_array( array( View::class, $wrapperFunctionStart ), $args );
				call_user_func( $to_print );
				call_user_func_array( array( View::class, $wrapperFunctionEnd ), $args );
			}
		}
	}
}
