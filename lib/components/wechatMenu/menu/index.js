"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
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
            totalConfig: rows?.[0]?.menuConfig,
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
        }
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
                console.log(menuConfig);
                this.addItem({
                    menuConfig: { button: menuConfig.menu.button },
                    applicationId,
                    publishState: 'wait',
                    menuId: menuConfig.menu.menuid
                });
            }
        }
    },
    methods: {},
});
