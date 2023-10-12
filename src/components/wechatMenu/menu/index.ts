import { WechatMpInstance, WechatPublicInstance, WechatSDK } from 'oak-external-sdk';
import { WechatMpConfig, WechatPublicConfig } from '../../../oak-app-domain/Application/Schema';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
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
                }
            },
        },
    ],
    properties: {
        applicationId: '',
        menuId: '',
        menuType: '',
        tabKey: '',
    },
    lifetimes: {
        async ready() {
            const { menuId, applicationId } = this.props;
            if (!menuId) {
                const menuConfig = await this.features.wechatMenu.getMenu({ applicationId: applicationId! });
                this.addItem({
                    menuConfig: { button: menuConfig.menu.button },
                    applicationId,
                    iState: 'wait',
                    menuId: menuConfig.menu.menuid
                });
            }
        }
    },
    methods: {
        async create() {
            const { applicationId } = this.props;
            const { id, config } = this.state;
            await this.execute();
            await this.features.wechatMenu.createMenu({applicationId: applicationId!, id: id!, menuConfig: config!});
            await this.refresh();
        }
    },
});