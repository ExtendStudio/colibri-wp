<?php


namespace ColibriWP\Theme\Customizer\Controls;


use ColibriWP\Theme\Translations;

class PluginMessageControl extends VueControl {

	public    $type       = "colibri-plugin-message";

	protected function printVueContent() {
		?>
		<div class="plugin-message card">
			<p>
				<?php echo Translations::get( 'plugin_message' );?>
			</p>
			<a href="<?php echo colibriwp_companion_plugin_link();?>" target="_blank" class="el-button el-link h-col el-button--primary el-button--small" style="text-decoration: none">
				<?php echo Translations::get( 'plugin_message_btn' );?>
            </a>
		</div>
		<?php
	}
}
