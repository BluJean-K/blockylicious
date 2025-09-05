import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export default function Edit(props) {
    const postTypes = useSelect((select) => {
        const data = select('core').getEntityRecords('root', 'postType', { per_page: -1 });
        return data?.filter(item => item.visibility.show_in_nav_menus && item.visibility.show_ui);
    });
    //console.log({ postTypes });

    //populate list of posts matching the selected post type
    const posts = useSelect((select) => {
        const data = select('core').getEntityRecords('postType', props.attributes.postType, { per_page: -1 });
        return data;
    },
        [props.attributes.postType]);
    console.log({ posts });

    const blockProps = useBlockProps();

    return (
        <>
            <InspectorControls>
                <PanelBody title="Destination">
                    <SelectControl
                        label="Post Type"
                        value={props.attributes.postType}
                        options={
                            [{
                                label: 'Select a post type',
                                value: ''
                            },
                            ...(postTypes || []).map(
                                (postType) => ({
                                    label: postType.labels.singular_name,
                                    value: postType.slug
                                }))]
                        }
                        onChange={(newValue) => { props.setAttributes({ postType: newValue }) }} />
                    {!!props.attributes.postType &&
                        <SelectControl label={`Linked ${props.attributes.postType}`}
                            value={props.attributes.linkedPostId}
                            onChange={(newValue) => {
                                props.setAttributes({
                                    linkedPostId: newValue ? parseInt(newValue) : null
                                });
                            }}
                            options={[
                                { label: `Select a ${props.attributes.postType} to link`, value: '' },
                                ...(posts || []).map((post) => ({
                                    label: post.title.rendered,
                                    value: post.id
                                }))
                            ]}
                        />}
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <RichText placeholder='Label text'
                    value={props.attributes.labelText}
                    identifier='labelText'
                    allowedFormats={['core/bold']}
                    multiline={false} //prevents label text on new line
                    onChange={(newValue) => {
                        props.setAttributes(
                            { labelText: newValue, }
                        );
                    }} />
            </div>
        </>
    );
}