// Experimental Gradient Highlight format for RichText in Gutenberg
import {
    registerFormatType,
    applyFormat,
    removeFormat,
} from "@wordpress/rich-text";
import { __ } from "@wordpress/i18n";
import { RichTextToolbarButton, ColorPalette } from "@wordpress/block-editor";
import { PanelBody, Popover, GradientPicker } from '@wordpress/components';
import { useState } from '@wordpress/element';
import lowHighlightIcon from "./assets/low-highlight.svg";
import lowHighlightActive from "./assets/low-highlight-active.svg";
import './style.scss';

registerFormatType(
    'blockylicious/low-highlight-gradient',
    {
        title: __("Gradient highlight", "blockylicious"),
        tagName: 'span',
        className: 'blockylicious-low-highlight-gradient', // class to apply the gradient and lower position. defined in style.scss
        edit: ({ onChange, value, contentRef, isActive }) => {
            const [showGradients, setShowGradients] = useState(false);
            const lowHighlightGrad = value.activeFormats?.find(
                (format) => format.type === "blockylicious/low-highlight-gradient"
            );
            const attributes = {
                ...(lowHighlightGrad?.attributes || {}),
                ...(lowHighlightGrad?.unregisteredAttributes || {}),
            };
            console.log({ lowHighlightGrad });

            return (
                <>
                    <RichTextToolbarButton
                        icon="art"
                        title={__("Low Highlight Gradient", "blockylicious")}
                        onClick={() => setShowGradients(!showGradients)}
                        isActive={isActive}
                    />
                    {showGradients && (
                        <Popover
                            anchor={contentRef?.current}
                            onClose={() => setShowGradients(false)}
                        >
                            <PanelBody>
                                <GradientPicker
                                    label={__("Highlight Gradient", "blockylicious")}
                                    value={attributes?.["data-gradient"]}
                                    onChange={(newGradient) => {
                                        if (newGradient) {
                                            onChange(
                                                applyFormat(value, {
                                                    type: "blockylicious/low-highlight-gradient",
                                                    attributes: {
                                                        "data-gradient": newGradient,
                                                        style: `background-image: ${newGradient}`,
                                                    },
                                                })
                                            );
                                        } else {
                                            onChange(
                                                removeFormat(value, "blockylicious/low-highlight-gradient")
                                            );
                                        }
                                    }}
                                />
                            </PanelBody>
                        </Popover>
                    )}
                </>
            );
        },
    }
);
// Solid low highlight format (original)
registerFormatType("blockylicious/low-highlight", {
    title: __("Low highlight", "blockylicious"),
    tagName: "span",
    className: "blockylicious-low-highlight",
    edit: ({ onChange, value, contentRef, isActive }) => {
        const [showColors, setShowColors] = useState(false);
        const lowHighlight = value.activeFormats?.find(
            (format) => format.type === "blockylicious/low-highlight"
        );
        const attributes = {
            ...(lowHighlight?.attributes || {}),
            ...(lowHighlight?.unregisteredAttributes || {}),
        };
        console.log({ lowHighlight });

        return (
            <>
                <RichTextToolbarButton
                    icon={
                        <img
                            height={24}
                            width={24}
                            src={isActive ? lowHighlightActive : lowHighlightIcon}
                        />
                    }
                    title={__("Low highlight", "blockylicious")}
                    onClick={() => {
                        setShowColors(true);
                        /*console.log({ value });
                    onChange(
                        applyFormat(value, {
                            type: "blockylicious/low-highlight",
                        })
                    );*/
                    }}
                />
                {!!showColors && (
                    <Popover
                        anchor={contentRef?.current}
                        onClose={() => {
                            setShowColors(false);
                        }}
                    >
                        <PanelBody>
                            <ColorPalette
                                value={attributes?.["data-color"]}
                                onChange={(newValue) => {
                                    if (newValue) {
                                        onChange(
                                            applyFormat(value, {
                                                type: "blockylicious/low-highlight",
                                                attributes: {
                                                    "data-color": newValue,
                                                    style: `background-image: linear-gradient(to right, ${newValue}, ${newValue})`,
                                                },
                                            })
                                        );
                                    } else {
                                        onChange(
                                            removeFormat(value, "blockylicious/low-highlight")
                                        );
                                    }
                                }}
                            />
                        </PanelBody>
                    </Popover>
                )}
            </>
        );
    }
}
);

