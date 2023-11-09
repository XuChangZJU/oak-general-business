
export default OakComponent({
    entity: 'article',
    projection: {
        id: 1,
        iState: 1,
        title: 1,
        author: 1,
        abstract: 1,
        content: 1,
        entity: 1,
        entityId: 1,
    },
    isList: true,
    formData: function ({ data: articles, features }) {
        const filter = this.getFilterByName('title');
        const pagination = this.getPagination();

        return {
            articles: articles?.map((article, index: number) => {
                return {
                    id: article?.id,
                    // iState: article?.iState,
                    // title: article?.title,
                    // abstract: article?.abstract,
                    // author: article?.author,
                    content: article?.content,
                    // entity: article?.entity,
                    // entityId: article?.entityId,
                };
            }),
            pagination,
            // searchValue: (filter?.title as { $includes: string })?.$includes,
        };
    },
    filters: [
        // 由调用者注入oakFilter
        // {
        //     filter() {
        //         const { entityId, entity } = this.props;
        //         return {
        //             entityId,
        //             entity,
        //         };
        //     },
        // },
    ],
    // sorters: [],
    methods: {
        goUpsert() {
            const { entityId, entity } = this.props;
            this.navigateTo({
                url: '/article/upsert',
                entityId,
                entity,
            });
        },
        goUpsertById(id: string) {
            this.navigateTo({
                url: '/article/upsert',
                oakId: id,
            });
        },
        goDetailById(id: string) {
            this.navigateTo({
                url: '/article/detail',
                oakId: id,
            });
        },
        async onRemove(id: string) {
            await this.addOperation({
                action: 'remove',
                data: {},
                filter: {
                    id,
                },
            });
            await this.execute();
        },
        async searchChange(event: any) {
            const { value } = this.resolveInput(event);
            this.searchValueChange(value);
        },
        async searchValueChange(value: string) {
            // this.addNamedFilter({
            //     filter: {
            //         title: {
            //             $includes: value!,
            //         },
            //     },
            //     '#name': 'title',
            // });
        },
        async searchCancel() {
            this.removeNamedFilterByName('title');
        },
        async searchConfirm() {
            this.refresh();
        },
    },
});
