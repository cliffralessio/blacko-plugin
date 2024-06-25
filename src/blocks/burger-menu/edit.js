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
import { useBlockProps, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, TextControl, BaseControl, SelectControl, ButtonGroup, Button, Icon } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { desktop, tablet, mobile } from '@wordpress/icons';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object} props - Block properties.
 * @param {Object} props.attributes - Block attributes.
 * @param {Function} props.setAttributes - Function to update block attributes.
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        classMode,
        paddingX,
        paddingY,
        layerWidth,
        layerHeight,
        layerSpacing,
        layerColor,
        borderRadiusBurger,
        hoverOpacity,
        activeLayerColor,
        activeHoverOpacity,
        useHoverFilter,
        hoverFilter,
        activeHoverFilter,
        zIndex,
        visibilityDesktop,
        visibilityTablet,
        visibilityMobile
    } = attributes;

    const [isActive, setIsActive] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState('desktop');

    const burgerSettings = {
        '--padding-left': `${paddingX}px`,
        '--padding-right': `${paddingX}px`,
        '--padding-top': `${paddingY}px`,
        '--padding-bottom': `${paddingY}px`,
        '--width-burger': `${layerWidth}px`,
        '--height-burger': `${layerHeight}px`,
        '--spacing-burger': `${layerSpacing}px`,
        '--layer-color': layerColor,
        '--border-radius-burger': `${borderRadiusBurger}px`,
        '--hover-opacity': `${hoverOpacity}`,
        '--active-layer-color': activeLayerColor || layerColor,
        '--active-hover-opacity': `${activeHoverOpacity}`,
        '--hover-filter': useHoverFilter ? `${hoverFilter}` : 'none',
        '--active-hover-filter': useHoverFilter ? `${activeHoverFilter}` : 'none',
        '--z-index-burger': zIndex
    };


    const blockProps = useBlockProps({
        className: `${visibilityDesktop ? 'visible-desktop' : ''} ${visibilityTablet ? 'visible-tablet' : ''} ${visibilityMobile ? 'visible-mobile' : ''}`
    });
    useEffect(() => {
        // Function to update classes in the iframe
        const updateIframeClasses = () => {
            const iframe = document.querySelector('iframe[name="editor-canvas"]');
            if (iframe) {
                if (selectedDevice === 'desktop') {
                    iframe.style.border = "0px";
                    iframe.style.margin = "0 auto";
                    iframe.style.transition = "all 0.3s ease 0s";
                    iframe.style.width = "100%";
                    iframe.style.height = "100%";
                } else if (selectedDevice === 'tablet') {
                    iframe.style.border = "1px solid rgb(221, 221, 221)";
                    iframe.style.margin = "72px auto";
                    iframe.style.transition = "all 0.3s ease 0s";
                    iframe.style.width = "780px";
                    iframe.style.height = "1024px";
                    iframe.style.borderRadius = "2px";
                    iframe.style.overflowY = "auto";
                } else if (selectedDevice === 'mobile') {
                    iframe.style.border = "1px solid rgb(221, 221, 221)";
                    iframe.style.margin = "72px auto";
                    iframe.style.transition = "all 0.3s ease 0s";
                    iframe.style.width = "360px";
                    iframe.style.height = "768px";
                    iframe.style.borderRadius = "2px";
                    iframe.style.overflowY = "auto";
                }
            }
        };

        updateIframeClasses();

    }, [selectedDevice]);
    return (
        <>
            <InspectorControls>
                <PanelBody title={__("Hamburger Settings", "virginia-plugin-plugin")} initialOpen={false}>
                    <SelectControl
                        label={__('Animation Style', 'virginia-plugin-plugin')}
                        value={classMode || 'squeeze'}
                        options={[
                            { label: __('3DX', 'virginia-plugin-plugin'), value: '3dx' },
                            { label: __('3DX Reverse', 'virginia-plugin'), value: '3dx-r' },
                            { label: __('3DY', 'virginia-plugin'), value: '3dy' },
                            { label: __('3DY Reverse', 'virginia-plugin'), value: '3dy-r' },
                            { label: __('3DXY', 'virginia-plugin'), value: '3dxy' },
                            { label: __('3DXY Reverse', 'virginia-plugin'), value: '3dxy-r' },
                            { label: __('Arrow', 'virginia-plugin'), value: 'arrow' },
                            { label: __('Arrow Reverse', 'virginia-plugin'), value: 'arrow-r' },
                            { label: __('Arrowalt', 'virginia-plugin'), value: 'arrowalt' },
                            { label: __('Arrowalt Reverse', 'virginia-plugin'), value: 'arrowalt-r' },
                            { label: __('Arrowturn', 'virginia-plugin'), value: 'arrowturn' },
                            { label: __('Arrowturn Reverse', 'virginia-plugin'), value: 'arrowturn-r' },
                            { label: __('Boring', 'virginia-plugin'), value: 'boring' },
                            { label: __('Collapse', 'virginia-plugin'), value: 'collapse' },
                            { label: __('Collapse Reverse', 'virginia-plugin'), value: 'collapse-r' },
                            { label: __('Elastic', 'virginia-plugin'), value: 'elastic' },
                            { label: __('Elastic Reverse', 'virginia-plugin'), value: 'elastic-r' },
                            { label: __('Emphatic', 'virginia-plugin'), value: 'emphatic' },
                            { label: __('Emphatic Reverse', 'virginia-plugin'), value: 'emphatic-r' },
                            { label: __('Minus', 'virginia-plugin'), value: 'minus' },
                            { label: __('Slider', 'virginia-plugin'), value: 'slider' },
                            { label: __('Slider Reverse', 'virginia-plugin'), value: 'slider-r' },
                            { label: __('Spin', 'virginia-plugin'), value: 'spin' },
                            { label: __('Spin Reverse', 'virginia-plugin'), value: 'spin-r' },
                            { label: __('Spring', 'virginia-plugin'), value: 'spring' },
                            { label: __('Spring Reverse', 'virginia-plugin'), value: 'spring-r' },
                            { label: __('Stand', 'virginia-plugin'), value: 'stand' },
                            { label: __('Stand Reverse', 'virginia-plugin'), value: 'stand-r' },
                            { label: __('Squeeze', 'virginia-plugin'), value: 'squeeze' },
                            { label: __('Vortex', 'virginia-plugin'), value: 'vortex' },
                            { label: __('Vortex Reverse', 'virginia-plugin'), value: 'vortex-r' },
                        ]}
                        onChange={(newMode) => {
                            setAttributes({
                                classMode: newMode
                            });
                        }}
                    />
                    <RangeControl
                        label={__("Layer Width", "virginia-plugin")}
                        value={layerWidth}
                        onChange={(value) => setAttributes({ layerWidth: value })}
                        min={10}
                        max={100}
                    />
                    <RangeControl
                        label={__("Layer Height", "virginia-plugin")}
                        value={layerHeight}
                        onChange={(value) => setAttributes({ layerHeight: value })}
                        min={1}
                        max={20}
                    />
                    <RangeControl
                        label={__("Border Radius", "virginia-plugin")}
                        value={borderRadiusBurger}
                        onChange={(value) => setAttributes({ borderRadiusBurger: value })}
                        min={0}
                        max={20}
                    />
                    <RangeControl
                        label={__("Layer Spacing", "virginia-plugin")}
                        value={layerSpacing}
                        onChange={(value) => setAttributes({ layerSpacing: value })}
                        min={0}
                        max={20}
                    />
                    <RangeControl
                        label={__("Padding X", "virginia-plugin")}
                        value={paddingX}
                        onChange={(value) => setAttributes({ paddingX: value })}
                        min={0}
                        max={50}
                    />
                    <RangeControl
                        label={__("Padding Y", "virginia-plugin")}
                        value={paddingY}
                        onChange={(value) => setAttributes({ paddingY: value })}
                        min={0}
                        max={50}
                    />
                    <TextControl
                        label={__("Z-index", "virginia-plugin")}
                        value={zIndex}
                        onChange={(value) => setAttributes({ zIndex: value })}
                    />
                    <BaseControl
                        label={__("Layer Color", "virginia-plugin")}
                        id="hamburger-layer-color"
                    >
                        <ColorPalette
                            value={layerColor}
                            onChange={(color) => setAttributes({ layerColor: color })}
                        />
                    </BaseControl>

                </PanelBody>
                <PanelBody title={__("Hover adn active settings", "virginia-plugin")} initialOpen={false}>
                    <RangeControl
                        label={__("Hover Opacity", "virginia-plugin")}
                        value={hoverOpacity}
                        onChange={(value) => setAttributes({ hoverOpacity: value })}
                        min={0.1}
                        max={1}
                        step={0.1}
                    />
                    <BaseControl
                        label={__("Active Layer Color", "virginia-plugin")}
                        id="hamburger-active-layer-color"
                    >
                        <ColorPalette
                            value={activeLayerColor}
                            onChange={(color) => setAttributes({ activeLayerColor: color })}
                        />
                    </BaseControl>
                    <RangeControl
                        label={__("Active Hover Opacity", "virginia-plugin")}
                        value={activeHoverOpacity}
                        onChange={(value) => setAttributes({ activeHoverOpacity: value })}
                        min={0.1}
                        max={1}
                        step={0.1}
                    />
                    <ToggleControl
                        label={__("Use Hover Filter", "virginia-plugin")}
                        checked={useHoverFilter}
                        onChange={() => setAttributes({ useHoverFilter: !useHoverFilter })}
                    />
                    {useHoverFilter && (
                        <>
                            <TextControl
                                label={__("Hover Filter", "virginia-plugin")}
                                value={hoverFilter}
                                onChange={(value) => setAttributes({ hoverFilter: value })}
                            />
                            <TextControl
                                label={__("Active Hover Filter", "virginia-plugin")}
                                value={activeHoverFilter}
                                onChange={(value) => setAttributes({ activeHoverFilter: value })}
                            />
                        </>
                    )}
                </PanelBody>
                <PanelBody title={__('Responsive control', 'virginia-plugin')} initialOpen={false}>
                    <div style={{ marginBottom: "15px" }}>
                        <ButtonGroup>
                            <Button
                                variant={selectedDevice === 'desktop' ? 'primary' : 'secondary'}
                                onClick={() => { setSelectedDevice('desktop') }}
                            >
                                <Icon icon={desktop} />
                            </Button>
                            <Button
                                variant={selectedDevice === 'tablet' ? 'primary' : 'secondary'}
                                onClick={() => { setSelectedDevice('tablet') }}
                            >
                                <Icon icon={tablet} />
                            </Button>
                            <Button
                                variant={selectedDevice === 'mobile' ? 'primary' : 'secondary'}
                                onClick={() => { setSelectedDevice('mobile') }}
                            >
                                <Icon icon={mobile} />
                            </Button>
                            {selectedDevice === 'desktop' &&
                                <div style={{ marginTop: "15px" }}>
                                    <ToggleControl
                                        label={__('Visible on desktop', 'virginia-plugin')}
                                        checked={visibilityDesktop}
                                        onChange={(value) => setAttributes({ visibilityDesktop: value })}
                                    /></div>}

                            {selectedDevice === 'tablet' &&
                                <div style={{ marginTop: "15px" }}>
                                    <ToggleControl
                                        label={__('Visible on tablet', 'virginia-plugin')}
                                        checked={visibilityTablet}
                                        onChange={(value) => setAttributes({ visibilityTablet: value })}
                                    /></div>}
                            {selectedDevice === 'mobile' &&
                                <div style={{ marginTop: "15px" }}>
                                    <ToggleControl
                                        label={__('Visible on mobile', 'virginia-plugin')}
                                        checked={visibilityMobile}
                                        onChange={(value) => setAttributes({ visibilityMobile: value })}
                                    /></div>}
                        </ButtonGroup>
                    </div>
                </PanelBody >

            </InspectorControls >
            <div {...blockProps}>
                <button
                    type="button"
                    className={`hamburger hamburger--${classMode} ${isActive ? 'is-active' : ''}`}
                    style={burgerSettings}
                    onClick={() => setIsActive(!isActive)}
                >
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        </>
    );
}
