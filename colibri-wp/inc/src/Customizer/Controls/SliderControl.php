<?php


namespace ColibriWP\Theme\Customizer\Controls;


class SliderControl extends VueControl
{
    public $type = 'colibri-slider';

    protected function printVueContent()
    {
        ?>
        <div class="inline-elements-container">
            <div class="inline-element">
                <el-slider
                        v-model="value"
                        :min="min"
                        :max="max"
                        :step="step"
                        @change="setValue"
                >
                </el-slider>
            </div>
            <div class="inline-element fit">
                <el-input-number
                        size="small"
                        v-model="value"
                        :min="min"
                        :max="max"
                        :step="step"
                        @keyup.native="keyUp"
                        @change="setValue"
                        controls-position="right">
                </el-input-number>
            </div>
        </div>
        <?php
    }
}
