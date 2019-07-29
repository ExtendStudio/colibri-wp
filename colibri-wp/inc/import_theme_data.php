<?php
function colibri_theme_hex2rgb( $color ) {
	$color = trim( $color, '#' );

	if ( strlen( $color ) === 3 ) {
		$r = hexdec( substr( $color, 0, 1 ) . substr( $color, 0, 1 ) );
		$g = hexdec( substr( $color, 1, 1 ) . substr( $color, 1, 1 ) );
		$b = hexdec( substr( $color, 2, 1 ) . substr( $color, 2, 1 ) );
	} else if ( strlen( $color ) === 6 ) {
		$r = hexdec( substr( $color, 0, 2 ) );
		$g = hexdec( substr( $color, 2, 2 ) );
		$b = hexdec( substr( $color, 4, 2 ) );
	} else {
		return array();
	}

	return array( 'red' => $r, 'green' => $g, 'blue' => $b );
}

function colibri_theme_replace_gradient_hex_to_rgba_opacity( $gradient, $opacity = '70' ) {

	$gradient = preg_replace_callback( '/"color":"#([^"]+)"/', function ( $matches ) use ( $opacity ) {
		$hexColor = $matches[1];
		$rgba     = colibri_theme_hex2rgb( $hexColor );
		$opacity  = ( $opacity == '100' ) ? $opacity : '0.' . $opacity;
		$rgba     = "rgba({$rgba['red']}, {$rgba['green']}, {$rgba['blue']}, $opacity)";

		return '"color":"' . $rgba . '"';
	}, $gradient );

	return $gradient;

}

function colibri_theme_get_shape_data( $shape ) {
	$shape = get_template_directory() . "/resources/images/header-shapes/$shape.png";
	$shape_data = 'data:image/png;base64,'. base64_encode(file_get_contents($shape));
	return $shape_data;
}

function colibri_theme_replace_palette_colors( $text, $palette, $color_variants ) {

	$text = preg_replace_callback( '/\${theme\.colors\.(\d+)(\|variant(\d+))?}/',
		function ( $matches ) use ( $palette, $color_variants ) {
		$index   = (int) $matches[1];
		$variant = ( isset( $matches[3] ) ) ? (int) $matches[3] : false;
		if ($variant)
		{
			return $color_variants[ $index ][ $variant ];
		}
		return $palette[ $index ];
	}, $text );

	return $text;
}

//search for components by styleRef
function colibri_theme_get_components_by_node_id( $data, &$components, $idStyleRefMap ) {
	foreach ( $data as $key => $value ) {

		if ( ( $key == 'id' ) &&
		     ( isset( $data['style'] ) || ( isset( $data['props'] ) || ( isset( $data['localProps'] ) ) ) ) ) {
			$styleRef = isset($idStyleRefMap[ $data['id'] ]) ? $idStyleRefMap[ $data['id'] ] : $data['id'];

			if ( isset( $data['style'] ) ) {
				$components[ $styleRef ]['style'] = $data['style'];
			}
			if ( isset( $data['props'] ) ) {
				$components[ $styleRef ]['props'] = $data['props'];
			}
			if ( isset( $data['localProps'] ) ) {
				$components[ $styleRef ]['localProps'] = $data['localProps'];
			}

			$components[ $styleRef ]['styleRef'] = $styleRef;
			$components[ $styleRef ]['id'] = $data['id'];
		}
		if ( is_array( $value ) ) {
			colibri_theme_get_components_by_node_id( $value, $components, $idStyleRefMap );
		}
	}
}

//search for components by partialId and id
function colibri_theme_get_components_by_partial_id( $data, &$components, &$export_import_partials_id_map ) {
	foreach ( $data as $key => $value ) {

		if ( ( $key == 'id' ) &&
		     ( isset( $data['style'] ) || ( isset( $data['props'] ) || ( isset( $data['localProps'] ) ) ) ) ) {
			$id = $data['id'];

			$partialId = $export_import_partials_id_map[$data['partialId']];

			if ( isset( $data['style'] ) ) {
				$components[ $partialId ] [ $id ] ['style'] = $data['style'];
			}
			if ( isset( $data['props'] ) ) {
				$components[ $partialId ] [ $id ] ['props'] = $data['props'];
			}
			if ( isset( $data['localProps'] ) ) {
				$components[ $partialId ] [ $id ] ['localProps'] = $data['localProps'];
			}

			$components[ $partialId ] [ $id ] ['id'] = $id;
		}
		if ( is_array( $value ) ) {
			colibri_theme_get_components_by_partial_id( $value, $components, $export_import_partials_id_map );
		}
	}
}

