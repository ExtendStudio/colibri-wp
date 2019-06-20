<?php


namespace ColibriWP\Theme\Customizer\Controls;


use ColibriWP\Theme\Translations;

class ComposedControl extends VueControl {

	public $type = 'colibri-composed';
	private $fields = array();


	protected function printVueContent() {
		?>
        <ul class="colibri-fullwidth">
            <li class="customize-control customize-control-colibri-slider"
                v-for="(field, name) in fields"  v-bind:class="classControlType">
                <div :class="{ 'inline-elements-container' : field.inline == true}">
                    <div :class="{ 'inline-element' : field.inline == true}">
                        <span class="customize-control-title"><?php $this->vueEcho( "field.label" ); ?></span>
                    </div>

                    <div :class="{ 'inline-element fit' : field.inline == true}">
                        <div
                                :is="getComponentType(field.type)"
                                v-model="value[name]"
                                v-bind="field.props"
                                @change="propChanged($event,field,name)"></div>
                        <div>
            </li>
        </ul>
		<?php
	}

}
