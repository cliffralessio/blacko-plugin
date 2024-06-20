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
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ButtonGroup, Button, RangeControl, Icon } from '@wordpress/components';
import { useState } from '@wordpress/element';
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
 * @return {Element} Element to render.
 */
export default function Edit(props) {
    const { attributes, setAttributes } = props;
	
    const [selectedDevice, setSelectedDevice] = useState('desktop');

    const blockProps = useBlockProps();
	
    const heightValue = attributes[`height${selectedDevice.charAt(0).toUpperCase() + selectedDevice.slice(1)}`] || 0;

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Responsive Settings', 'virginia')}>
                    <div style={{ marginBottom: "15px" }}>
                        <ButtonGroup>
                            <Button
                                variant={selectedDevice === 'desktop' ? 'primary' : 'secondary'}
                                onClick={() => setSelectedDevice('desktop')}
                            >
                                <Icon icon={desktop} />
                            </Button>
                            <Button
                                variant={selectedDevice === 'tablet' ? 'primary' : 'secondary'}
                                onClick={() => setSelectedDevice('tablet')}
                            >
                                <Icon icon={tablet} />
                            </Button>
                            <Button
                                variant={selectedDevice === 'mobile' ? 'primary' : 'secondary'}
                                onClick={() => setSelectedDevice('mobile')}
                            >
                                <Icon icon={mobile} />
                            </Button>
                        </ButtonGroup>
                    </div>
                    <RangeControl
                        label={__('Height', 'virginia')}
                        value={heightValue}
                        onChange={(value) => setAttributes({ [`height${selectedDevice.charAt(0).toUpperCase() + selectedDevice.slice(1)}`]: value })}
                        min={0}
                        max={250}
                    />
                </PanelBody>
            </InspectorControls >
            <div {...blockProps} style={{ height: `${heightValue}px`}} ></div>
        </>
    );

}
