export default OakComponent({
    isList: true,
    entity: 'wechatMenu',
    projection: {
        id: 1,
        menuConfig: 1,
        applicationId: 1,
        application: {
            id: 1,
            type: 1,
            config: 1,
        },
        publishState: 1,
        wechatPublicTagId: 1,
        menuId: 1,
    },
    formData({ data: rows }) {
        return {
            id: rows?.[0]?.id,
            config: rows?.[0]?.menuConfig,
            menuId: rows?.[0]?.menuId,
        };
    },
    properties: {
        applicationId: '',
        tagId: '',
        menuType: '',
    },
    lifetimes: {
        async ready() {
            const { applicationId, tagId } = this.props;
            const [conditionalmenu] = this.features.cache.get('wechatMenu', {
                data: {
                    id: 1,
                    menuConfig: 1,
                    menuId: 1,
                    wechatPublicTagId: 1,
                    applicationId: 1,
                    publishState: 1,
                },
                filter: {
                    applicationId,
                    wechatPublicTagId: tagId
                }
            });
            if (!conditionalmenu) {
                this.addItem({
                    wechatPublicTagId: tagId,
                    menuConfig: { button: [], matchrule: { tag_id: tagId } }
                });
            }
        }
    },
    filters: [
        {
            filter() {
                const { applicationId, tagId } = this.props;
                return {
                    applicationId,
                    wechatPublicTagId: tagId
                };
            }
        },
    ],
    methods: {},
});
