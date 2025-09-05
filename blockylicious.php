<?php

/**
 * Plugin Name:       Blockylicious
 * Description:       A plugin offering funky blocks.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Jean Kuyk
 * Author URI:		https://github.com/BluJean-K
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blockylicious
 *
 * @package CreateBlock
 */

namespace JeanK\Blockylicious;

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

final class Blockylicious
{
	// Adds the custom block category - Blockylicious.
	public static function add_custom_block_category($categories)
	{
		array_unshift($categories, [
			'slug'  => 'blockylicious_custom',
			'title' => 'Blockylicious',
			'icon'  => null,
		]);
		return $categories;
	}


	/**
	 * Registers the block using a generated `blocks-manifest.php` file.
	 * Behind the scenes, it also registers all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 * The exact WP function used will depend on the version of WordPress.
	 */

	public static function init()
	{

		add_action('init', function () {
			// Register custom pattern category and patterns
			register_block_pattern_category('blockylicious', array(
				'label' => __('Blockylicious', 'blockylicious')
			));
			// register_block_pattern functions moved to blockylicious_block_patterns file
			require_once 'blockylicious-block-patterns.php';

			/**
			 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s) based on the registered block metadata. Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
			 */
			if (function_exists('wp_register_block_types_from_metadata_collection')) {
				wp_register_block_types_from_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
				return;
			}
			/**
			 * Registers the block(s) metadata from the `blocks-manifest.php` file. Added to WordPress 6.7 to improve the performance of block type registration.
			 */
			if (function_exists('wp_register_block_metadata_collection')) {
				wp_register_block_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
			}
			/**
			 * Registers the block type(s) in the `blocks-manifest.php` file.
			 * @see https://developer.wordpress.org/reference/functions/register_block_type/
			 */
			$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
			foreach (array_keys($manifest_data) as $block_type) {
				register_block_type(__DIR__ . "/build/{$block_type}");
			}
			/**
			 * End of the block type(s) registration
			 */


			// Enqueue custom scripts NOT WORKING YET
			$script_url = plugins_url('build/index.js', __FILE__);
			wp_enqueue_script('blockylicious-index', $script_url, array('wp-blocks', 'wp-element', 'wp-editor'), filemtime(__DIR__ . '/build/index.js'), true);
			// I added filemtime to ensure the script is reloaded when modified. REMOVE after development
			// End enqueuing scripts and styles

			/**
			 * End of add action on init
			 */
		});

		// Adds the custom block category - Blockylicious.
		add_filter('block_categories_all', [__CLASS__, 'add_custom_block_category']);
	}
	// End init function

	// Customization: Convert custom properties to WP CSS variables
	static function convert_custom_properties($value)
	{
		$prefix     = 'var:';
		$prefix_len = strlen($prefix);
		$token_in   = '|';
		$token_out  = '--';
		if (str_starts_with($value, $prefix)) {
			$unwrapped_name = str_replace(
				$token_in,
				$token_out,
				substr($value, $prefix_len)
			);
			$value = "var(--wp--$unwrapped_name)";
		}

		return $value;
	}
}

Blockylicious::init();