function colibri_theme_array_merge_overwrite($array1, $array2)
{
	foreach($array2 as $key => $value)
	{
		if(array_key_exists($key, $array1) && is_array($value))
			$array1[$key] = colibri_theme_array_merge_overwrite($array1[$key], $array2[$key]);
		else
			$array1[$key] = $value;
	}

	return $array1;
}

function colibri_theme_update_rule(&$rule, &$component)
{
	if ( isset( $rule['style'] ) && isset( $component['style'] ) ) {
		$rule['style'] = colibri_theme_array_merge_overwrite( $rule['style'], $component['style'] );
	} else if ( isset( $component['style'] ) ) {
		$rule['style'] = $component['style'];
	}

	if ( isset( $rule['props'] ) && isset( $component['props'] ) ) {
		$rule['props'] = colibri_theme_array_merge_overwrite( $rule['props'], $component['props'] );
	} else if ( isset( $component['props'] ) ) {
		$rule['props'] = $component['props'];
	}
}

function colibri_theme_update_rules_components( &$rules, $components ) {


	if ( isset( $rules ) && is_array( $rules ) ) {
		//$componentsRules = json_decode( $rules, 1 );

		foreach ( $rules as $key => &$rule ) {
			$id = isset($rule['id']) ? $rule['id'] : false;
			//id = isset($rule['id']) ? $rule['id'] : false;
			
			//if (!($id || $id)) continue;
			if ( isset( $components[ $id ] )  ) {
				colibri_theme_update_rule($rule, $components[ $id ]);
			}/*
			if ( isset( $components[ $id ] )  ) {
				colibri_theme_update_rule($rule, $components[ $id ]);
			}*/
		}
	}
}

function colibri_theme_update_rules_types( &$rules, $types ) {

	if ( isset( $rules ) && is_array( $rules ) ) {
		//$componentsRules = json_decode( $rules, 1 );

		foreach ( $rules as $key => &$rule ) {
			$type = isset($rule['type']) ? $rule['type'] : false;
			if (!$type) continue;

			if ( isset( $types[ $type ] ) ) {

				if ( isset( $rule['style'] ) && isset( $types[ $type ]['style'] ) ) {
					$rule['style'] = colibri_theme_array_merge_overwrite( $rule['style'], $types[ $type ]['style'] );
				} else if ( isset( $types[ $type ]['style'] ) ) {
					$rule['style'] = $types[ $type ]['style'];
				}

				if ( isset( $rule['props'] ) && isset( $types[ $type ]['props'] ) ) {
					$rule['props'] = colibri_theme_array_merge_overwrite( $rule['props'], $types[ $type ]['props'] );
				} else if ( isset( $types[ $type ]['props'] ) ) {
					$rule['props'] = $types[ $type ]['props'];
				}
			}
		}
	}
}

function colibri_theme_update_elements( &$data, $components, &$idStyleRefMap ) {

	foreach ( $data as $key => &$value ) {

		if ( ( $key == 'styleRef' ) &&
		     ( isset( $data['styleRef'] ) ) ) {

			$id = $data['styleRef'];
			if (isset($data['styleRef'])) {
				$idStyleRefMap[ $id ] = $data['styleRef'];
			}

			if ( isset( $components[ $id ] ) ) {

				if ( isset( $data['style'] ) && isset( $components[ $id ]['style'] ) ) {
					$data['style'] = colibri_theme_array_merge_overwrite( $data['style'], $components[ $id ]['style'] );
				} else if ( isset( $components[ $id ]['style'] ) ) {
					$data['style'] = $components[ $id ]['style'];
				}

				if ( isset( $data['props'] ) && isset( $components[ $id ]['localProps'] ) ) {
					$data['props'] = colibri_theme_array_merge_overwrite( $data['props'], $components[ $id ]['localProps'] );

				} else if ( isset( $components[ $id ]['localProps'] ) ) {
					$data['props'] = $components[ $id ]['localProps'];
				}
			}
		}

		if ( is_array( $value ) ) {
			colibri_theme_update_elements( $value, $components, $idStyleRefMap );
		}

	}

}

