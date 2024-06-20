const { registerPlugin } = wp.plugins;
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { PluginSidebarMoreMenuItem, PluginSidebar } = wp.editPost;
const { PanelBody, PanelRow, ToggleControl, Button, TextControl, TextareaControl } = wp.components;
const { useSelect, useDispatch } = wp.data;
const { MediaUpload, MediaUploadCheck } = wp.blockEditor;


const SeoMetaBox = (props) => {

    const { editPost } = useDispatch('core/editor');

    const { metaValue } = useSelect((select) => {
        return {
            metaValue: select('core/editor').getEditedPostAttribute('meta')[props.metaKey],
        }
    }, [props.metaKey]);


    return (
        <>
            <TextControl
                type="text"
                label={props.label}
                value={metaValue}
                onChange={(value) => editPost({ meta: { [props.metaKey]: value } })}
            />
        </>
    )
}

const CustomSidebarComponent = () => {

    return (
        <Fragment>
            <PluginSidebarMoreMenuItem
                target='seo-meta-box'
                icon='carrot'
            >{__('SEO', 'awp')}</PluginSidebarMoreMenuItem>
            <PluginSidebar
                name="seo-meta-box"
                title={__('SEO', 'awp')}
            >
                <PanelBody
                    title={__('SEO & Meta tag', 'awp')}
                    initialOpen={true}
                >
                    <PanelRow>
                        <SeoMetaBox
                            label="Title" metaKey="misha_plugin_seo_title"
                        />
                    </PanelRow>
                </PanelBody>

            </PluginSidebar>
        </Fragment >
    );
}

registerPlugin('seo-meta-box', {
    render: CustomSidebarComponent,
    icon: 'chart-area'
});