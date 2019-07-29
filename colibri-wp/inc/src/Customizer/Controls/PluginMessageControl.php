<?php


namespace ColibriWP\Theme\Customizer\Controls;


use ColibriWP\Theme\Core\Hooks;
use ColibriWP\Theme\PluginsManager;
use ColibriWP\Theme\Translations;

class PluginMessageControl extends VueControl {

	public $type = "colibri-plugin-message";

	protected function printVueContent() {

		$this->addData();

		?>
        <div class="plugin-message card">
            <p>
				<?php echo Translations::get( 'plugin_message', 'Colibri Page Builder' ); ?>
            </p>
			<?php if ( colibriwp_theme()->getPluginsManager()->getPluginState( 'colibri-page-builder' ) === PluginsManager::NOT_INSTALLED_PLUGIN ): ?>
                <button data-colibri-plugin-action="install"
                        class="el-button el-link h-col el-button--primary el-button--small"
                        style="text-decoration: none">
					<?php echo Translations::get( 'install_with_placeholder', 'Colibri Page Builder' ); ?>
                </button>
			<?php endif; ?>

			<?php if ( colibriwp_theme()->getPluginsManager()->getPluginState( 'colibri-page-builder' ) === PluginsManager::INSTALLED_PLUGIN ): ?>
                <button data-colibri-plugin-action="activate"
                        class="el-button el-link h-col el-button--primary el-button--small"
                        style="text-decoration: none">
					<?php echo Translations::get( 'activate_with_placeholder', 'Colibri Page Builder' ); ?>
                </button>
			<?php endif; ?>

            <p class="notice notice-large" data-colibri-plugin-action-message="1" style="display: none"></p>
        </div>
		<?php
	}

	public function addData() {

		if ( Hooks::colibri_apply_filters( 'plugin-customizer-controller-data-added', false ) ) {
			return;
		}

		Hooks::colibri_add_filter( 'plugin-customizer-controller-data-added', '__return_true' );

		add_action( 'customize_controls_print_footer_scripts', function () {

			$data = array(
				"status"       => colibriwp_theme()->getPluginsManager()->getPluginState( 'colibri-page-builder' ),
				"install_url"  => colibriwp_theme()->getPluginsManager()->getInstallLink( 'colibri-page-builder' ),
				"activate_url" => colibriwp_theme()->getPluginsManager()->getActivationLink( 'colibri-page-builder' ),
				"messages"     => array(
					"installing" => \ColibriWP\Theme\Translations::get( 'installing',
						'Colibri Page Builder' ),
					"activating" => \ColibriWP\Theme\Translations::get( 'activating',
						'Colibri Page Builder' )
				),
				"admin_url"    => add_query_arg( 'colibri_create_pages', '1', admin_url() ),
			);
			?>
            <script>
                window.colibriwp_plugin_status = <?php echo json_encode( $data ); ?>
            </script>
			<?php
		}, PHP_INT_MAX );

	}
}
