// this component renders the Top Curve settings within the block editor PanelBody
// import WordPress dependencies
import { HorizontalRule, RangeControl, ToggleControl } from '@wordpress/components';
import { ColorPalette } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import metadata from '../block.json';

export const TopCurveSettings = (props) => {
    return (
        <><HorizontalRule />
            <RangeControl label={__("Width", metadata.textdomain)} min={100} max={300} value={props.attributes.topWidth || 100}
                onChange={(newValue) => props.setAttributes(
                    { topWidth: parseInt(newValue) }
                )} />
            <RangeControl label={__("Height", metadata.textdomain)} min={10} max={200} value={props.attributes.topHeight || 20}
                onChange={(newValue) => props.setAttributes(
                    { topHeight: parseInt(newValue) }
                )} />
            <HorizontalRule />
            <div style={{ display: 'flex' }}>
                <ToggleControl onChange={(isChecked) => {
                    props.setAttributes({
                        topFlipX: isChecked,
                    });
                }} checked={props.attributes.topFlipX} />
                <span>{__('Flip Horizontally', metadata.textdomain)}</span>
            </div>
            <div style={{ display: 'flex' }}>
                <ToggleControl onChange={(isChecked) => {
                    props.setAttributes({
                        topFlipY: isChecked,
                    });
                }} checked={props.attributes.topFlipY} />
                <span>{__('Flip Vertically', metadata.textdomain)}</span>
            </div>
            <HorizontalRule />
            <div>
                <label>{__("Curve Color", metadata.textdomain)}</label>
                <ColorPalette
                    disableCustomColors
                    value={props.attributes.topColor}
                    onChange={(newValue) => props.setAttributes({ topColor: newValue })}
                />
            </div>
        </>
    );
}