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
        iState: 1,
        wechatPublicTagId: 1,
        menuId: 1,
    },
    actions: ['publish'],
    formData({ data: rows }) {
        return {
            id: rows?.[0]?.id,
            config: rows?.[0]?.menuConfig,
            totalConfig: rows?.[0]?.menuConfig,
            iState: rows?.[0]?.iState,
        };
    },
    filters: [
        {
            filter() {
                const { applicationId } = this.props;
                return {
                    applicationId,
                    wechatPublicTagId: {
                        $exists: false
                    }
                };
            },
        },
    ],
    properties: {
        applicationId: '',
        menuId: '',
        menuType: '',
    },
    lifetimes: {
        async ready() {
            const { menuId, applicationId } = this.props;
            if (!menuId) {
                const menuConfig = await this.features.wechatMenu.getMenu({ applicationId: applicationId });
                this.addItem({
                    menuConfig: { button: menuConfig.menu.button },
                    applicationId,
                    iState: 'wait',
                    menuId: menuConfig.menu.menuid
                });
            }
        }
    },
    methods: {},
});
