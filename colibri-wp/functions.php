<?php

/**
 * 
 * Sets up theme defaults and registers support for various WordPress features.
 *
 */

if ( ! defined( 'COLIBRI_THEME_REQUIRED_PHP_VERSION' ) ) {
	define( 'COLIBRI_THEME_REQUIRED_PHP_VERSION', '5.6.0' );
}

add_action( 'after_switch_theme', 'colibriwp_check_php_version' );

function colibriwp_check_php_version() {
	// Compare versions.
	if ( version_compare( phpversion(), COLIBRI_THEME_REQUIRED_PHP_VERSION, '<' ) ) :
		// Theme not activated info message.
		add_action( 'admin_notices', 'colibriwp_php_version_notice' );

		// Switch back to previous theme.
		switch_theme( get_option( 'theme_switched' ) );

		return false;
	endif;
}

function colibriwp_php_version_notice() {
	?>
    <div class="notice notice-alt notice-error notice-large">
        <h4><?php esc_html_e( 'Colibri theme activation failed!', 'colibri-wp' ); ?></h4>
        <p>
			<?php printf( esc_html__( 'You need to update your PHP version to use the %s.', 'colibri-wp' ),
				' <strong>Colibri</strong>' ); ?>
            <br/>
			<?php printf( esc_html__( 'Current php version is: %1$s and the mininum required version is %2$s',
				'colibri-wp' ),
				"<strong>" . phpversion() . "</strong>",
				"<strong>" . COLIBRI_THEME_REQUIRED_PHP_VERSION . "</strong>" );
			?>

        </p>
    </div>
	<?php
}

if ( version_compare( phpversion(), COLIBRI_THEME_REQUIRED_PHP_VERSION, '>=' ) ) {
	require_once get_template_directory() . "/inc/functions.php";
} else {
	add_action( 'admin_notices', 'colibriwp_php_version_notice' );
}

function colibriwp_companion_plugin_link() {
	return apply_filters( 'colibriwp_companion_plugin_link', '#' );
}
