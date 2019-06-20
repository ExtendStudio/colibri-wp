<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
	<?php wp_head(); ?>
	<?php colibri_theme()->get( 'css' )->render(); ?>
</head>

<body id="colibri" <?php body_class(); ?>>

<div class="site" id="page-top">
	<?php colibri_theme()->get( 'header' )->render(); ?>

