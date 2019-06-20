<?php


namespace ColibriWP\Theme\Customizer\Controls;


class InputControl extends VueControl {

	public    $type       = "colibri-input";
	protected $input_type = "text";

	protected function printVueContent() {
		?>
        <el-input
                @change="setValue"
                :type="input_type"
                placeholder=""
                v-model="value"
                clearable>
        </el-input>
		<?php
	}
}
