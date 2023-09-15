"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("oak-domain/lib/utils/uuid");
exports.default = OakComponent({
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
        editor: null,
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
            if (editor == null)
                return;
            editor.destroy();
            this.setEditor(null);
        },
    },
    methods: {
        async addExtraFile(extraFile) {
            try {
                const result = await this.features.cache.operate('extraFile', {
                    action: 'create',
                    data: extraFile,
                    id: (0, uuid_1.generateNewId)(),
                });
                return result;
            }
            catch (error) {
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
        uploadFile(extraFile) {
            return this.features.extraFile.createAndUpload(extraFile);
        },
        setEditor(editor) {
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
        setHtml(content) {
            this.update({ content });
            this.setState({ html: content });
        },
        preview() {
            // const { html, title, author } = this.state;
            const { html } = this.state;
            this.save('article_html', JSON.stringify({
                content: html,
                // author,
                // title,
            }));
            window.open('/article/preview');
        },
    },
});
