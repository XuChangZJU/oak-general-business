import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import {
    DeduceCreateOperationData,
    OakException,
    OakCongruentRowExists,
    OakUnloggedInException,
} from 'oak-domain/lib/types';
import { EntityDict } from '../../../general-app-domain';

export default OakComponent({
    entity: 'article',
    projection: {
        id: 1,
        iState: 1,
        title: 1,
        author: 1,
        abstract: 1,
        content: 1,
    },
    isList: false,
    formData: async function ({ data: article, features }) {
        return {
            id: article?.id,
            iState: article?.iState,
            title: article?.title,
            abstract: article?.abstract,
            author: article?.author,
            content: article?.content,
        };
    },
    data: {
        editor: null as IDomEditor | null,
        html: '',
        origin: 'qiniu',
        contentTip: false,
    },
    observers: {
        'editor,content': function(editor, content) {
            if (editor && content) {
                editor.setHtml(content);
                this.setHtml(content);
            }
        },
    },
    lifetimes: {
        detached() {
            const { editor } = this.state;
            if (editor == null) return;
            editor.destroy();
            this.setEditor(null);
        }
    },
    methods: {
        async addExtraFile(
            extraFile: DeduceCreateOperationData<
                EntityDict['extraFile']['Schema']
            >
        ) {
            try {
                const result = await this.features.cache.operate('extraFile', {
                    action: 'create',
                    data: extraFile,
                    id: await generateNewId(),
                });
                return result;
            } catch (error) {
                if (
                    (<OakException>error).constructor.name ===
                    OakUnloggedInException.name
                ) {
                    this.navigateTo({
                        url: '/login',
                    });
                    return;
                }
                throw error;
            }
        },
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
                await this.setUpdateData('content', html);
            }
        },
        async confirm() {
            const { content } = this.state;
            if (!content || content === '<p><br></p>') {
                this.setState({
                    contentTip: true,
                });

                return;
            }
            await this.execute();
            if (this.props.oakFrom === 'article:list') {
                this.navigateBack();
                return;
            }
            this.navigateBack();
        },
        async reset() {
            // 重置
            this.cleanOperation();
        },
        preview() {
            const { html, title, author } = this.state;
            this.save(
                'article_html',
                JSON.stringify({
                    content: html,
                    author,
                    title,
                })
            );
            window.open('/article/preview')
        },
    },
});
