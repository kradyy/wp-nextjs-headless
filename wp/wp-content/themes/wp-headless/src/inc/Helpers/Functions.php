<?php
/**
 * Build Gutenberg Blocks using React
 *
 * @package mild
 */

namespace WP_Headless\Helpers;

/**
 * Functions class for handling custom theme settings
 */
class Functions {
    /**
     * Fetch specific or all theme settings from the theme.json file.
     *
     * @param array $field Optional. The specific field to retrieve from theme settings.
     * @return array|mixed Theme settings or specific field value.
     */
    public static function get_theme_json($field = []) {
        $theme_json_path = get_template_directory() . '/theme.json';
        $theme_json = json_decode(file_get_contents($theme_json_path), true);

        if (!isset($theme_json['version'])) {
            return []; 
        }

        if (!empty($field)) {
            return $theme_json[$field] ?? null;  // Use null coalescing to return null if the field doesn't exist
        }

        return $theme_json;  // Use null coalescing to return an empty array if 'blocks' doesn't exist
    }
}