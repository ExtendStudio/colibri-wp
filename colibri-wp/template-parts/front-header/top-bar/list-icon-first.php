<li class="list-item no-gutters">
  <div class="list-container-divider d-flex justify-content-lg-start justify-content-md-start justify-content-start first-el-spacer"></div>
  <a href="<?php echo esc_html(\ColibriWP\Theme\View::getData( 'link_value' )); ?>" class="item-link no-gutters">
    <div class="d-flex h-col no-gutters align-items-lg-center align-items-md-center align-items-center justify-content-lg-start justify-content-md-start justify-content-start list-item-text-wrapper">
      <div class="h-col-auto d-flex">
        <span class="h-svg-icon style-141-icon style-local-7-h22-icon">
          <?php $icon = \ColibriWP\Theme\View::getData( 'icon' ); if (isset($icon['content'])) echo $icon['content'] ?>
        </span>
      </div>
      <div class="h-col-auto">
        <span class="list-text d-block">
          <span>
            <?php echo esc_html(\ColibriWP\Theme\View::getData( 'text' )); ?>
          </span>
        </span>
      </div>
    </div>
  </a>
  <div class="list-container-divider d-flex justify-content-lg-start justify-content-md-start justify-content-start"></div>
</li>
