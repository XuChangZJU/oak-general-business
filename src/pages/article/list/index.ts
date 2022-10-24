import { OpSchema as ExtraFile } from '../../../general-app-domain/ExtraFile/Schema';
import { composeFileUrl } from '../../../utils/extraFile';

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
    isList: true,
    formData: async function ({ data: articles, features }) {
        const application = await features.application.getApplication();
        const filter = await this.getFilterByName('title');
        const pagination = this.getPagination();

        return {
            articles: articles?.map((article, index: number) => {
                return {
                    id: article?.id,
                    iState: article?.iState,
                    title: article?.title,
                    abstract: article?.abstract,
                    author: article?.author,
                    content: article?.content,
                };
            }),
            pagination,
            searchValue: (filter?.title as { $includes: string })?.$includes,
        };
    },
    // filters: [],
    // sorters: [],
    methods: {
        goUpsert() {
            this.navigateTo({
                url: '/article/upsert',
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
                }
            });
            await this.execute();
        },
        async searchChange(event: any) {
            const { value } = this.resolveInput(event);
            this.searchValueChange(value);
        },
        async searchValueChange(value: string) {
            this.addNamedFilter({
                filter: {
                    title: {
                        $includes: value!,
                    },
                },
                '#name': 'title',
            });
        },
        async searchCancel() {
            this.removeNamedFilterByName('title');
        },
        async searchConfirm() {
            this.refresh();
        },
    },
});
