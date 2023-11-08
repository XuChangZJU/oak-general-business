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
        // iState: 1,
        // title: 1,
        // author: 1,
        // abstract: 1,
        content: 1,
        entity: 1,
        entityId: 1,
    },
    isList: false,
    formData: function ({ data: article, features }) {
        return {
            id: article?.id,
            // iState: article?.iState,
            // title: article?.title,
            // abstract: article?.abstract,
            // author: article?.author,
            content: article?.content,
        };
    },
    data: {
        editor: null as IDomEditor | null,
        html: '',
        origin: 'qiniu',
        contentTip: false,
    },
    listeners: {
        'editor,content'(prev, next) {
            if (next.editor && next.content) {
                next.editor.setHtml(next.content);
            }
        },
    },
    lifetimes: {
        ready() {
            const { entityId, entity, oakId } = this.props;
            if (!oakId) {
                this.update({
                    entityId,
                    entity,
                });
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
        async addExtraFile(
            extraFile: EntityDict['extraFile']['CreateSingle']['data']
        ) {
            try {
                const result = await this.features.cache.operate('extraFile', {
                    action: 'create',
                    data: extraFile,
                    id: generateNewId(),
                });
                return result;
            } catch (error) {
                // if (
                //     (<OakException>error).constructor.name ===
                //     OakUnloggedInException.name
                // ) {
                //     this.navigateTo(
                //         {
                //             url: '/login',
                //         },
                //         undefined,
                //         true
                //     );
                //     return;
                // }
                throw error;
            }
        },

        uploadFile(extraFile: EntityDict['extraFile']['CreateSingle']['data']) {
            return this.features.extraFile.autoUpload(
                extraFile as EntityDict['extraFile']['OpSchema'],
                extraFile.extra1!
            );
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
        async confirm() {
            await this.execute();
            this.navigateBack();
        },
        async reset() {
            // 重置
            this.clean();
        },
        setHtml(content: string) {
            this.update({ content });
            this.setState({ html: content });
        },
        preview() {
            // const { html, title, author } = this.state;
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
    },
});
