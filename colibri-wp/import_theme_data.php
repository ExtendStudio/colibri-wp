<?php
//search for components by styleRef
function colibri_theme_get_components_by_style_ref( $data, &$components ) {
	foreach ( $data as $key => $value ) {

		if ( ( $key == 'styleRef' ) &&
		     ( isset( $data['style'] ) || ( isset( $data['props'] ) || ( isset( $data['localProps'] ) ) ) ) ) {
			$styleRef = $data['styleRef'];

			if ( isset( $data['style'] ) ) {
				$components[ $styleRef ]['style'] = $data['style'];
			}
			if ( isset( $data['props'] ) ) {
				$components[ $styleRef ]['props'] = $data['props'];
			}
			if ( isset( $data['localProps'] ) ) {
				$components[ $styleRef ]['localProps'] = $data['localProps'];
			}
		}
		if ( is_array( $value ) ) {
			colibri_theme_get_components_by_style_ref( $value, $components );
		}
	}
}

function colibri_theme_update_rules_components( &$data, $components ) {

	if ( isset( $data['theme_default']['theme']['rules'] ) && is_array( $data['theme_default']['theme']['rules'] ) ) {
		//$componentsRules = json_decode( $data['theme_default']['theme']['rules'], 1 );

		foreach ( $data['theme_default']['theme']['rules'] as $key => &$rule ) {
			$id = $rule['id'];
			if ( isset( $components[ $id ] ) ) {

				if ( isset( $rule['style'] ) && isset( $components[ $id ]['style'] ) ) {
					$rule['style'] = array_merge( $rule['style'], $components[ $id ]['style'] );
				} else if ( isset( $components[ $id ]['style'] ) ) {
					$rule['style'] = $components[ $id ]['style'];
				}

				if ( isset( $rule['props'] ) && isset( $components[ $id ]['props'] ) ) {
					$rule['props'] = array_merge( $rule['props'], $components[ $id ]['props'] );
				} else if ( isset( $components[ $id ]['props'] ) ) {
					$rule['props'] = $components[ $id ]['props'];
				}

			}
		}
	}
}

function colibri_theme_update_elements( &$data, $components ) {

	foreach ( $data as $key => &$value ) {

		if ( ( $key == 'styleRef' ) &&
		     ( isset( $data['style'] ) || ( isset( $data['props'] ) ) ) ) {

			$id = $data['styleRef'];
			if ( isset( $components[ $id ] ) ) {

				if ( isset( $value['style'] ) && isset( $components[ $id ]['style'] ) ) {
					$data['style'] = array_merge( $value['style'], $components[ $id ]['style'] );
				} else if ( isset( $components[ $id ]['style'] ) ) {
					$data['style'] = $components[ $id ]['style'];
				}

				if ( isset( $rule['props'] ) && isset( $components[ $id ]['localProps'] ) ) {
					$data['props'] = array_merge( $value['props'], $components[ $id ]['localProps'] );

				} else if ( isset( $components[ $id ]['localProps'] ) ) {
					$data['props'] = $components[ $id ]['localProps'];
				}
			}
		}

		if ( is_array( $value ) ) {
			colibri_theme_update_elements( $value, $components );
		}

	}

}

function colibri_theme_update_partials( &$data, $components, $defaults ) {

	if ( isset( $data['theme_default']['partials'] ) ) {
		//partials
		foreach ( $data['theme_default']['partials'] as $group => &$groupElements ) {
			if ( isset( $defaults[ $group ] ) ) {
				$defaultsGroup = $defaults[ $group ];

				//partials[partial]
				foreach ( $groupElements as $partialName => &$partialsElements ) {
					if ( isset( $defaultsGroup[ $partialName ] ) ) {

						//partials[partial][elements]
						foreach ( $partialsElements as &$partialElement ) {
							$elements = json_decode( $partialElement['data']['json'], 1 );

							colibri_theme_update_elements( $elements, $components );

							$partialElement['data']['json'] = json_encode( $elements );
						}
					}
				}
			}
		}
	}
}

