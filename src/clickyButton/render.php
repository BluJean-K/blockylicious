<?php
$block_wrapper_attributes = get_block_wrapper_attributes([
    'style' => 'padding-left:10px;'
]);
if ($attributes['linkedPostId'] ?? null) {
    $post_uri = get_permalink($attributes['linkedPostId']);
}
// var_dump($attributes);
?>
<a href="<?php echo $post_uri ?? "#"; //if no linked post uri, use # placeholder 
            ?>" <?php echo $block_wrapper_attributes; ?>>
    <?php echo $attributes['labelText'] ?? ''; ?>
</a>