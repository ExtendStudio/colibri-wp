<?php


namespace ColibriWP\Theme\Customizer\Controls;


use ColibriWP\Theme\Translations;
use WP_Customize_Manager;

class ButtonControl extends VueControl {

	public $type = 'colibri-button';

	protected function printVueContent() {
		?>
        <div class="colibri-fullwidth">
            <div class="inline-elements-container">
                <div class="inline-element fit">
                    <# if ( data.label ) { #>
                    <el-button :value="value" @click="onClick"
                               type="default">{{{ data.label }}}
                    </el-button>
                    <# } #>
                </div>
            </div>
        </div>
		<?php
	}
}
