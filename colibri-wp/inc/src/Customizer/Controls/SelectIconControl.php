<?php


namespace ColibriWP\Theme\Customizer\Controls;


use ColibriWP\Theme\Translations;

class SelectIconControl extends VueControl {
	public $type = 'colibri-select-icon';

	protected function printVueContent() {
		?>
        <div class="inline-elements-container">
            <div class="inline-element">
                <select-with-icon
                        slot="control"
                        :value="value"
                        @change="setValue($event)"
                        :items="options"
                        />
            </div>
        </div>

		<?php
	}
}
