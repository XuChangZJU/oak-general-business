export default OakComponent({
    entity: 'articleMenu',
    projection: {
        id: 1,
        name: 1,
        isArticle: 1,
        isLeaf: 1,
        parent: {
            id: 1,
            name: 1,
        },
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
                    $in: ['logo'],
                },
            },
        },
    },
    isList: false,
    formData({ data: articleMenu, features }) {
        return {
            isArticle: articleMenu?.isArticle,
            isLeaf: articleMenu?.isLeaf,
            name: articleMenu?.name,
            parentId: articleMenu?.parent?.id,
            parentName: articleMenu?.parent?.name,
            logo: features.extraFile.getUrl(
                articleMenu?.extraFile$entity?.find(
                    (ele) => ele.tag1 === 'logo'
                )
            ),
        };
    },
    filters: [],
    lifetimes: {},
    properties: {
      entity: '', 
      entityId: ''
    },
    methods: {
        goUpsert(id: string) {
            this.navigateTo({
                url: '/articleMenu/upsert',
                oakId: id,
            });
        },
        gotoEditByParentId(parentId?: string) {
           const { entity, entityId } = this.props;
            this.navigateTo({
                url: '/articleMenu/upsert',
                parentId,
                entity,
                 entityId
            });
        },
        gotoArticleEdit(articleId: string) {
            this.navigateTo({
                url: '/article/upsert',
                oakId: articleId,
            });
        },
        gotoArticleEditByArticleMenuId(articleMenuId: string) {
            this.navigateTo({
                url: '/article/upsert',
                articleMenuId,
            });
        },
        async onRemoveArticleMenu(id: string) {
          await this.execute('remove');
      },
    },
});