function colibri_theme_swap_components( &$data, $parent_id, $id1, $id2 ) {

	if ( isset( $data['styleRef'] ) ) {

		if ( $data['styleRef'] == $parent_id ) {

			$component1_key = null;
			$component2_key = null;

			foreach ( $data['children'] as $key => &$child ) {
				if ( $child['styleRef'] == $id1 ) {
					$component1_key = $key;
				}

				if ( $child['styleRef'] == $id2 ) {
					$component2_key = $key;
				}
			}

			if ( $component1_key !== null && $component2_key !== null ) {
				$tmp                                 = $data['children'][ $component1_key ];
				$data['children'][ $component1_key ] = $data['children'][ $component2_key ];
				$data['children'][ $component2_key ] = $tmp;

				return;
			}
		}
	}

	foreach ( $data as $key => &$value ) {
		if ( is_array( $value ) ) {
			colibri_theme_swap_components( $value, $parent_id, $id1, $id2 );
		}
	}
}

function colibri_theme_delete_component( &$data, $parent_id, $id ) {
	if ( isset( $data['styleRef'] ) ) {

		if ( $data['styleRef'] == $parent_id ) {
			foreach ( $data['children'] as $key => &$child ) {
				if ( $child['styleRef'] == $id ) {
					unset( $data['children'][ $key ] );

					return;
				}
			}
		}
	}

	foreach ( $data as $key => &$value ) {
		if ( is_array( $value ) ) {
			colibri_theme_delete_component( $value, $parent_id, $id );
		}
	}
}

//todo: merge duplicate partial foreach code from delete and swap
function colibri_theme_delete_partials_component( &$data, $partial_name, $parent_id, $id ) {

	if ( isset( $data['theme_default']['partials'] ) ) {
		//partials
		foreach ( $data['theme_default']['partials'] as $group => &$groupElements ) {

			//partials[partial]
			foreach ( $groupElements as $partialName => &$partialsElements ) {

				//partials[partial][elements]
				foreach ( $partialsElements as $name => &$partialElement ) {

					if ( $partialElement['name'] == $partial_name ) {
						$elements = json_decode( $partialElement['data']['json'], 1 );

						colibri_theme_delete_component( $elements, $parent_id, $id );

						$partialElement['data']['json'] = json_encode( $elements );

						break 3;
					}
				}
			}
		}
	}
}

function colibri_theme_swap_partials_components( &$data, $partial_name, $parent_id, $id1, $id2 ) {

	if ( isset( $data['theme_default']['partials'] ) ) {
		//partials
		foreach ( $data['theme_default']['partials'] as $group => &$groupElements ) {

			//partials[partial]
			foreach ( $groupElements as $partialName => &$partialsElements ) {

				//partials[partial][elements]
				foreach ( $partialsElements as $name => &$partialElement ) {

					if ( $partialElement['name'] == $partial_name ) {
						$elements = json_decode( $partialElement['data']['json'], 1 );

						colibri_theme_swap_components( $elements, $parent_id, $id1, $id2 );

						$partialElement['data']['json'] = json_encode( $elements );

						break 3;
					}
				}
			}
		}
	}
}