//if id1 and id2 are not provided the first two children are swapped (this case is used for hero columns textWithMediaOn*)
function colibri_theme_swap_components( &$data, $parent_id, $id1 = false, $id2 = false ) {
	if ( isset( $data['styleRef'] ) ) {

		if ( $data['styleRef'] == $parent_id ) {
			$component1_key = null;
			$component2_key = null;

			if (isset($data['children']))
			foreach ( $data['children'] as $key => &$child ) {
				if ( $id1 ) {
					if ( $child['styleRef'] == $id1 ) {
						$component1_key = $key;
					}
				} else {
					$component1_key = 0;
				}

				if ( $id2 ) {
					if ( $child['styleRef'] == $id2 ) {
						$component2_key = $key;
					}
				} else {
					$component2_key = 1;
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

function colibri_theme_delete_component( &$data, $parent_id, $id = false, $index = false ) {
	if ( isset( $data['styleRef'] ) ) {
		if ( $data['styleRef'] == $parent_id ) {
			foreach ( $data['children'] as $key => &$child ) {
				if ( $id && $child['styleRef'] == $id ) {
					unset( $data['children'][ $key ] );

					return;
				}
				if ( $index && $index == $key ) {
					unset( $data['children'][ $key ] );

					return;
				}
			}
		}
	}

	foreach ( $data as $key => &$value ) {
		if ( is_array( $value ) ) {
			colibri_theme_delete_component( $value, $parent_id, $id, $index );
		}
	}
}


//rewrite defaults to match editor structure
function colibri_theme_defaults_reconfigure( &$defaults, &$data ) {

	//convert gradient colors to rgba and add opacity
	$opacity_key = 'header_front_page.hero.style.background.overlay.color.opacity';
	$opacity     = ExtendBuilder\array_get_value( $defaults, $opacity_key, '70' );
	$opacity     = ( ! $opacity ) ? '70' : $opacity;
	$opacity     = ( $opacity == '100' ) ? $opacity : '0.' . $opacity;

	foreach (
		array(
			'header_front_page.hero.style.background.overlay.gradient',
			'header_front_page.hero.style.background.color',
			'header_post.hero.style.background.color',
			'inner_page_hero_style.background.image.0.source.gradient'
		) as $gradient_key
	) {
		$gradient = ExtendBuilder\array_get_value( $defaults, $gradient_key, '' );

		if ( ! $gradient ) {
			continue;
		}
		if ( is_array( $gradient ) && isset( $gradient['steps'] ) ) {
			foreach ( $gradient['steps'] as $key => &$color ) {
				$rgba           = colibri_theme_hex2rgb( $color['color'] );
				$color['color'] = "rgba({$rgba['red']},{$rgba['green']},{$rgba['blue']}, $opacity)";
			}
		} else {
			$rgba     = colibri_theme_hex2rgb( $gradient );
			$gradient = "rgba({$rgba['red']},{$rgba['green']},{$rgba['blue']}, $opacity)";
		}

		ExtendBuilder\array_set_value( $defaults, $gradient_key, $gradient );
	}
}

//rewrite theme mods to match editor structure
function colibri_theme_theme_data_reconfigure( &$theme_data, &$data, &$partials, $defaults ) {

	if ( is_array( $theme_data ) ) {
		foreach ( $theme_data as $key => &$value ) {
			switch ( $key ) {
				//button group buttons
				case 'header_front_page.button_group.value':
					$buttons = json_decode( urldecode( $value ), 1 );

					if ( is_array( $buttons ) ) {
						foreach ( $buttons as $i => $button ) {
							$button_key                = "header_front_page.button-{$i}.localProps.text";
							$button_value              = $button['label'];
							$theme_data[ $button_key ] = $button_value;

							$button_key                = "header_front_page.button-{$i}.localProps.url";
							$button_value              = $button['url'];
							$theme_data[ $button_key ] = $button_value;
						}
					}

					break;
				case 'header_front_page.hero.props.heroSection.layout':
					$theme_data['header_front_page.hero.localProps.heroSection.layout'] = $value;
					$row_id   = $defaults['header_front_page']['hero']['row']['styleRef'];
					$column_1 = $defaults['header_front_page']['hero']['column-1']['styleRef'];
					$column_2 = $defaults['header_front_page']['hero']['column-2']['styleRef'];

					if ( $value == 'textWithMediaOnLeft' ) {
						colibri_theme_swap_components( $partials['header']['front_page']['json'], $row_id, $column_1, $column_2 );
					} elseif ( $value == 'textOnly' ) {
						colibri_theme_delete_component( $partials['header']['front_page']['json'], $row_id, $column_2 );
					}
					break;
				case 'header_front_page.hero.image.props.enabledFrameOption':
				case 'header_front_page.hero.image.props.frame.type':
					$framePrefix     = 'header_front_page.hero.image.style.descendants.frameImage.';
					$thickness       = isset($theme_data["{$framePrefix}thickness"]) ? $theme_data["{$framePrefix}thickness"] : '10';
					static $initialBackgroundColor = NULL;
					if (!$initialBackgroundColor)
					{
						$initialBackgroundColor = $theme_data["{$framePrefix}backgroundColor"];
					}

					$style           = '';
					if ( $value == 'border' || $value == '1' ) {
						$style           = 'solid';
						$borderColor     = $initialBackgroundColor;
						$backgroundColor = 'transparent';
					} elseif ( $value == 'background' ) {
						$style       = 'none';
						$borderColor = 'transparent';
						$backgroundColor = $initialBackgroundColor;
					}

					$prefix = 'header_front_page.hero.image.style.descendants.frameImage.border.';
					foreach ( array( 'top', 'bottom', 'left', 'right' ) as $position ) {
						$theme_data["{$prefix}{$position}.style"] = $style;
						$theme_data["{$prefix}{$position}.color"] = $borderColor;
						$theme_data["{$prefix}{$position}.width"] = "{$thickness}px";
					}

					$theme_data["{$framePrefix}backgroundColor"] = $backgroundColor;
					break;
				case 'header_front_page.hero.image.style.descendants.frameImage.width':
				case 'header_front_page.hero.image.style.descendants.frameImage.height':
					$value .= '%';//add percentage to width and height values;
					break;
				case 'header_front_page.navigation.props.layoutType':
					if ( $value == 'logo-above-menu' ) {
						//hack
						$menu_columns = &$partials['header']['front_page']['json']['children'][0]['children'][0]['children'];
						$menu_columns[0]['style']['descendants']['outer']['columnWidth']['type'] = 'custom';
						$menu_columns[1]['style']['descendants']['outer']['columnWidth']['type'] = 'custom';
						$menu_columns[2]['style']['descendants']['outer']['columnWidth']['type'] = 'custom';
						$menu_columns[2]['style']['descendants']['outer']['columnWidth']['custom']['value'] = '100';
						//menu align
						$menu = &$menu_columns[2]['children'][0];
						//style.descendants.innerMenu.justifyContent center
						$menu['style']['descendants']['innerMenu']['justifyContent'] = 'center';
						$menu['style']['buttonAlign'] = 'center';
						//sticky
						$menu_columns[0]['style']['ancestor']['sticky']['descendants']['outer']['columnWidth']['type'] = 'custom';
						$menu_columns[2]['style']['ancestor']['sticky']['descendants']['outer']['columnWidth']['type'] = 'custom';
					}
					break;
				//forced to use x_value instead of x.value because of value_pattern syntax, change back to x.value
				case 'header_front_page.hero.image.style.descendants.frameImage.transform.translate':
					$prefix = 'header_front_page.hero.image.style.descendants.frameImage.transform.translate.';
					$transform = json_decode( urldecode( $value ), 1 );

					$theme_data["{$prefix}x.value"] = $transform['x_value'];
					$theme_data["{$prefix}y.value"] = $transform['y_value'];
					unset( $theme_data["{$prefix}x_value"] );
					unset( $theme_data["{$prefix}y_value"] );

					break;
				case 'header_front_page.navigation.style.padding':
					$prefix                               = 'header_front_page.navigation.style.padding';
					$theme_data["{$prefix}.top.value"]    = $value;
					$theme_data["{$prefix}.bottom.value"] = $value;
					$theme_data["{$prefix}.bottom.value"] = $value;
					$theme_data["{$prefix}.unit"]         = 'px';
					break;
				case 'header_front_page.hero.hero_column_width':
					foreach ( array( 1, 2 ) as $column ) {
						if ( $column == 1 ) {
							$width = $value;
						} else {
							$width = ( 100 - $value );
						}

						$prefix                             = "header_front_page.hero.column-{$column}.style.descendants.outer.columnWidth";
						$theme_data["$prefix.type"]         = 'custom';
						$theme_data["$prefix.custom.value"] = $width;
						$theme_data["$prefix.custom.unit"]  = '%';
					}
					break;
				case 'header_front_page.icon_list.localProps.iconList':
					$value = json_decode(urldecode($value), 1);
					foreach ($value as &$icon)
					{
						$icon['icon'] = $icon['icon']['name'];
						$icon['link']['value'] = $icon['link_value'];
						unset($icon['link_value']);
					}

					break;
				case 'header_front_page.social_icons.localProps.icons':
					$value = json_decode(urldecode($value), 1);
					foreach ($value as &$icon)
					{
						$icon['name'] = $icon['icon']['name'];
						$icon['link']['value'] = $icon['link_value'];
						unset($icon['icon']);
						unset($icon['link_value']);
					}

					break;
					//author meta check
				case 'blog_post_meta_enabled':
					$value = (bool)$value;
					//author meta check
					$theme_data['main_archive.post_meta.localProps.metadata.0.check'] = $value;
					//date meta
					$theme_data['main_archive.post_meta.localProps.metadata.1.check'] = $value;
					break;
				case 'blog_show_post_thumb_placeholder':
					$value = (bool)$value;
					$theme_data['main_archive.post_thumbnail.props.showPlaceholder'] = $value;
					$theme_data['main_post.post_thumbnail.props.showPlaceholder'] = $value;
					break;
				case 'blog_post_thumb_placeholder_color':
					$theme_data['main_archive.post_thumbnail.style.background.color'] = $value;
					$theme_data['main_post.post_thumbnail.style.background.color'] = $value;
					break;
				case 'header_front_page.hero.style.background.overlay.color.opacity_':
					//rewrite opacity_ to opacity (there was a problem with customizer controls that prevented usage of opacity)
					$theme_data['header_front_page.hero.style.background.overlay.color.opacity'] = $value;
					break;
				case 'header_front_page.hero.style.background.overlay.shape.value':
					//rewrite opacity_ to opacity (there was a problem with customizer controls that prevented usage of opacity)
					$theme_data['header_front_page.hero.style.background.overlay.shape.img'] = colibri_theme_get_shape_data($value);
					break;
			}
		}
	}
}

function colibri_theme_keep_component_ids( &$data ) {
	foreach ( $data as $key => &$value ) {
		if ( is_array( $value ) ) {
			unset( $value['props'] );
			unset( $value['style'] );
			colibri_theme_keep_component_ids( $value );
		} else {
			if ( ( $key !== 'id' && $key !== 'id' && $key !== 'partialId' && $key !== 'styleRef' ) || empty( $data[ $key ] ) ) {
				unset( $data[ $key ] );
			}
		}
	}
}

function colibri_theme_update_partial_html( $group_name, $partial_name, &$partial, $theme_data ) {

	$blog_posts_per_row = isset($theme_data['blog_posts_per_row']) ? $theme_data['blog_posts_per_row'] : false;
	if (!$blog_posts_per_row) return;

	$postsPerRowClass = 'h-col-sm-12 h-col-md-' . (12 / intval($blog_posts_per_row));

	$partialsHtmlReplace = array(
		'main' => array(
			'archive' => array(
				//blog post classes are url encoded in shortcode content
				array(
					'search'  => rawurlencode( 'h-col-lg-6 h-col-md-6 h-col-12' ),
					'replace' => rawurlencode( $postsPerRowClass ),
				)
			),
			'search'  => array(
				//blog post classes are url encoded in shortcode content
				array(
					'search'  => rawurlencode( 'h-col-lg-12 h-col-md-12 h-col-12' ),
					'replace' => rawurlencode( $postsPerRowClass ),
				)
			)
		)
	);

	if ( isset( $partialsHtmlReplace[ $group_name ][ $partial_name ] ) ) {
		$rules = $partialsHtmlReplace[ $group_name ][ $partial_name ];
		$html  = &$partial['html'];

		foreach ( $rules as $rule ) {

			if ( isset( $rule['search'] ) ) {
				$html = str_replace( $rule['search'], $rule['replace'], $html );
			} else if ( isset( $rule['regex'] ) ) {
				$html = preg_replace( $rule['regex'], $rule['replace'], $html );
			}
		}
	} else {
		//unset html if no change is made so it will not get updated
		unset( $partial['html'] );
	}
}

function colibri_theme_get_id_from_node_list($rules, $id, $type = false)
{
	foreach ($rules as $rule)
	{
		if (isset($rule['nodes'])
		    && in_array($id, $rule['nodes'])
		    && ($type == false || $rule['type'] == $type))
		{
			return $rule['id'];
		}
	}

	return false;
}

function colibri_get_export_partials_id($defaults)
{
	$default_partials = array();
	foreach ($defaults as $partial_key => $partial_data)
	{
		if (is_array($partial_data)) {
			$first_component = $partial_data[ key( $partial_data ) ];
			if (isset($first_component['partialId']))
			{
				$id = $first_component['partialId'];
			}
		}
		$parts = explode('_', $partial_key);
		$partial_group = $parts[0];
		unset($parts[0]);
		$partial_name = implode('_', $parts);

		$default_partials[$partial_group][$partial_name] = $id;
	}

	return $default_partials;
}

function colibri_add_component_rules($theme_data, $defaults)
{
	$componentTypes = array();

	//special case for menu hover effect that doesn't have id or styleRef so we need to use type
	$componentTypes['hop-horizontal-menu'] = $defaults['header']['front_page']['header-menu'];
	$componentTypes['hop-horizontal-menu']['props']['hoverEffect']['activeGroup'] = 'border';

	//blog post thumb placeholder color
	if (isset($theme_data['blog_post_thumb_placeholder_color'])) {
		$componentTypes['hop-post-thumbnail']['style']['background']['color'] = $theme_data['blog_post_thumb_placeholder_color'];
	}
	//blog sidebar
	if (isset($theme_data['blog_sidebar_enabled'])) {
		$componentTypes['hop-sidebar']['props']['showSidebar'] = $theme_data['blog_sidebar_enabled'];
	}
	//Blog posts per row
	if (isset($theme_data['blog_posts_per_row'])) {
		//get blog post row style ref/id
		$blog_post_row_nodeid = $defaults['main_archive']['blog_posts_row']['id'];
		//search rules nodes list for id to get style ref/id
		//$id = colibri_theme_get_id_from_node_list($rules, $blog_post_row_nodeid, 'hop-row');
		//$componentsRules[$id]['props']['layout']['itemsPerRow'] = $theme_data['blog_posts_per_row'];
		$componentTypes['hop-archive-loop']['props']['layout']['itemsPerRow'] = $theme_data['blog_posts_per_row'];
	}
	//bottom separator
	if (isset($defaults['header']['front_page']['hero']['style']['separatorBottom'])) {
		$componentTypes['hop-hero']['style']['separatorBottom'] = $defaults['header']['front_page']['hero']['style']['separatorBottom'];
	}
	//navigation
	if (isset($defaults['header']['front_page']['navigation']['props'])) {
		$componentTypes['hop-navigation']['props'] = $defaults['header']['front_page']['navigation']['props'];
	}
	if (isset($defaults['header']['front_page']['navigation']['style'])) {
		$componentTypes['hop-navigation']['style'] = $defaults['header']['front_page']['navigation']['style'];
	}

	return $componentTypes;
}
/**
 * @param $data
 *
 * @return mixed
 */
function colibri_theme_import_theme_data() {

	$data = ExtendBuilder\get_theme_data();
	if ( isset( $data['colors'] ) ) {
		$colors = $data['colors'];
		$color_variants = array(
			array('#A6DCF4', '#54C2F4', '#03A9F4', '#026E9F', '01334A'),//color0 variants
			array('#F7D7AC', '#F7B359', '#F79007', '#A25E05', '4D2D02'),
			array('#7FBFAC', '#40BF9A', '#00BF87', '#006A4B', '00150F'),
			array('#E5DCFF', '#A587FF', '#6632FF', '#4421AA', '221155'),
			array('#FFFFFF', '#CCCCCC', '#999999', '#666666', '333333'),
			array( '#74BBD4', '#46707F', '#25292A', '#17252A', '09212A'),//color5 variants
		);

		colibri_theme_replace_palette_colors( $data['rules'], $colors, $color_variants);
	}

	$rules = json_decode( $data['rules'], 1 );

	$theme_data = get_theme_mods();
	//Only if theme options are changed merge changes.
	if ( empty( $theme_data ) ) {
		return $data;
	}

	//get theme defaults and keep only id and id
	$defaults = ColibriWP\Theme\Defaults:: getDefaults();
	$default_partials = colibri_get_export_partials_id($defaults);

	unset( $defaults['icons'] );
	unset( $defaults['gradients'] );
	unset( $defaults['default_icon'] );

	$theme_data['main_post.post_meta.localProps.metadata.0.check'] = true;
	$theme_data['main_search.post_meta.localProps.metadata.0.check'] = true;
	colibri_theme_keep_component_ids( $defaults );


	$partials = array(
		'header' => array( 'front_page' => array(), 'post' => array() ),
		'main'   => array( 'archive' => array(), 'search' => array(), 'post' => array() )
	);

	$export_import_partials_id_map = array();
	foreach ( $partials as $group_name => $group_partials ) {
		$partials[ $group_name ] = array();
		foreach ( $group_partials as $partial_name => $partial ) {
			$partial_data =
				ExtendBuilder\get_partials_of_type( $group_name, $partial_name );

			if (isset($default_partials[ $group_name ][ $partial_name ]))
			{
				$export_import_partials_id_map[
					$default_partials[ $group_name ][ $partial_name ]
				] = $partial_data[0]['id'];

			}

			$partials[ $group_name ][ $partial_name ]['id']        = $partial_data[0]['id'];
			$partials[ $group_name ][ $partial_name ]['update_id'] = $data['defaults']['partials'][ $group_name ][ $partial_name ];
			$partials[ $group_name ][ $partial_name ]['json']      = json_decode( $partial_data[0]['data']['json'], 1 );
			$partials[ $group_name ][ $partial_name ]['html']      = $partial_data[0]['data']['html'];
		}
	}

	//update theme defaults with user changes (theme mod options)
	colibri_theme_theme_data_reconfigure( $theme_data, $data, $partials, $defaults );

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

		if ( $value === '1' ) {
			$value = true;
		}

		ExtendBuilder\array_set_value( $defaults, $key, $value );
	}

	$defaults['header']['front_page'] = isset( $defaults['header_front_page'] ) ? $defaults['header_front_page'] : array();
	$defaults['header']['post']       = isset( $defaults['header_post'] ) ? $defaults['header_post'] : array();
	unset( $defaults['header_front_page'] );
	unset( $defaults['header_post'] );

	//get partials
	$componentTypes = colibri_add_component_rules($theme_data, $defaults);
	$componentsRules = array();
	$componentsPartials = array();
	$idStyleRefMap = array();
	colibri_theme_get_components_by_partial_id( $defaults, $componentsPartials, $export_import_partials_id_map );

	//update partials
	foreach ( $partials as $group_name => &$group_partials ) {
		foreach ( $group_partials as $partial_name => &$partial ) {
			$partial_id = $partial['id'];//$export_import_partials_id_map[ $partial['id']  ];
			if ( isset( $componentsPartials[ $partial_id ] ) ) {
				colibri_theme_update_elements( $partial['json'], $componentsPartials[ $partial['id'] ], $idStyleRefMap );
			} else {
				unset( $partial['json'] );
			}

			colibri_theme_update_partial_html( $group_name, $partial_name, $partial, $theme_data );

			if ( isset( $partial['json'] ) || isset( $partial['html'] ) ) {
				ExtendBuilder\update_partial( $partial['update_id'], $partial );
			}
		}
	}

	colibri_theme_get_components_by_node_id( $defaults, $componentsRules, $idStyleRefMap );
	colibri_theme_update_rules_components( $rules, $componentsRules );
	colibri_theme_update_rules_types( $rules, $componentTypes );

	$data['rules'] = json_encode( $rules );
	ExtendBuilder\save_theme_data( $data );

	return $data;
}


