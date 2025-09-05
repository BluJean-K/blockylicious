<?php
register_block_pattern(
    'blockylicious/clicky-buttons-action-group',
    array(
        'title'      => __('Clicky Buttons Call to Action', 'blockylicious'),
        'categories' => array('call-to-action', 'blockylicious'),
        'description' => __('Heading, paragraph, and custom buttons linking to custom post types or post ID', 'blockylicious'),
        'content' => '<!-- wp:heading {"textAlign":"center"} -->
					<h2 class="wp-block-heading has-text-align-center">Lorem Quorum Action Heading</h2>
					<!-- /wp:heading -->

					<!-- wp:paragraph {"align":"center"} -->
					<p class="has-text-align-center">Tell folks what to do next!</p>
					<!-- /wp:paragraph -->

					<!-- wp:blockylicious/clicky-group {"justifyContent":"center","style":{"spacing":{"blockGap":"var:preset|spacing|20"}}} -->
					<!-- wp:blockylicious/clicky-button {"labelText":"Get Information","style":{"color":{"text":"#ffffff"},"spacing":{"padding":{"top":"1rem","right":"1rem","bottom":"1rem","left":"1rem"}},"border":{"color":"#888888","radius":"0px","style":"solid","width":"1px"}}} /-->

					<!-- wp:blockylicious/clicky-button {"labelText":"Take Action Now","style":{"spacing":{"padding":{"top":"1rem","right":"1rem","bottom":"1rem","left":"1rem"}},"border":{"color":"#888888","radius":"0px","style":"solid","width":"1px"}},"backgroundColor":"contrast"} /-->
					<!-- /wp:blockylicious/clicky-group -->'
    )
);
register_block_pattern(
    'blockylicious/curvy-pattern',
    array(
        'title'      => __('Curvy CTA', 'blockylicious'),
        'categories' => array('call-to-action', 'blockylicious'),
        'description' => __('Heading, paragraph, buttons', 'blockylicious'),
        'content' => '<!-- wp:blockylicious/curvy {"style":{"spacing":{"padding":{"top":"104px","right":"50px","bottom":"104px","left":"50px"}}},"topColor":"base","bottomColor":"base","backgroundColor":"contrast"} -->
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:heading {"textAlign":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|accent-1"}}}},"textColor":"accent-1"} -->
<h2 class="wp-block-heading has-text-align-center has-accent-1-color has-text-color has-link-color">Lorem Ipsum Heading</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|base"}}},"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}}},"textColor":"base"} -->
<p class="has-text-align-center has-base-color has-text-color has-link-color" style="padding-top:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30)">Call to Action Paragraph. Candy tiramisu jujubes lemon drops croissant. Macaroon halvah ice cream cupcake powder pastry. Jelly-o cake biscuit shortbread fruitcake candy canes jelly beans carrot cake.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:blockylicious/clicky-group {"justifyContent":"center","style":{"spacing":{"blockGap":"var:preset|spacing|30"}}} -->
<!-- wp:blockylicious/clicky-button {"labelText":"Take Action Now","style":{"spacing":{"padding":{"top":"1rem","right":"1.8rem","bottom":"1rem","left":"1.8rem"},"margin":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20"}},"border":{"color":"#888888","radius":"0px","style":"solid","width":"1px"}},"backgroundColor":"accent-1","textColor":"contrast"} /-->

<!-- wp:blockylicious/clicky-button {"labelText":"Get Information","style":{"spacing":{"padding":{"top":"1rem","right":"1.8rem","bottom":"1rem","left":"1.8rem"},"margin":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20"}},"border":{"color":"#888888","radius":"0px","style":"solid","width":"1px"}}} /-->
<!-- /wp:blockylicious/clicky-group -->
<!-- /wp:blockylicious/curvy -->'
    )
);
