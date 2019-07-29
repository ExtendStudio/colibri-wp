<?php


namespace ColibriWP\Theme\Customizer\Controls;


class InputControl extends VueControl {

	public $type = "colibri-input";
	protected $input_type = "text";

	public function json() {
		$json = parent::json();

		$json['input_type'] = $this->input_type;

		return $json;
	}

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
