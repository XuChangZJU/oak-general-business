export default OakComponent({
    entity: 'article',
    isList: false,
    projection: {
        id: 1,
        name: 1,
        content: 1,
        articleMenu: {
            id: 1,
            name: 1,
            isArticle: 1,
            isLeaf: 1,
        },
    },
    formData: function ({ data: article }) {
        return {
            content: article?.content,
            name: article?.name,
        };
    },
    methods: {
        async onRemoveArticle(id: string) {
          this.remove();
          await this.execute();
        },
        gotoArticleEdit(articleId: string) {
            this.navigateTo({
                url: '/article/upsert',
                oakId: articleId,
            });
        },
        gotoPreview(content: string, title: string, articleId: string) {
            this.save(
                'article_html',
                JSON.stringify({
                    content,
                    title,
                    articleId,
                })
            );
            window.open(`/article/preview?oakId=${articleId}`);
        },
    },
});
