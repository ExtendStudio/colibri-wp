<?php
if ( post_password_required() ):
	return;
endif;
$colibri_post_comments_atts = \ExtendBuilder\colibri_cache_get( 'post_comments_atts' );

$titles = $colibri_post_comments_atts;

?>

<div class="post-comments">
    <h3 class="comments-title">
    	<span class="comments-number">
            <?php
            $number = get_comments_number();
            if ( $number === '0' ) {
	            _( $titles['none'] );
            }
            if ( $number === '1' ) {
	            _( $titles['one'] );
            }
            if ( $number > 1 ) {
	            echo str_replace( "{COMMENTS-COUNT}", $number, $titles['multiple'] );
            }
            ?>
    	</span>
    </h3>

    <ol class="comment-list">
		<?php
		wp_list_comments( array(
			'avatar_size' => $colibri_post_comments_atts['avatar_size'],
		) );
		?>
    </ol>

	<?php
	if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ):
		?>
        <div class="navigation">
            <div class="prev-posts">
				<?php previous_comments_link( __( '<i class="font-icon-post fa fa-angle-double-left"></i> Older Comments',
					'colibri-wp' ) ); ?>
            </div>
            <div class="next-posts">
				<?php next_comments_link( __( 'Newer Comments <i class="font-icon-post fa fa-angle-double-right"></i>',
					'colibri-wp' ) ); ?>
            </div>
        </div>
	<?php
	endif;
	?>

	<?php
	if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ):
		?>
        <p class="no-comments"><?php _e( 'Comments are closed.', 'colibri-wp' ); ?></p>
	<?php
	endif;
	?>

</div>
