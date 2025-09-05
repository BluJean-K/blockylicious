import { useImage } from "../hooks/useImage";

export const ImageThumbnail = (props) => {
    const image = useImage(props.imageId);

    return (image?.source_url ? (
        <img
            src={image.source_url}
            onClick={props.onClick}
            className={props.className || "piccy-image-thumb"}
            style={{ height: props.height || 150, pointerEvents: "visible" }}
        />
    ) : null
    );
}