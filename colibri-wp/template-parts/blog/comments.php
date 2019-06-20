<?php
if ( post_password_required() ):
	return;
endif;

?>

<div class="post-comments">
    <h3 class="comments-title">
    	<span class="comments-number">
            <?php comments_number(
	            __( 'No responses yet', 'colibri-wp' ),
	            __( 'One response', 'colibri-wp' ),
	            __( '% Responses', 'colibri-wp' )
            ); ?>
    	</span>
    </h3>
    <ol class="comment-list">
		<?php wp_list_comments( array( 'avatar_size' => 32, ) ); ?>
    </ol>
	<?php
	if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ):
		?>
        <div class="navigation">
            <div class="prev-posts">
				<?php previous_comments_link( __( 'Older Comments', 'colibri-wp' ) ); ?>
            </div>
            <div class="next-posts">
				<?php next_comments_link( __( 'Newer Comments', 'colibri-wp' ) ); ?>
            </div>
        </div>
	<?php
	endif;

	if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ):
		?>
        <p class="no-comments"><?php _e( 'Comments are closed.', 'colibri-wp' ); ?></p>
	<?php
	endif;
	?>

</div>
