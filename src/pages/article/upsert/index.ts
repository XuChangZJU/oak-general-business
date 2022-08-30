import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import {
    DeduceCreateOperationData,
    OakException,
    OakCongruentRowExists,
    OakUnloggedInException,
} from 'oak-domain/lib/types';
import { EntityDict } from '../../../general-app-domain';

export default OakPage({
    path: 'article:upsert',
    entity: 'article',
    projection: {
        id: 1,
        iState: 1,
        title: 1,
        author: 1,
        abstract: 1,
        content: 1,
        extraFile$entity: {
            $entity: 'extraFile',
            data: {
                id: 1,
                tag1: 1,
                origin: 1,
                bucket: 1,
                objectId: 1,
                filename: 1,
                extra1: 1,
                extension: 1,
                type: 1,
                entity: 1,
            },
            filter: {
                tag1: {
                    $in: ['cover'],
                },
            },
        },
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
            extraFile$entity: article?.extraFile$entity,
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
    methods: {
        onUnload() {
            const { editor } = this.state;
            if (editor == null) return;
            editor.destroy();
            this.setEditor(null);
        },
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
        setHtml(html: string) {
            this.setState({
                html,
            });
            if (html && html !== '<p><br></p>') {
                this.state.oakFullpath && this.setUpdateData('content', html);
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
            await this.execute(this.props.oakId ? 'update' : 'create');
            if (this.props.oakFrom === 'article:list') {
                this.navigateBack();
                return;
            }
            this.navigateBack();
        },
        async reset() {
            // 重置
            this.resetUpdateData();
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
