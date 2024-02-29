export default OakComponent({
    entity: 'article',
    isList: true,
    properties: {
        articleMenuId: '' as string | undefined,
        onChildEditArticleChange: (data: string) => undefined as void,
        show: '',
        getBreadcrumbItemsByParent: (breadcrumbItems: string[]) => undefined as void,
        breadcrumbItems: [] as string[],
        drawerOpen: false,
        changeDrawerOpen: (open:boolean) => undefined as void,
        selectedArticleId: '',
        openArray: [] as string[],
        getTopInfo: (data: {name: string, date: number}) => undefined as void,
        articleId: '',
        currentArticle: '',
        setCurrentArticle: (id: string) => undefined as void,
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
})