<?php
// bring in the namespace and the Blockylicious class to use the static methods
use JeanK\Blockylicious\Blockylicious;

$block_gap = Blockylicious::convert_custom_properties($attributes['style']['spacing']['blockGap'] ?? '0');
//wp_send_json($block_gap);
$block_wrapper_attributes =  get_block_wrapper_attributes([
    'style' => 'gap:' . $block_gap . '; justify-content:' . $attributes['justifyContent']
]); ?>

<div <?php echo $block_wrapper_attributes; /* apply styles to button Group block */ ?>>
    <?php echo $content; ?>
</div>