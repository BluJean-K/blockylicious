<?php
$block_wrapper_attributes = get_block_wrapper_attributes();

// var_dump($attributes);
?>
<div <?php echo $block_wrapper_attributes; ?>>
    <div class="gallery-thumbnails">
        <?php echo $content; ?>
    </div>
    <div>
        <img class="image-preview" />
    </div>

</div>