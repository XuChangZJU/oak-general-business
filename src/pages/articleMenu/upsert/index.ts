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
    formData({ data: articleMenu }) {
        return {
            name: articleMenu?.name,
            parentId: articleMenu?.parent?.id,
            parentName: articleMenu?.parent?.name,
        };
    },
    filters: [],
    lifetimes: {
        async ready() {
            const { parentId, oakId } = this.props;
            if (!oakId) {
                if (parentId) {
                    this.update({
                        parentId,
                        entity: 'platformProvider',
                        entityId:
                            this.features.application.getApplication()?.system!
                                .platform?.entityId!,
                        isArticle: false,
                        isLeaf: false,
                    });
                } else {
                    this.update({
                        entity: 'platformProvider',
                        entityId:
                            this.features.application.getApplication()?.system!
                                .platform?.entityId!,
                        isArticle: false,
                        isLeaf: false,
                    });
                }
            }
        },
    },
    methods: {
        async confirm() {
            if (!this.state.name) {
                this.setMessage({
                    type: 'error',
                    content: '请输入文章分类名称',
                });
                return;
            }
            await this.execute();
            this.navigateBack();
        },
        reset() {
            this.clean();
        },
    },
});
