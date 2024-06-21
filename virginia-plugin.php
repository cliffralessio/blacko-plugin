<?php

/**
 * Plugin Name:       virginia Web editor
 * Description:       Some customised blocks to simplify page construction
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Alessio
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       virginia-plugin
 * Domain Path:       virginia-web
 *
 * @package virginia
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function virginia_virginia_plugin_block_init()
{
	register_block_type(__DIR__ . '/build/blocks/virginia-spacer');
	register_block_type(__DIR__ . '/build/blocks/burger-menu');
}
add_action('init', 'virginia_virginia_plugin_block_init');


/**
 * Remove spacer block
 * Remove core/spacer block
 *
 */
function example_disallow_block_types( $allowed_block_types, $block_editor_context ) {

		$disallowed_blocks = array(
			'core/spacer',
		);
		
		// Get all registered blocks if $allowed_block_types is not already set.
		if ( ! is_array( $allowed_block_types ) || empty( $allowed_block_types ) ) {
			$registered_blocks   = WP_Block_Type_Registry::get_instance()->get_all_registered();
			$allowed_block_types = array_keys( $registered_blocks );
		}

		// Create a new array for the allowed blocks.
		$filtered_blocks = array();

		// Loop through each block in the allowed blocks list.
		foreach ( $allowed_block_types as $block ) {

			// Check if the block is not in the disallowed blocks list.
			if ( ! in_array( $block, $disallowed_blocks, true ) ) {

				// If it's not disallowed, add it to the filtered list.
				$filtered_blocks[] = $block;
			}
		}

		// Return the filtered list of allowed blocks
		return $filtered_blocks;
	
	return $allowed_block_types;
}
add_filter( 'allowed_block_types_all', 'example_disallow_block_types', 10, 2 );