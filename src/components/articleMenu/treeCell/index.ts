import { generateNewId, generateNewIdAsync } from "oak-domain/lib/utils/uuid";

export default OakComponent({
    entity: 'articleMenu',
    isList: false,
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
    properties: {
        onRemove: () => undefined as void,
        onUpdateName: async (name: string) => undefined as void,
    },
    formData({ data: row }) {
        const { articleMenu$parent, article$articleMenu } = row || {};
        const allowCreateSubMenu = article$articleMenu && article$articleMenu.length === 0;
        const allowCreateSubArticle = articleMenu$parent && articleMenu$parent.length === 0;
        const allowRemove = allowCreateSubMenu && allowCreateSubArticle;

        return {
            row,
            allowCreateSubMenu,
            allowCreateSubArticle,
            allowRemove,
        };
    },
    methods: {
        async createSubArticle(name: string) {
            this.update({
                article$articleMenu: [{
                    id: await generateNewIdAsync(),
                    action: 'create',
                    data: {
                        id: await generateNewIdAsync(),
                        name,
                        content: '',
                    }
                }]
            });
            await this.execute();
        },
        async createSubArticleMenu(name: string) {
            const { row } = this.state;
            this.update({
                articleMenu$parent: [
                    {
                        id: await generateNewIdAsync(),
                        action: 'create',
                        data: {
                            id: await generateNewIdAsync(),
                            name,
                            entity: row!.entity,
                            entityId: row!.entityId,
                            isArticle: false,
                            isLeaf: false,
                        },
                    }
                ]
            });
            await this.execute();
        }
    }
});