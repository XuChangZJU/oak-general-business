import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import {
    OakException,
    OakCongruentRowExists,
    OakUnloggedInException,
} from 'oak-domain/lib/types';
import { EntityDict } from '../../../general-app-domain';

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
    },
    listeners: {
        'editor,content'(prev, next) {
            if (next.editor && next.content) {
                next.editor.setHtml(next.content);
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
                }
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
        async onRemoveArticle(id: string) {
            this.removeItem(id);
            await this.execute();
            this.navigateBack();
        },
        async addExtraFile(
            extraFile: EntityDict['extraFile']['CreateSingle']['data']
        ) {
            const result = await this.features.cache.operate('extraFile', {
                action: 'create',
                data: extraFile,
                id: generateNewId(),
            });
            return result;
        },

        uploadFile(extraFile: EntityDict['extraFile']['CreateSingle']['data']) {
            return this.features.extraFile.upload(extraFile);
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
            if (this.state.name && this.state.name.length > 0) {
                await this.execute();
                this.navigateBack();
            } else {
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
                    // author,
                    // title,
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
                    // author,
                    // title,
                })
            );
            window.open('/article/preview');
        },
    },
});
