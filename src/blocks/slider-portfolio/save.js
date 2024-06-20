import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { heightDesktop = 120, heightTablet = 60, heightMobile = 30 } = attributes;

    const blockProps = useBlockProps.save({
        style: {
            '--height-desktop': `${heightDesktop}px`,
            '--height-tablet': `${heightTablet}px`,
            '--height-mobile': `${heightMobile}px`,
        },
    });

    return <div {...blockProps}></div>;
}
