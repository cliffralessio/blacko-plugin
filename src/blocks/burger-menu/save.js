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
 * Import hamburgers CSS.
 */
import 'hamburgers/dist/hamburgers.css';

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
    const { classMode, paddingX, paddingY, widthBurger, heightBurger, colorBurger } = attributes;

    // Definisci l'attributo styleAttr
    const styleAttr = { paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px`, paddingTop: `${paddingY}px`, paddingBottom: `${paddingY}px` };
    const burgerSettings = {
        '--width-burger': `${widthBurger}px`,
        '--height-burger': `${heightBurger}px`,
        '--color-burger': `${colorBurger}`
    }
    const blockProps = useBlockProps.save();

    return (
        <button
            {...blockProps}
            type="button"
            className={`hamburger hamburger--${classMode}`}
            style={styleAttr}
        >
            <span className="hamburger-box">
                <span className="hamburger-inner" style={burgerSettings} ></span>
            </span>
        </button>
    );
}
