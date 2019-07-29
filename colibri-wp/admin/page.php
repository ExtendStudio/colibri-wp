<?php


$colibriwp_tabs            = \ColibriWP\Theme\View::getData( 'tabs', array() );
$colibriwp_current_tab     = \ColibriWP\Theme\View::getData( 'current_tab', null );
$colibriwp_url             = \ColibriWP\Theme\View::getData( 'page_url', null );
$colibriwp_welcome_message = \ColibriWP\Theme\View::getData( 'welcome_message', null );
$colibriwp_tab_partial     = \ColibriWP\Theme\View::getData( "tabs.{$colibriwp_current_tab}.tab_partial", null );
\ColibriWP\Theme\Core\Hooks::colibri_do_action("before_info_page_tab_{$colibriwp_current_tab}");

?>
<div class="colibri-admin-page wrap about-wrap full-width-layout mesmerize-page">

    <div class="colibri-admin-page--hero">
        <div class="colibri-admin-page--hero-intro colibri-admin-page-spacing ">
            <div class="colibri-admin-page--hero-logo">
                <img src="<?php echo esc_attr( colibriwp_theme()->getAssetsManager()->getBaseURL() . "/images/colibri-logo.png" ) ?>"
                     alt="logo"/>
            </div>
            <div class="colibri-admin-page--hero-text ">
				<?php if ( $colibriwp_welcome_message ): ?>
                    <h1><?php echo esc_html( $colibriwp_welcome_message ); ?></h1>
				<?php endif; ?>
            </div>
        </div>
	<?php if ( count( $colibriwp_tabs ) ): ?>
        <nav class="nav-tab-wrapper wp-clearfix">
			<?php foreach ( $colibriwp_tabs as $id => $tab ) : ?>
                <a class="nav-tab <?php echo ( $colibriwp_current_tab === $id ) ? 'nav-tab-active' : '' ?>"
                   href="<?php echo esc_attr( add_query_arg( array( 'current_tab' => $id ), $colibriwp_url ) ); ?>">
					<?php echo esc_html( $tab['title'] ); ?>
                </a>
			<?php endforeach; ?>
        </nav>
	<?php endif; ?>
    </div>
	<?php if ( $colibriwp_tab_partial ): ?>
        <div class="colibri-admin-page--body colibri-admin-page-spacing">
            <div class="colibri-admin-page--content">
                <div class="colibri-admin-page--tab">
                    <div class="colibri-admin-page--tab-<?php echo esc_attr( $colibriwp_current_tab ); ?>">
						<?php \ColibriWP\Theme\View::make( $colibriwp_tab_partial,
							\ColibriWP\Theme\Core\Hooks::colibri_apply_filters( "info_page_data_tab_{$colibriwp_current_tab}",
								array() ) ); ?>
                    </div>
                </div>

            </div>
            <div class="colibri-admin-page--sidebar">
                <?php \ColibriWP\Theme\View::make('admin/sidebar') ?>
            </div>
        </div>
	<?php endif; ?>
</div>


