<?php

/**
 * Build Gutenberg Blocks using React
 *
 * @package mild
 */

namespace WP_Headless\Theme;

use WP_Headless\Helpers\Functions;

/**
 * Customizer class
 */
class Gutenberg {
	/**
	 * Relative path to the blocks folder in the theme
	 *
	 * @var string
	 */
	private static string $block_directory_path = 'views/blocks';
    
	/**
	 * Register class hooks
	 *
	 * @return WordPress add_action()
	 */
	public function register() {
		if (function_exists('register_block_type')) {
			$this->load_gutenberg_blocks();
		}

		if ( version_compare( get_bloginfo( 'version' ), '5.8', '>=' ) ) {
			add_filter( 'block_categories_all', array($this, 'add_block_categories'), 10, 1 );
		} else {
			add_filter( 'block_categories', array($this, 'add_block_categories'), 10, 1 );
		}
	}

    /**
	 * Add custom block categories
	 *
	 * @param array $categories Existing block categories.
	 * @return array Updated block categories.
	 */
    function add_block_categories( $categories ) {
        $json = Functions::get_theme_json('settings');
        $block_categories = $json['gutenberg']['categories'] ?? [];

        if ( empty( $block_categories ) ) {
            return $categories;
        }

		return array_merge( $block_categories, $categories );
	}

    /**
	 * Load Gutenberg blocks from the defined directory
	 *
	 * @return bool|void
	 */
	public function load_gutenberg_blocks() {
		$blocks = [];

		$block_path = get_template_directory() . '/' . self::$block_directory_path;

		if (!is_dir($block_path)) {
			return false;
		}

		foreach (glob("$block_path/*") as $folder) {
			$build_path = $folder . '/build';
			$include_file = trailingslashit($folder) . 'index.php';

			if (filetype($folder) && is_dir($build_path) && file_exists($include_file)) {
				$blocks[] = $include_file;
			}
		}

		if (count($blocks) >= 1) {
			$this->register_gutenberg_blocks($blocks);
		}
	}

    /**
	 * Register the found Gutenberg blocks by including their index.php files
	 *
	 * @param array $blocks List of blocks to register.
	 * @return void
	 */
	private function register_gutenberg_blocks(array $blocks) {
		foreach ($blocks as $block) {
			include_once($block);
		}
	}
}