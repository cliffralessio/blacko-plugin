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
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should be combined
 * into the final markup, which is then serialized by the block editor into post_content.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props - Block properties.
 * @param {Object} props.attributes - Block attributes.
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
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

    // Define CSS custom properties directly in the inline style for the save function
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

    const blockProps = useBlockProps.save({
        className: `${visibilityDesktop ? 'visible-desktop' : ''} ${visibilityTablet ? 'visible-tablet' : ''} ${visibilityMobile ? 'visible-mobile' : ''}`
    });

    return (
        <div {...blockProps}>
            <button
                type="button"
                className={`hamburger hamburger--${classMode}`}
                style={burgerSettings}
            >
                <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                </span>
            </button>
        </div>
    );
}
