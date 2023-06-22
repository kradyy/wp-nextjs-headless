<?php
/**
 * WP Headless theme
 */

 define( 'DISALLOW_FILE_EDIT', true ); 
 define( 'DISALLOW_FILE_MODS', true );

// Theme supports
add_theme_support('disable-custom-colors');
add_theme_support('editor-gradient-presets', []);
add_theme_support('disable-custom-gradients', true);

// Register menus
function register_menus() {
    register_nav_menus(
        array(
            'primary-menu' => __('Primary Menu', 'wp-headless'),
            'footer-menu' => __('Footer Menu', 'wp-headless')
        )
    );
}
add_action('after_setup_theme', 'register_menus');

// Disable comments
add_filter('comments_open', '__return_false', 20, 2);
add_filter('pings_open', '__return_false', 20, 2);
add_filter('comments_array', '__return_empty_array', 10, 2);

add_action('init', function () {
    if (is_admin_bar_showing()) {
        remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
    }
});

// Remove admin metas
add_action('admin_menu', function () {
    //remove_menu_page('options-general.php');
    remove_menu_page('users.php');
    remove_menu_page('tools.php');
    remove_menu_page('edit-comments.php');

    $customizer_url = add_query_arg( 'return', urlencode( remove_query_arg( wp_removable_query_args(), wp_unslash( $_SERVER['REQUEST_URI'] ) ) ), 'customize.php' );
            remove_submenu_page( 'themes.php', $customizer_url );
});