import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { createMenu, createConditionalMenu } from '../aspects/wechatMenu';
const triggers = [
    {
        name: '当wechatMenu更新后，执行publish',
        entity: 'wechatMenu',
        action: 'update',
        when: 'after',
        fn: async ({ operation }, context) => {
            const { data, filter } = operation;
            const [wechatMenu] = await context.select('wechatMenu', {
                data: {
                    id: 1,
                    menuConfig: 1,
                    applicationId: 1,
                    iState: 1,
                    wechatPublicTagId: 1,
                },
                filter,
            }, {});
            await context.operate('wechatMenu', {
                id: await generateNewIdAsync(),
                action: 'publish',
                data: {},
                filter: {
                    id: wechatMenu.id
                },
            }, {});
            return 1;
        },
    },
    {
        name: '当wechatMenu创建后，执行publish',
        entity: 'wechatMenu',
        action: 'create',
        when: 'after',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const [wechatMenu] = await context.select('wechatMenu', {
                data: {
                    id: 1,
                    menuConfig: 1,
                    applicationId: 1,
                    iState: 1,
                    wechatPublicTagId: 1,
                },
                filter,
            }, {});
            await context.operate('wechatMenu', {
                id: await generateNewIdAsync(),
                action: 'publish',
                data: {},
                filter: {
                    id: wechatMenu.id
                },
            }, {});
            return 1;
        },
    },
    {
        name: '当菜单发布前，构造微信菜单结构',
        entity: 'wechatMenu',
        action: 'publish',
        when: 'before',
        fn: async ({ operation }, context) => {
            const { data, filter } = operation;
            const [wechatMenu] = await context.select('wechatMenu', {
                data: {
                    id: 1,
                    menuConfig: 1,
                    applicationId: 1,
                    iState: 1,
                    wechatPublicTagId: 1,
                },
                filter,
            }, {});
            if (wechatMenu) {
                const removeSubTypeAndContent = (obj) => {
                    const { subType, content, ...newObj } = obj;
                    return newObj;
                };
                const menuConfig = wechatMenu.menuConfig.button.map((item) => {
                    if (item.sub_button && item.sub_button.length > 0) {
                        const sub_button = item.sub_button.map(removeSubTypeAndContent);
                        return { ...removeSubTypeAndContent(item), sub_button };
                    }
                    else {
                        return removeSubTypeAndContent(item);
                    }
                });
                const fn = wechatMenu.wechatPublicTagId ? createConditionalMenu : createMenu;
                try {
                    const button = {
                        button: menuConfig,
                        matchrule: wechatMenu.menuConfig.matchrule,
                    };
                    const result = await fn({
                        applicationId: wechatMenu.applicationId,
                        menuConfig: wechatMenu.wechatPublicTagId ? button : { button: menuConfig },
                    }, context);
                    data.iState = 'success';
                }
                catch (e) {
                    data.iState = 'fail';
                }
            }
            return 1;
        },
    },
];
export default triggers;
