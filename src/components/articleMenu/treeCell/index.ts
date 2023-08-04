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
                name: 1,
            },
            indexFrom: 0, 
            count: 1,
        },
    },
    properties: {
        onRemove: () => undefined as void,
        onUpdateName: async (name: string) => undefined as void,
        onChildEditArticleChange: (data: string) => undefined as void,
        show: '',
        getBreadcrumbItemsByParent: (breadcrumbItems: string[]) => undefined as void,
        breadItems: [] as string[],
        drawerOpen: false,
        changeDrawerOpen: (open:boolean) => undefined as void,
        selectedArticleId: '',
        openArray: [] as string[],
    },
    formData({ data: row }) {
        const { articleMenu$parent, article$articleMenu } = row || {};
        const allowCreateSubMenu = article$articleMenu && article$articleMenu.length === 0;
        const allowCreateSubArticle = articleMenu$parent && articleMenu$parent.length === 0;
        const allowRemove = allowCreateSubMenu && allowCreateSubArticle;
        const logo = this.features.extraFile.getUrl(
            row?.extraFile$entity?.find((ele) => ele.tag1 === 'logo')
        )
        return {
            row,
            allowCreateSubMenu,
            allowCreateSubArticle,
            allowRemove,
            logo,
            article$articleMenu,
        };
    },
    data: {
        editArticle: '',
    },
    methods: {
        async createSubArticle(name: string) {
            const id = await generateNewIdAsync();
            this.setState({
                editArticle: '',
            });
            this.update({
                article$articleMenu: [{
                    id,
                    action: 'create',
                    data: {
                        id,
                        name,
                        content: '',
                    }
                }]
            });
            await this.execute();
            this.setState({
                editArticle: id
            });
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
        },
        gotoDoc(articleMenuId: string) {
            window.open(`/article/doc?articleMenuId=${articleMenuId}`);
        }
    }
});