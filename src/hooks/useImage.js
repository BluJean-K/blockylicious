import { useSelect } from '@wordpress/data';

export const useImage = (imageId) => {
    const image = useSelect(
        (select) => {
            const data = select("core").getEntityRecord(
                "postType", "attachment", imageId);
            return data;
        }, [imageId]); //dependency array makes useSelect re-run when imageId changes
    return image;  // image will be consumed by the ImageThumbnail component
}