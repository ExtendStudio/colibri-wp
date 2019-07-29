<div data-colibri-id="25-m1" class="style-110 style-local-25-m1 position-relative">
  <div data-colibri-id="25-m2" id="search-results" class="h-row-container gutters-row-lg-0 gutters-row-md-0 gutters-row-0 gutters-row-v-lg-0 gutters-row-v-md-0 gutters-row-v-0 style-111 style-local-25-m2 position-relative">
    <div class="h-row justify-content-lg-center justify-content-md-center justify-content-center align-items-lg-stretch align-items-md-stretch align-items-stretch gutters-col-lg-0 gutters-col-md-0 gutters-col-0 gutters-col-v-lg-0 gutters-col-v-md-0 gutters-col-v-0">
      <div class="h-column h-column-container d-flex h-col-lg-12 h-col-md-12 h-col-12 style-112-outer style-local-25-m3-outer">
        <div data-colibri-id="25-m3" class="d-flex h-flex-basis h-column__inner h-px-lg-1 h-px-md-1 h-px-1 v-inner-lg-0 v-inner-md-0 v-inner-0 style-112 style-local-25-m3 position-relative">
          <div class="w-100 h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-start align-self-md-start align-self-start">
            <div data-colibri-id="25-m4" class="h-row-container gutters-row-lg-0 gutters-row-md-0 gutters-row-0 gutters-row-v-lg-0 gutters-row-v-md-0 gutters-row-v-0 colibri-dynamic-list style-113 style-local-25-m4 position-relative">
              <div class="h-row justify-content-lg-center justify-content-md-center justify-content-center align-items-lg-stretch align-items-md-stretch align-items-stretch gutters-col-lg-0 gutters-col-md-0 gutters-col-0 gutters-col-v-lg-0 gutters-col-v-md-0 gutters-col-v-0 style-113-row style-local-25-m4-row">
                <?php colibriwp_theme()->get('search-loop')->render(); ?>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div data-colibri-id="25-m13" id="results-navigation" class="h-row-container gutters-row-lg-1 gutters-row-md-1 gutters-row-0 gutters-row-v-lg-1 gutters-row-v-md-1 gutters-row-v-1 style-122 style-local-25-m13 position-relative">
    <div class="h-row justify-content-lg-center justify-content-md-center justify-content-center align-items-lg-stretch align-items-md-stretch align-items-stretch gutters-col-lg-1 gutters-col-md-1 gutters-col-0 gutters-col-v-lg-1 gutters-col-v-md-1 gutters-col-v-1">
      <div class="h-column h-column-container d-flex h-col-lg-auto h-col-md-auto h-col-auto style-123-outer style-local-25-m14-outer">
        <div data-colibri-id="25-m14" class="d-flex h-flex-basis h-column__inner h-px-lg-1 h-px-md-1 h-px-1 v-inner-lg-0 v-inner-md-0 v-inner-0 style-123 style-local-25-m14 position-relative">
          <div class="w-100 h-y-container h-column__content h-column__v-align flex-basis-auto align-self-lg-start align-self-md-start align-self-start">
            <div data-colibri-id="25-m15" class="style-124 style-local-25-m15 position-relative">
              <div class="h-global-transition-all archive-nav-button">
                <?php colibriwp_archive_nav_button(array (
                  'type' => 'prev',
                  'next_label' => __('Next', 'colibri-wp'),
                  'prev_label' => __('Back', 'colibri-wp'),
                )); ?>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-column h-column-container d-flex h-col-lg h-col-md h-col-auto style-125-outer style-local-25-m16-outer">
        <div data-colibri-id="25-m16" class="d-flex h-flex-basis h-column__inner h-px-lg-1 h-px-md-1 h-px-1 v-inner-lg-0 v-inner-md-0 v-inner-0 style-125 style-local-25-m16 position-relative">
          <div class="w-100 h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-start align-self-md-start align-self-start">
            <div data-colibri-id="25-m17" class="style-126 style-local-25-m17 position-relative">
              <div class="h-global-transition-all">
                <?php colibriwp_archive_pagination(); ?>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-column h-column-container d-flex h-col-lg-auto h-col-md-auto h-col-auto style-127-outer style-local-25-m18-outer">
        <div data-colibri-id="25-m18" class="d-flex h-flex-basis h-column__inner h-px-lg-1 h-px-md-1 h-px-1 v-inner-lg-0 v-inner-md-0 v-inner-0 style-127 style-local-25-m18 position-relative">
          <div class="w-100 h-y-container h-column__content h-column__v-align flex-basis-auto align-self-lg-start align-self-md-start align-self-start">
            <div data-colibri-id="25-m19" class="style-128 style-local-25-m19 position-relative">
              <div class="h-global-transition-all archive-nav-button">
                <?php colibriwp_archive_nav_button(array (
                  'type' => 'next',
                  'next_label' => __('Next', 'colibri-wp'),
                  'prev_label' => __('Back', 'colibri-wp'),
                )); ?>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
