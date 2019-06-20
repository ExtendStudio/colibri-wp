<?php


namespace ColibriWP\Theme\Customizer\Controls;


use ColibriWP\Theme\Translations;

class IconControl extends VueControl {

	public $type = "colibri-icon";

	protected function printVueContent() {
		?>
			<icon-picker :value="value" :icons="icons"></icon-picker>
		<?php
	}
}
