import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import {
    OakException,
    OakCongruentRowExists,
    OakUnloggedInException,
} from 'oak-domain/lib/types';
import { EntityDict } from '../../../oak-app-domain';

export default OakComponent({
    entity: 'article',
    projection: {
        id: 1,
        name: 1,
        content: 1,
        articleMenu: {
            id: 1,
        },
    },
    isList: false,
    formData: function ({ data: article, features }) {
        return {
            id: article?.id,
            content: article?.content,
            name: article?.name,
            articleMenuId: article?.articleMenuId,
        };
    },
    data: {
        editor: null as IDomEditor | null,
        html: '',
        origin1: 'qiniu',
        contentTip: false,
    },
    properties: {
        articleMenuId: '',
        changeIsEdit: () => undefined as void,
    },
    listeners: {
        'editor,content'(prev, next) {
            if (next.editor && next.content) {
                next.editor.setHtml(next.content);
            }
        },
        oakId(prev, next) {
            if (prev.oakId !== next.oakId) {
                const { editor } = this.state;
                if (editor == null) return;
                editor.destroy();
                this.setEditor(null);
            }
        },
    },
    lifetimes: {
        async ready() {
            const { oakId, articleMenuId } = this.props;
            if (!oakId) {
                if (articleMenuId) {
                    this.update({
                        articleMenuId,
                    });
                    const { editor } = this.state;
                    editor?.setHtml('');
                    this.update({
                        content: '',
                    });
                }
            } else {
            }
        },
        detached() {
            const { editor } = this.state;
            if (editor == null) return;
            editor.destroy();
            this.setEditor(null);
        },
    },
    methods: {
        async uploadFile(
            extraFile: EntityDict['extraFile']['CreateSingle']['data'],
            file: File | string
        ) {
            const result = await this.features.extraFile.autoUpload(
                extraFile as EntityDict['extraFile']['OpSchema'],
                file!
            );
            return result;
        },

        setEditor(editor: IDomEditor | null) {
            this.setState({
                editor,
            });
        },
        clearContentTip() {
            this.setState({
                contentTip: false,
            });
        },
        async check() {
            if (
                this.state.name &&
                this.state.name.length > 0 &&
                this.state.content &&
                this.state.content.length > 0 &&
                this.state.html !== '<p><br></p>'
            ) {
                await this.execute();
                if (this.props.changeIsEdit) {
                    this.props.changeIsEdit();
                }
            } else if (this.state.name && this.state.name.length > 0) {
                this.setMessage({
                    content: '请填写文章内容!',
                    type: 'warning',
                });
            } else if (
                this.state.content &&
                this.state.content.length > 0 &&
                this.state.html !== '<p><br></p>'
            ) {
                this.setMessage({
                    content: '请填写文章标题!',
                    type: 'warning',
                });
            }
        },
        async reset() {
            // 重置
            this.clean();
        },
        setHtml(html: string) {
            this.setState({
                html,
            });
            if (html && html !== '<p><br></p>' && this.state.oakFullpath) {
                this.update({ content: html });
            }
        },
        preview() {
            const { html } = this.state;
            this.save(
                'article_html',
                JSON.stringify({
                    content: html,
                })
            );
            window.open('/article/preview');
        },
        gotoPreview(content?: string, title?: string) {
            this.save(
                'article_html',
                JSON.stringify({
                    content,
                    title,
                })
            );
            window.open('/article/preview');
        },
    },
});
