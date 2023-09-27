import { WechatMpInstance, WechatPublicInstance, WechatSDK } from 'oak-external-sdk';
import { WechatMpConfig, WechatPublicConfig } from '../../../oak-app-domain/Application/Schema';
import { IDomEditor } from '@wangeditor/editor';
export default OakComponent({
    isList: false,
    properties: {
        text: '',
        getContent: (content: string) => undefined as void,
    },
    data: {
        editor: null as IDomEditor | null,
    },
    lifetimes: {
        detached() {
            const { editor } = this.state;
            if (editor == null) return;
            editor.destroy();
            this.setEditor(null);
        },
    },
    listeners: {
        'editor,value'(prev, next) {
            if (
                prev.editor !== next.editor ||
                prev.value !== next.value
            ) {
                if (next.editor && next.value) {
                    next.editor.setHtml(next.value);
                }
            }
        },
    },
    methods: {
        setEditor(editor: IDomEditor | null) {
            this.setState({
                editor,
            });
        },

        async setHtml(html: string) {
            this.setState({
                html,
            });
            if (html && html !== '<p><br></p>') {
            }
        },
    }
});