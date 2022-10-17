import { OpSchema as ExtraFile } from '../../../general-app-domain/ExtraFile/Schema';
import { composeFileUrl } from '../../../utils/extraFile';

export default OakPage({
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
    isList: true,
    formData: async function ({ data: articles, features }) {
        const application = await features.application.getApplication();
        const filter = await this.getFilterByName('title');
        const pagination = this.getPagination();

        return {
            articles: articles?.map((article, index: number) => {
                const extraFile$entity =
                    article?.extraFile$entity as Array<ExtraFile>;
                const coverPictures = extraFile$entity
                    ?.filter((ele: ExtraFile) => ['cover'].includes(ele.tag1))
                    .map((ele: ExtraFile) =>
                        composeFileUrl(
                            ele as Pick<
                                ExtraFile,
                                | 'type'
                                | 'bucket'
                                | 'filename'
                                | 'origin'
                                | 'extra1'
                                | 'objectId'
                                | 'extension'
                                | 'entity'
                            >,
                            application?.system?.config
                        )
                    );
                return {
                    id: article?.id,
                    iState: article?.iState,
                    title: article?.title,
                    abstract: article?.abstract,
                    author: article?.author,
                    content: article?.content,
                    coverPicture: coverPictures?.[0],
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
        onRemove(path: string) {
            this.execute('remove', [], path);
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
