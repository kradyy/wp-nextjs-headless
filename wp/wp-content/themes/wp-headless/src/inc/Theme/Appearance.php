<?php

/**
 * All Admin-related functions
 *
 * @package mild
 */

namespace WP_Headless\Theme;

class Appearance
{
    /**
     * Register class hooks
     *
     * @return WordPress add_action()
     */
    public function register()
    {
        add_action('init', array($this, 'add_theme_supports'));
        add_action('after_setup_theme', array($this, 'register_menus'));
    }

    /**
     * Add theme supports
     *
     * @return void
     */
    function add_theme_supports()
    {
        add_theme_support(
            'gutenberg',
            array(
                'responsive-embeds' => true,
                'wide-images'       => true,
            )
        );

        add_theme_support('disable-custom-gradients');
        remove_theme_support('core-block-patterns');
        add_theme_support('responsive-embeds');
        add_theme_support('align-wide');
        add_theme_support('wp-block-styles');

        add_theme_support('editor-styles');
    }

    /**
     * Regsiter menus
     *
     * @return void
     */
    function register_menus()
    {
        register_nav_menus(
            array(
                    'primary-menu' => __('Primary Menu', 'wp-headless'),
                    'footer-menu' => __('Footer Menu', 'wp-headless')
                )
        );
    }
}