<div class="<?php colibriwp_print_archive_entry_class("h-column h-column-container d-flex  masonry-item style-84-outer style-local-19-m5-outer");?>" data-masonry-width="<?php colibriwp_print_masonry_col_class(true); ?>">
  <div data-colibri-id="19-m5" class="d-flex h-flex-basis h-column__inner h-px-lg-0 h-px-md-0 h-px-0 v-inner-lg-0 v-inner-md-0 v-inner-0 style-84 style-local-19-m5 position-relative">
    <div class="w-100 h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-start align-self-md-start align-self-start">
      <div data-href="<?php the_permalink(); ?>" data-colibri-component="link" data-colibri-id="19-m6" class="colibri-post-thumbnail <?php colibriwp_post_thumbnail_classes(); ?> <?php colibriwp_post_thumb_placeholder_classes(); ?> style-85 style-local-19-m6 h-overflow-hidden position-relative">
        <div class="h-global-transition-all colibri-post-thumbnail-shortcode style-dynamic-19-m6-height">
          <?php colibriwp_post_thumbnail(array (
            'link' => true,
          )); ?>
        </div>
        <div class="colibri-post-thumbnail-content align-items-lg-center align-items-md-center align-items-center flex-basis-100">
          <div class="w-100 h-y-container"></div>
        </div>
      </div>
      <div data-colibri-id="19-m7" class="h-row-container gutters-row-lg-2 gutters-row-md-3 gutters-row-3 gutters-row-v-lg-2 gutters-row-v-md-3 gutters-row-v-3 style-86 style-local-19-m7 position-relative">
        <div class="h-row justify-content-lg-center justify-content-md-center justify-content-center align-items-lg-stretch align-items-md-stretch align-items-stretch gutters-col-lg-2 gutters-col-md-3 gutters-col-3 gutters-col-v-lg-2 gutters-col-v-md-3 gutters-col-v-3">
          <div class="h-column h-column-container d-flex h-col-lg h-col-md h-col-auto style-87-outer style-local-19-m8-outer">
            <div data-colibri-id="19-m8" class="d-flex h-flex-basis h-column__inner h-px-lg-2 h-px-md-3 h-px-2 v-inner-lg-2 v-inner-md-3 v-inner-2 style-87 style-local-19-m8 position-relative">
              <div class="w-100 h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-start align-self-md-start align-self-start">
                <div data-colibri-id="19-m9" class="h-blog-title style-88 style-local-19-m9 position-relative">
                  <div class="h-global-transition-all">
                    <?php the_title('<h4 class="colibri-word-wrap">', '</h4>'); ?>
                  </div>
                </div>
                <div data-colibri-id="19-m10" class="style-89 style-local-19-m10 position-relative">
                  <div class="h-global-transition-all">
                    <?php the_excerpt(); ?>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-colibri-id="19-m11" class="h-row-container gutters-row-lg-2 gutters-row-md-2 gutters-row-2 gutters-row-v-lg-2 gutters-row-v-md-2 gutters-row-v-2 style-90 style-local-19-m11 position-relative">
        <div class="h-row justify-content-lg-center justify-content-md-center justify-content-center align-items-lg-stretch align-items-md-stretch align-items-stretch gutters-col-lg-2 gutters-col-md-2 gutters-col-2 gutters-col-v-lg-2 gutters-col-v-md-2 gutters-col-v-2">
          <div class="h-column h-column-container d-flex h-col style-91-outer style-local-19-m12-outer">
            <div data-colibri-id="19-m12" class="d-flex h-flex-basis h-column__inner h-px-lg-0 h-px-md-0 h-px-0 v-inner-lg-0 v-inner-md-0 v-inner-0 style-91 style-local-19-m12 position-relative">
              <div class="w-100 h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-center align-self-md-center align-self-center">
                <?php if ( apply_filters( 'colibriwp_show_post_meta', true ) ): ?>
                <div data-colibri-id="19-m13" class="h-blog-meta h-global-transition-all style-92 style-local-19-m13 position-relative">
                  <div name="1" class="metadata-item">
                    <span class="metadata-prefix">
                      <?php esc_html_e('by','colibri-wp'); ?>
                    </span>
                    <a href="<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>">
                      <span class="h-svg-icon">
                        <!--Icon by Font Awesome (https://fontawesome.com)-->
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="user" viewBox="0 0 1354.8114 1896.0833">
                          <path d="M1280 1399q0 109-62.5 187t-150.5 78H213q-88 0-150.5-78T0 1399q0-85 8.5-160.5t31.5-152 58.5-131 94-89T327 832q131 128 313 128t313-128q76 0 134.5 34.5t94 89 58.5 131 31.5 152 8.5 160.5zm-256-887q0 159-112.5 271.5T640 896 368.5 783.5 256 512t112.5-271.5T640 128t271.5 112.5T1024 512z"></path>
                        </svg>
                      </span>
                      <?php echo get_the_author_meta( 'display_name', get_the_author_meta( 'ID' ) ); ?>
                    </a>
                  </div>
                  <div name="2" class="metadata-item">
                    <span class="metadata-prefix">
                      <?php esc_html_e('on','colibri-wp'); ?>
                    </span>
                    <a href="<?php colibriwp_post_meta_date_url(); ?>">
                      <span class="h-svg-icon">
                        <!--Icon by Font Awesome (https://fontawesome.com)-->
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="calendar" viewBox="0 0 1672.2646 1896.0833">
                          <path d="M128 1664h288v-288H128v288zm352 0h320v-288H480v288zm-352-352h288V992H128v320zm352 0h320V992H480v320zM128 928h288V640H128v288zm736 736h320v-288H864v288zM480 928h320V640H480v288zm768 736h288v-288h-288v288zm-384-352h320V992H864v320zM512 448V160q0-13-9.5-22.5T480 128h-64q-13 0-22.5 9.5T384 160v288q0 13 9.5 22.5T416 480h64q13 0 22.5-9.5T512 448zm736 864h288V992h-288v320zM864 928h320V640H864v288zm384 0h288V640h-288v288zm32-480V160q0-13-9.5-22.5T1248 128h-64q-13 0-22.5 9.5T1152 160v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm384-64v1280q0 52-38 90t-90 38H128q-52 0-90-38t-38-90V384q0-52 38-90t90-38h128v-96q0-66 47-113T416 0h64q66 0 113 47t47 113v96h384v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h128q52 0 90 38t38 90z"></path>
                        </svg>
                      </span>
                      <?php the_date('M j'); ?>
                    </a>
                  </div>
                </div>
                <?php endif; ?>
              </div>
            </div>
          </div>
          <div class="h-column h-column-container d-flex h-col-auto style-93-outer style-local-19-m14-outer">
            <div data-colibri-id="19-m14" class="d-flex h-flex-basis h-column__inner h-px-lg-0 h-px-md-0 h-px-0 v-inner-lg-0 v-inner-md-0 v-inner-0 style-93 style-local-19-m14 position-relative">
              <div class="w-100 h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-center align-self-md-center align-self-center">
                <div data-colibri-id="19-m15" class="h-x-container style-94 style-local-19-m15 position-relative h-element">
                  <div class="h-x-container-inner style-dynamic-19-m15-group style-94-spacing style-local-19-m15-spacing">
                    <span class="h-button__outer style-95-outer style-local-19-m16-outer d-inline-flex h-element">
                      <a href="<?php the_permalink(); ?>" data-colibri-id="19-m16" class="d-flex w-100 align-items-center h-button style-95 style-local-19-m16 position-relative">
                        <span>
                          <?php esc_html_e('Read more','colibri-wp'); ?>
                        </span>
                        <span class="h-svg-icon h-button__icon style-95-icon style-local-19-m16-icon">
                          <!--Icon by Ionicons (https://ionicons.com)-->
                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="android-arrow-forward" viewBox="0 0 342 512">
                            <path d="M0 277v-42h260L141 115l30-30 171 171-171 171-31-30 120-120H0z"></path>
                          </svg>
                        </span>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
