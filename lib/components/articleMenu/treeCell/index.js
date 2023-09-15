"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("oak-domain/lib/utils/uuid");
exports.default = OakComponent({
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
        onRemove: () => undefined,
        onUpdateName: async (name) => undefined,
        onChildEditArticleChange: (data) => undefined,
        show: '',
        getBreadcrumbItemsByParent: (breadcrumbItems) => undefined,
        breadItems: [],
        drawerOpen: false,
        changeDrawerOpen: (open) => undefined,
        selectedArticleId: '',
        openArray: [],
        getTopInfo: (data) => undefined,
        articleId: '',
        articleMenuId: '',
        getSideInfo: (data) => undefined,
        currentArticle: '',
        setCurrentArticle: (id) => undefined,
    },
    formData({ data: row }) {
        const { articleMenu$parent, article$articleMenu } = row || {};
        const allowCreateSubMenu = article$articleMenu && article$articleMenu.length === 0;
        const allowCreateSubArticle = articleMenu$parent && articleMenu$parent.length === 0;
        const allowRemove = allowCreateSubMenu && allowCreateSubArticle;
        const logo = this.features.extraFile.getUrl(row?.extraFile$entity?.find((ele) => ele.tag1 === 'logo'));
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
        async createSubArticle(name) {
            const id = await (0, uuid_1.generateNewIdAsync)();
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
        async createSubArticleMenu(name) {
            const { row } = this.state;
            this.update({
                articleMenu$parent: [
                    {
                        id: await (0, uuid_1.generateNewIdAsync)(),
                        action: 'create',
                        data: {
                            id: await (0, uuid_1.generateNewIdAsync)(),
                            name,
                            entity: row.entity,
                            entityId: row.entityId,
                            isArticle: false,
                            isLeaf: false,
                        },
                    }
                ]
            });
            await this.execute();
        },
        gotoDoc(articleMenuId) {
            window.open(`/article/doc?articleMenuId=${articleMenuId}`);
        }
    }
});
