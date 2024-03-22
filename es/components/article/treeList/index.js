export default OakComponent({
    entity: 'article',
    isList: true,
    properties: {
        articleMenuId: '',
        onChildEditArticleChange: (data) => undefined,
        show: '',
        getBreadcrumbItemsByParent: (breadcrumbItems) => undefined,
        breadcrumbItems: [],
        drawerOpen: false,
        changeDrawerOpen: (open) => undefined,
        selectedArticleId: '',
        openArray: [],
        getTopInfo: (data) => undefined,
        articleId: '',
        currentArticle: '',
        setCurrentArticle: (id) => undefined,
    },
    projection: {
        id: 1,
        name: 1,
        articleMenuId: 1,
    },
    filters: [
        {
            filter() {
                const { articleMenuId } = this.props;
                return {
                    articleMenuId,
                };
            }
        }
    ],
    formData({ data: rows }) {
        console.log(rows);
        return {
            rows,
        };
    },
    methods: {
        async createOne() {
            const { articleMenuId } = this.props;
            this.addItem({
                name: '文章标题',
                content: '',
                articleMenuId,
            });
            await this.execute();
        },
    }
});
