import { useBlockProps, MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import { useSelect } from '@wordpress/data';
import './editor.scss';
import { ImageThumbnail } from '../components/imageThumbnail';
import { useImage } from '../hooks/useImage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPanorama } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;


export default function Edit(props) {
    const blockProps = useBlockProps();
    const image = useImage(props.attributes.imageId);
    useSelect((select) => {
        const data = select("core").getEntityRecord("postType", "attachment", props.attributes.imageId);
        return data;
    }, [props.attributes.imageId]); //dependency array makes useSelect re-run when imageId changes
    // Check if an image is already selected
    const imageSelected = !!props.attributes.imageId && !!image?.source_url;


    return (
        <>
            <div {...blockProps}>
                {/* If an image is already selected, display as a thumbnail. If no image selected, display white placeholder div */}
                {imageSelected && (<ImageThumbnail imageId={props.attributes.imageId} />)
                }
                {!imageSelected && (<div className="piccy-image-empty-thumb">
                    <FontAwesomeIcon icon={faPanorama} style={{ margin: "auto", fontSize: "2.4rem" }} />
                </div>)
                }
                <MediaUploadCheck>
                    {/* Allows user to select or replace an image using the WP Media Library */}
                    <MediaUpload
                        allowedTypes={["image"]}
                        render={({ open }) => {
                            return (
                                <button className="media-select"
                                    onClick={open}>
                                    {imageSelected ? __("Replace Image", metadata.textdomain) : __("Select an Image", metadata.textdomain)}
                                </button>)
                        }}
                        value={props.attributes.imageId}
                        onSelect={(media) => {
                            props.setAttributes(
                                { imageId: media.id })
                        }}
                    />
                </MediaUploadCheck>
            </div>

        </>
    );
}