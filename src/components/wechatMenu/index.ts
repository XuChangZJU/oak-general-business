import { WechatMpInstance, WechatPublicInstance, WechatSDK } from 'oak-external-sdk';
import { WechatMpConfig, WechatPublicConfig } from '../../oak-app-domain/Application/Schema';
export default OakComponent({
    isList: true,
    properties: {
        applicationId: '',
        isPlatform: false,
    },
    lifetimes: {
        async ready() {
            const { applicationId } = this.props;
            const result = await this.features.wechatMenu.getCurrentMenu({ applicationId: applicationId! });
            if (result.is_menu_open === 1) {
                const { data: wechatMenu } = await this.features.cache.refresh(
                    'wechatMenu',
                    {
                        data: {
                            id: 1,
                            applicationId: 1,
                            wechatPublicTagId: 1,
                        },
                        filter: {
                            applicationId,
                            wechatPublicTagId: {
                                $exists: false
                            }
                        }
                    }
                );
                if (wechatMenu && wechatMenu[0]) {
                    this.setState({
                        menuId: wechatMenu[0].id,
                    });
                }
                this.setState({
                    is_menu_open: true,
                    applicationId,
                });
            } else {
                this.setState({
                    is_menu_open: false,
                });
            }
        }
    },
    methods: {
    },
});