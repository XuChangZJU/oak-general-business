export default OakComponent({
    isList: true,
    entity: 'wechatMenu',
    projection: {
        id: 1,
        menuConfig: 1,
        applicationId: 1,
        iState: 1,
        wechatPublicTagId: 1,
        menuId: 1,
    },
    formData({ data: rows }) {
        return {
            id: rows?.[0]?.id,
            config: rows?.[0]?.menuConfig,
            menuId: rows?.[0]?.menuId,
            iState: rows?.[0]?.iState,
        };
    },
    properties: {
        applicationId: '',
        tagId: '',
        wechatId: '',
        menuType: '',
        tabKey: '',
    },
    lifetimes: {
        async ready() {
            const { applicationId, tagId, wechatId } = this.props;
            const { data: conditionalmenu } = await this.features.cache.refresh('wechatMenu', {
                data: {
                    id: 1,
                    menuConfig: 1,
                    menuId: 1,
                    wechatPublicTagId: 1,
                    applicationId: 1,
                    iState: 1,
                },
                filter: {
                    applicationId,
                    wechatPublicTagId: tagId
                }
            });
            if (!conditionalmenu[0]) {
                this.addItem({
                    wechatPublicTagId: tagId,
                    menuConfig: { button: [], matchrule: { tag_id: wechatId } },
                    applicationId,
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
    methods: {
        async create() {
            const { applicationId } = this.props;
            const { id, config } = this.state;
            await this.execute();
            await this.features.wechatMenu.createConditionalMenu({ applicationId: applicationId, id: id, menuConfig: config });
            await this.refresh();
        },
        async remove() {
            const { id } = this.state;
            this.removeItem(id);
            await this.execute();
        }
    },
});
