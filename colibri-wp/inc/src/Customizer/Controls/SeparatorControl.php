<?php


namespace ColibriWP\Theme\Customizer\Controls;

class SeparatorControl extends VueControl {

	public $type = "colibri-separator";

	protected function printVueContent() {
		?>
           <div class="separator">&nbsp;</div>
		<?php
	}
}
