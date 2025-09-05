import { useBlockProps, useInnerBlocksProps, BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton, Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { ImageThumbnail } from '../components/imageThumbnail';
import './editor.scss';


export default function Edit(props) {
    /* console.log({ props }); // Delete before Build */
    const blockProps = useBlockProps();

    const innerBlocksProps = useInnerBlocksProps({
        className: "piccy-gallery-inner-blocks"
    },
        { allowedBlocks: ["blockylicious/piccy-image"] }
    );
    const [editMode, setEditMode] = useState(true); // true = preview mode, false = edit mode
    const innerBlocks = useSelect(
        (select) => {
            const { getBlocksByClientId } = select("core/block-editor");
            const block = getBlocksByClientId(props.clientId)?.[0];
            return block?.innerBlocks;
        }, [props.clientId]);

    /* console.log({ innerBlocks }); // Delete before Build */
    const [previewModeImage, setPreviewModeImage] = useState({
        imageId: innerBlocks?.[0]?.attributes?.imageId,
        blockId: innerBlocks?.[0]?.clientId
    });

    return (
        <>
            <div {...blockProps}>
                {/* Edit mode display */}
                {!!editMode && <div className='edit-mode'>
                    <span className='gallery-label'>{__("Piccy Image Gallery", metadata.textdomain)}</span>
                    <div {...innerBlocksProps} />
                </div>}
                {/* Preview mode display */}
                {!editMode && <>
                    <div className='preview-mode'>
                        {(innerBlocks || []).map(innerBlock => (
                            <ImageThumbnail
                                key={innerBlock.clientId}
                                imageId={innerBlock.attributes.imageId}
                                className={`piccy-image-thumb ${innerBlock.clientId === previewModeImage.blockId ? "selected" : ""}`}
                                height={75}
                                onClick={() => {
                                    setPreviewModeImage({
                                        imageId: innerBlock.attributes.imageId,
                                        blockId: innerBlock.clientId
                                    });
                                }} />
                        ))}
                    </div>
                    <div>
                        <ImageThumbnail imageId={previewModeImage?.imageId} height="auto" className="piccy-image-preview" />
                    </div>
                </>}
                {/* End Preview mode display */}
            </div>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        label={editMode ? __("Preview Gallery", metadata.textdomain) :
                            __("Edit Gallery", metadata.textdomain)
                        }
                        icon={editMode ? <Icon icon="welcome-view-site" /> : <Icon icon="edit" />}
                        onClick={() => { setEditMode(prevState => !prevState) }}
                    />
                </ToolbarGroup>
            </BlockControls>
        </>
    );
}