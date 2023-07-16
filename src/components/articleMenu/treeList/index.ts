export default OakComponent({
    entity: 'articleMenu',
    isList: true,
    properties: {
        entity: '',
        entityId: '',
        parentId: '' as string | undefined,
    },
    projection: {
        id: 1,
        name: 1,
        entity: 1,
        entityId: 1,
        parentId: 1,
        isArticle: 1,
        articleMenu$parent: {
            $entity: 'articleMenu',
            data: {
                id: 1,
            },
            indexFrom: 0, 
            count: 1,
        },
        article$articleMenu: {
            $entity: 'article',
            data: {
                id: 1,
            },
            indexFrom: 0, 
            count: 1,
        },
    },
    filters: [
        {
            filter() {
                const { entity, entityId, parentId } = this.props;
                if (parentId) {
                    return {
                        entity,
                        entityId,
                        parentId,
                    };
                }
                return {
                    entity,
                    entityId,
                    parentId: {
                        $exists: false,
                    },
                };
            }            
        }
    ],
    formData({ data: rows }) {
        return {
            rows,
        };
    },
    methods: {
        async createOne(name: string) {
            const { entity, entityId, parentId } = this.props;
            this.addItem({
                name,
                entity,
                entityId,
                parentId,
                isArticle: false,
                isLeaf: false,      // 这个属性没用了，但声明成not null了(todo)
            });
            await this.execute();
        }
    }
})