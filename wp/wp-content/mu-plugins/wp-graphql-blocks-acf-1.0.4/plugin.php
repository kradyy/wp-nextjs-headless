<?php

/**
 * Plugin Name: WP GraphQL Blocks ACF
 * Plugin URI: https://github.com/webdeveducation/wp-graphql-blocks-acf
 * Description: Enable ACF block data for WP GraphQL Blocks.
 * Author: WebDevEducation 
 * Author URI: https://webdeveducation.com
 * Version: 1.0.4
 * Requires at least: 6.0
 * License: GPL-3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 */


if (!defined('ABSPATH')) {
	die('Silence is golden.');
}

if (!class_exists('WPGraphQLBlocksAcf')) {
	final class WPGraphQLBlocksAcf {
		private static $instance;
		public static function instance() {
			if (!isset(self::$instance)) {
				self::$instance = new WPGraphQLBlocksAcf();
			}

			return self::$instance;
		}

		public function init() {
      if (!class_exists('\WPGraphQLBlocks\WPGraphQLBlocks')) {
        // WPGraphQLBlocks plugin is not activated
        add_action(
          'admin_notices',
          function() {
            ?>
            <div class="error notice">
              <p><a href="https://github.com/webdeveducation/wp-graphql-blocks/releases" target="_blank" rel="noopener noreferrer">WP GraphQL Blocks</a> must be active for <strong>WP GraphQL Blocks ACF</strong> to work.</p>
            </div>
            <?php
          }
        );
      } 

      add_filter('wp_graphql_blocks_process_attributes', function ($attributes, $data, $post_id){
        // if it's an ACF block
        if(isset($attributes['data'])){
          $attributesData = $attributes['data'];
          foreach ($attributesData as $key => $value) {
            // attributes that start with an underscore _ are set to the field keys
            if(substr($key, 0, 1) == '_' && function_exists('get_field_object')){
              $fieldObject = get_field_object($value);
      
              // handle acf taxonomy
              if($fieldObject && $fieldObject['type'] == 'taxonomy'){
                //wp_send_json(['data' => $fieldObject]);
              }
      
              // handle acf image field
              if($fieldObject && $fieldObject['type'] == 'image'){
                $imageId = $attributes['data'][substr($key, 1)];
                // get media item
                $img = wp_get_attachment_image_src($imageId, 'full');
                $image_alt = get_post_meta($imageId, '_wp_attachment_image_alt', TRUE);
                $image_title = get_the_title($imageId);
      
                if($fieldObject['return_format'] == 'url'){
                  $attributes['data'][substr($key, 1)] = $img[0];
                }else if($fieldObject['return_format'] == 'array'){
                  $attributes['data'][substr($key, 1)] = array(
                    'id' => $imageId,
                    'url' => $img[0],
                    'width' => $img[1],
                    'height' => $img[2],
                    'resized' => $img[3],
                    'alt' => $image_alt,
                    'title' => $image_title
                  );
                }else if($fieldObject['return_format'] == 'id'){
                  $attributes['data'][substr($key, 1)] = $imageId;
                }
              }
      
              // handle page link
              if($fieldObject && $fieldObject['type'] == 'page_link'){
                $linkedPostId = $attributes['data'][substr($key, 1)];
                $linkedPost = get_post($linkedPostId);
                $pageUri = get_page_uri($linkedPostId);
                $attributes['data'][substr($key, 1)] = "/$pageUri";
              }
      
              // handle post object
              if($fieldObject && $fieldObject['type'] == 'post_object'){
                if($fieldObject['return_format'] == 'object'){
                  $linkedPostIds = $attributes['data'][substr($key, 1)];
                  if(gettype($linkedPostIds) == 'array'){
                    // loop over each id
                    $posts = [];
                    foreach ($linkedPostIds as $linkedPostId) {
                      $linkedPost = get_post($linkedPostId);
                      $pageUri = get_page_uri($linkedPostId);
                      $linkedPost->uri = "/$pageUri";
                      array_push($posts, $linkedPost);
                    }
                    $attributes['data'][substr($key, 1)] = $posts;
                  }else{
                    $linkedPost = get_post($linkedPostIds);
                    $pageUri = get_page_uri($linkedPostIds);
                    $linkedPost->uri = "/$pageUri";
                    $attributes['data'][substr($key, 1)] = $linkedPost;
                  }
                }
              }
            }
          }
        }
        return $attributes;
      }, 1, 3);
		}
	}
}

WPGraphQLBlocksAcf::instance()->init();