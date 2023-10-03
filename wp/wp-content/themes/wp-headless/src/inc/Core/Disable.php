<?php

/**
 * Functions related to the admin area, etc. for disabling features
 *
 * @package mild
 */

 namespace WP_Headless\Core;

class Disable
{
    public function register()
    {
        // Disable comments
        add_filter('comments_open', '__return_false', 20, 2);
        add_filter('pings_open', '__return_false', 20, 2);
        add_filter('comments_array', '__return_empty_array', 10, 2);

        // Remove comments from admin bar
        add_action('init', [$this, 'admin_bar_showing']);

        // Remove admin metas
        add_action('admin_menu', [$this, 'admin_menu']);
    }

    function admin_bar_showing()
    {
        if (is_admin_bar_showing()) {
            remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
        }
    }

    function admin_menu()
    {
        remove_menu_page('users.php');
        //remove_menu_page('tools.php');
        remove_menu_page('edit-comments.php');

        $customizer_url = add_query_arg('return', urlencode(remove_query_arg(wp_removable_query_args(), wp_unslash($_SERVER['REQUEST_URI']))), 'customize.php');
        remove_submenu_page('themes.php', $customizer_url);
    }
}