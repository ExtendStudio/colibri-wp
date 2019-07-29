<div data-colibri-id="10-h5" class="d-flex align-items-center text-lg-center text-md-center text-center justify-content-lg-center justify-content-md-center justify-content-center style-204 style-local-10-h5 position-relative h-element">
  <?php $component = \ColibriWP\Theme\View::getData( 'component' ); ?>
                        <?php if ($component->getLayoutType() == 'image') : ?>
  <a href="<?php echo $component->getHomeUrl(); ?>" class="d-flex align-items-center">
    <img src="<?php echo $component->customLogoUrl(); ?>" class="h-logo__image h-logo__image_h logo-image style-204-image style-local-10-h5-image"/>
    <img src="<?php echo $component->alternateLogoUrl(); ?>" class="h-logo__alt-image h-logo__alt-image_h logo-alt-image style-204-image style-local-10-h5-image"/>
  </a>
  <?php endif; ?>
                      <?php if ($component->getLayoutType() == 'text') { $component->printTextLogo(); }?>
</div>
