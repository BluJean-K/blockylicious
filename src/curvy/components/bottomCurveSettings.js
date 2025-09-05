// this component renders the Bottom Curve settings within the block editor PanelBody
// import WordPress dependencies
import { HorizontalRule, RangeControl, ToggleControl } from '@wordpress/components';
import { ColorPalette } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import metadata from '../block.json';

export const BottomCurveSettings = (props) => {
    return (
        <><HorizontalRule />
            <RangeControl label={__("Width", metadata.textdomain)} min={100} max={300} value={props.attributes.bottomWidth || 100}
                onChange={(newValue) => props.setAttributes(
                    { bottomWidth: parseInt(newValue) }
                )} />
            <RangeControl label={__("Height", metadata.textdomain)} min={10} max={200} value={props.attributes.bottomHeight || 20}
                onChange={(newValue) => props.setAttributes(
                    { bottomHeight: parseInt(newValue) }
                )} />
            <HorizontalRule />
            <div style={{ display: 'flex' }}>
                <ToggleControl onChange={(isChecked) => {
                    props.setAttributes({
                        bottomFlipX: isChecked,
                    });
                }} checked={props.attributes.bottomFlipX} />
                <span>{__('Flip Horizontally', metadata.textdomain)}</span>
            </div>
            <div style={{ display: 'flex' }}>
                <ToggleControl onChange={(isChecked) => {
                    props.setAttributes({
                        bottomFlipY: isChecked,
                    });
                }} checked={props.attributes.bottomFlipY} />
                <span>{__('Flip Vertically', metadata.textdomain)}</span>
            </div>
            <HorizontalRule />
            <div>
                <label>{__("Curve Color", metadata.textdomain)}</label>
                <ColorPalette
                    disableCustomColors
                    value={props.attributes.bottomColor}
                    onChange={(newValue) => props.setAttributes({ bottomColor: newValue })}
                />
            </div>
        </>
    );
}