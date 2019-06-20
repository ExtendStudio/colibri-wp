<?php


namespace ColibriWP\Theme\Customizer\Controls;


class GradientControl extends VueControl {

	public $type = 'colibri-gradient';

	protected function printVueContent() {
		?>
        <ul class="gradients-list inline-elements-container">
            <li :class="[(gradient.name == value.name)?'selected':'']" class="inline-element" v-for="gradient in gradients"
                @click="setValue(gradient)">
                <div class="web-gradient" :style="computeGradient(gradient)"></div>
            </li>
        </ul>
		<?php
	}
}