//rewrite default config to match editor structure
function colibri_theme_default_theme_data_reconfigure( &$theme_data, &$data ) {
	/*
	$reconfigure = include( 'theme_data_rules.php' );
	$rules       = $reconfigure['rules'];
	$css         = $reconfigure['css'];
	*/

	foreach ( $theme_data as $key => &$value ) {
		switch ( $key ) {
			//button group buttons
			case 'header_front_page.button_group.value':
				$buttons = json_decode( urldecode( $value ), 1 );

				if (is_array($buttons))
				foreach ( $buttons as $i => $button ) {
					$button_key                = "header_front_page.button-{$i}.localProps.text";
					$button_value              = $button['label'];
					$theme_data[ $button_key ] = $button_value;

					$button_key                = "header_front_page.button-{$i}.localProps.url";
					$button_value              = $button['url'];
					$theme_data[ $button_key ] = $button_value;
				}

				break;
			case 'header_front_page.hero.props.heroSection.layoutType':
				if ( $value == 'textWithMediaOnLeft' ) {
					colibri_theme_swap_partials_components( $data, 'header_front_page', '254', '255', '437' );
				} elseif ( $value == 'textOnly' ) {
					colibri_theme_delete_partials_component( $data, 'header_front_page', '254', '437' );
				}
				break;
			case 'header_front_page.hero.image.style.descendants.frameImage.type':
				$backgroundColor = $borderColor = $theme_data['header_front_page.hero.image.style.descendants.frameImage.backgroundColor'];
				$thickness = $theme_data['header_front_page.hero.image.style.descendants.frameImage.thickness'];
				$style = '';

				if ( $value == 'border' ) {
					$style = 'solid';
					$borderColor = $backgroundColor;
					$backgroundColor = 'transparent';
				} elseif ( $value == 'background' ) {
					$style = 'none';
					$borderColor = 'transparent';
				}

				$prefix = 'header_front_page.hero.image.style.descendants.frameImage.border.';
				foreach (array('top','bottom','left','right') as $position) {
					$theme_data["{$prefix}{$position}.style"] = $style;
					$theme_data["{$prefix}{$position}.color"] = $borderColor;
					$theme_data["{$prefix}{$position}.width"] = $thickness;
				}

				$theme_data['header_front_page.hero.image.style.descendants.frameImage.backgroundColor'] = $backgroundColor;
				break;
			case 'header_front_page.hero.image.style.descendants.frameImage.width':
			case 'header_front_page.hero.image.style.descendants.frameImage.height':
					$value .= '%';//add percentage to width and height values;
				break;
			case 'header_front_page.logo.props.layoutType':
				if ( $value == 'logo-spacing-menu' ) {

					//hack
					$json =
						json_decode( $data['theme_default']['partials']['header']['front_page'][0]['data']['json'], 1 );

					$json['children'][0]['children'][0]['children'][0]['style']['descendants']['outer']['columnWidth']['type'] = 'custom';
					$json['children'][0]['children'][0]['children'][1]['style']['descendants']['outer']['columnWidth']['type'] = 'custom';
					$json['children'][0]['children'][0]['children'][2]['style']['descendants']['outer']['columnWidth']['type'] = 'custom';
					//$json['children'][0]['children'][0]['children'][2]['children'][0]['style']['buttonAlign'] = 'center';
					$data['theme_default']['partials']['header']['front_page'][0]['data']['json'] = json_encode( $json );
				}
				break;
		}
	}
}

function colibri_theme_import_theme_data( &$data ) {

	$data['theme_default']['theme']['rules'] = json_decode( $data['theme_default']['theme']['rules'], 1 );

	//get theme defaults
	$defaults = ColibriWP\Theme\Defaults:: getDefaults();
	//update theme defaults with user changes (theme mod options)
	$theme_data = get_theme_mods();
	colibri_theme_default_theme_data_reconfigure( $theme_data, $data );

	foreach ( $theme_data as $key => &$value ) {
		if ( strpos( $key, '.' ) === false ) {
			continue;
		}

		if ( isset( $value[0] ) && $value[0] === '%' ) {
			$value = urldecode( $value );
			//check if json
			if ( $value[0] === '{' ) {
				$value = json_decode( $value, 1 );
				foreach ( $value as $subkey => $subvalue ) {

					ExtendBuilder\array_set_value( $defaults, "$key.$subkey", $subvalue );
				}
				continue;
			}
		}

		if ($value === '1') $value = true;

		ExtendBuilder\array_set_value( $defaults, $key, $value );
	}

	//keys don't match, need to change keys
	$defaults['header']['front_page'] = $defaults['header_front_page'];
	$defaults['header']['post']       = $defaults['header_post'];
	unset( $defaults['header_front_page'] );
	unset( $defaults['header_post'] );


	$components = array();
	colibri_theme_get_components_by_style_ref( $defaults, $components );
	colibri_theme_update_rules_components( $data, $components );
	colibri_theme_update_partials( $data, $components, $defaults );


	$data['theme_default']['theme']['rules'] = json_encode( $data['theme_default']['theme']['rules'] );

	return $data;
}
