<?php
use ColibriWP\Theme\Translations;

$is_builder_installed = apply_filters( 'colibri_page_builder/installed', false );
$get_setting_link = function($setting) {
    return esc_attr(colibriwp_theme()->getCustomizer()->getSettingQuickLink($setting));
}
?>

<div class="colibri-get-started__container colibri-admin-panel">
    <div class="colibri-get-started__section">
        <h2 class="col-title colibri-get-started__section-title">
            <span class="colibri-get-started__section-title__icon dashicons dashicons-admin-plugins"></span>
			<?php Translations::escHtmlE( 'get_started_section_1_title' ); ?>
        </h2>
        <div class="colibri-get-started__content">


			<?php foreach ( colibriwp_theme()->getPluginsManager()->getPluginData() as $slug => $plugin_data ): ?>
				<?php
				$colibriwp_plugin_state = colibriwp_theme()->getPluginsManager()->getPluginState( $slug );
				$colibriwp_notice_type  = $colibriwp_plugin_state === \ColibriWP\Theme\PluginsManager::ACTIVE_PLUGIN ? 'blue' : '';
				?>
                <div class="colibri-notice <?php echo esc_attr( $colibriwp_notice_type ); ?>">
                    <div class="colibri-notice__header">
                        <h3 class="colibri-notice__title"><?php echo esc_html( colibriwp_theme()->getPluginsManager()->getPluginData( "{$slug}.name" ) ); ?></h3>
                        <div class="colibri-notice__action">
							<?php if ( $colibriwp_plugin_state === \ColibriWP\Theme\PluginsManager::ACTIVE_PLUGIN ): ?>
                                <p class="colibri-notice__action__active"><?php \ColibriWP\Theme\Translations::escHtmlE( 'plugin_installed_and_active' ); ?> </p>
							<?php else: ?>
								<?php if ( $colibriwp_plugin_state === \ColibriWP\Theme\PluginsManager::INSTALLED_PLUGIN ): ?>
                                    <a class="button button-large"
                                       href="<?php echo esc_attr( colibriwp_theme()->getPluginsManager()->getActivationLink( $slug ) ); ?>">
										<?php \ColibriWP\Theme\Translations::escHtmlE( 'activate' ); ?>
                                    </a>
								<?php else: ?>
                                    <a class="button button-large"
                                       href="<?php echo esc_attr( colibriwp_theme()->getPluginsManager()->getInstallLink( $slug ) ); ?>">
										<?php \ColibriWP\Theme\Translations::escHtmlE( 'install' ); ?>
                                    </a>
								<?php endif; ?>
							<?php endif; ?>
                        </div>
                    </div>
                    <p class="colibri-notice__description"><?php echo esc_html( colibriwp_theme()->getPluginsManager()->getPluginData( "{$slug}.description" ) ); ?></p>


                </div>
			<?php endforeach; ?>
        </div>
    </div>
    <div class="colibri-get-started__section">
        <h2 class="colibri-get-started__section-title">
            <span class="colibri-get-started__section-title__icon dashicons dashicons-admin-appearance"></span>
			<?php Translations::escHtmlE( 'get_started_section_2_title' ); ?>
        </h2>
        <div class="colibri-get-started__content">
            <div class="colibri-customizer-option__container">
                <div class="colibri-customizer-option">
                    <span class="colibri-customizer-option__icon dashicons dashicons-format-image"></span>
                    <a class="colibri-customizer-option__label"
                       target="_blank"
                       href="<?php echo $get_setting_link('logo');?>" >
                        <?php Translations::escHtmlE( 'get_started_set_logo' ); ?>
                    </a>
                </div>
                <div class="colibri-customizer-option">
                    <span class="colibri-customizer-option__icon dashicons dashicons-format-image"></span>
                    <a class="colibri-customizer-option__label"
                       target="_blank"
                       href="<?php echo $get_setting_link('hero_background'); ?>" >
	                    <?php Translations::escHtmlE( 'get_started_change_hero_image' ); ?>
                    </a>
                </div>
                <div class="colibri-customizer-option">
                    <span class="colibri-customizer-option__icon dashicons dashicons-menu-alt3"></span>
                    <a class="colibri-customizer-option__label"
                       target="_blank"
                       href="<?php echo $get_setting_link('navigation'); ?>" >
		                <?php Translations::escHtmlE( 'get_started_change_customize_navigation' ); ?>
                    </a>
                </div>
                <div class="colibri-customizer-option">
                    <span class="colibri-customizer-option__icon dashicons dashicons-layout"></span>
                    <a class="colibri-customizer-option__label"
                       target="_blank"
                       href="<?php echo $get_setting_link('hero_layout'); ?>" >
		                <?php Translations::escHtmlE( 'get_started_change_customize_hero' ); ?>
                    </a>
                </div>
                <div class="colibri-customizer-option">
                    <span class="colibri-customizer-option__icon dashicons dashicons-admin-appearance"></span>
                    <a class="colibri-customizer-option__label"
                       target="_blank"
                       href="<?php echo $get_setting_link('footer'); ?>" >
		                <?php Translations::escHtmlE( 'get_started_customize_footer' ); ?>
                    </a>
                </div>
                <?php if($is_builder_installed): ?>
                <div class="colibri-customizer-option">
                    <span class="colibri-customizer-option__icon dashicons dashicons-art"></span>
                    <a class="colibri-customizer-option__label"
                       target="_blank"
                       href="<?php echo $get_setting_link('color_scheme'); ?>" >
		                <?php Translations::escHtmlE( 'get_started_change_color_settings' ); ?>
                    </a>
                </div>
                <div class="colibri-customizer-option">
                    <span class="colibri-customizer-option__icon dashicons dashicons-editor-textcolor"></span>
                    <a class="colibri-customizer-option__label"
                       target="_blank"
                       href="<?php echo $get_setting_link('general_typography'); ?>" >
		                <?php Translations::escHtmlE( 'get_started_customize_fonts' ); ?>
                    </a>
                </div>

                <?php endif; ?>
                <div class="colibri-customizer-option">
                    <span class="colibri-customizer-option__icon dashicons dashicons-menu-alt3"></span>
                    <a class="colibri-customizer-option__label"
                       target="_blank"
                       href="<?php echo $get_setting_link('menu'); ?>" >
		                <?php Translations::escHtmlE( 'get_started_set_menu_links' ); ?>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
