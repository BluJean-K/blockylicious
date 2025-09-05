/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

/**
 * WordPress dependencies
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
import metadata from './block.json';
import { Curve } from './components/curve';
import { TopCurveSettings } from './components/topcurvesettings';
import { BottomCurveSettings } from './components/bottomCurveSettings';

export default function Edit(props) {
	//console.log({ props });
	const { className, ...blockProps } = useBlockProps();

	return (
		<>
			<section className={`${className} alignfull`}{...blockProps}>
				{/* render Curve only if Top Curve toggled on */}
				{props.attributes.enableTopCurve && (
					<Curve
						color={props.attributes.topColor}
						height={props.attributes.topHeight}
						width={props.attributes.topWidth}
						flipX={props.attributes.topFlipX}
						flipY={props.attributes.topFlipY}
					/>
				)}
				<InnerBlocks />
				{/* render Curve only if Bottom Curve toggled on */}
				{props.attributes.enableBottomCurve && (
					<Curve
						isBottom
						color={props.attributes.bottomColor}
						height={props.attributes.bottomHeight}
						width={props.attributes.bottomWidth}
						flipX={props.attributes.bottomFlipX}
						flipY={props.attributes.bottomFlipY}
					/>
				)}
			</section>

			<InspectorControls>
				<PanelBody title={__('Top Curve', metadata.textdomain)}>
					<div style={{ display: 'flex' }}>
						<ToggleControl onChange={(isChecked) => {
							props.setAttributes({
								enableTopCurve: isChecked,
							});
						}} checked={props.attributes.enableTopCurve} />
						<span>{__('Enable Top Curve', metadata.textdomain)}</span>
					</div>
					{/* render Height & Width controls only if Top Curve toggled on */}
					{props.attributes.enableTopCurve && (
						<TopCurveSettings
							attributes={props.attributes}
							setAttributes={props.setAttributes} />
					)}
				</PanelBody>
				<PanelBody title={__('Bottom Curve', metadata.textdomain)}>
					<div style={{ display: 'flex' }}>
						<ToggleControl onChange={(isChecked) => {
							props.setAttributes({
								enableBottomCurve: isChecked,
							});
						}} checked={props.attributes.enableBottomCurve} />
						<span>{__('Enable Bottom Curve', metadata.textdomain)}</span>
					</div>
					{/* render Height & Width controls only if Bottom Curve toggled on */}
					{props.attributes.enableBottomCurve && (
						<BottomCurveSettings
							attributes={props.attributes}
							setAttributes={props.setAttributes} />
					)}
				</PanelBody>
			</InspectorControls>
		</>
	);
}
