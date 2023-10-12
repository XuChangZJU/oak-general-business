"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wechatMenu_1 = require("../aspects/wechatMenu");
const triggers = [
    // {
    //     name: '当wechatMenu更新后，执行publish',
    //     entity: 'wechatMenu',
    //     action: 'update',
    //     when: 'after',
    //     fn: async ({ operation }, context) => {
    //         const { data, filter } = operation;
    //         const [wechatMenu] = await context.select(
    //             'wechatMenu',
    //             {
    //                 data: {
    //                     id: 1,
    //                     menuConfig: 1,
    //                     applicationId: 1,
    //                     iState: 1,
    //                     wechatPublicTagId: 1,
    //                 },
    //                 filter,
    //             },
    //             {}
    //         );
    //         await context.operate(
    //             'wechatMenu',
    //             {
    //                 id: await generateNewIdAsync(),
    //                 action: 'publish',
    //                 data: {
    //                 },
    //                 filter: {
    //                     id: wechatMenu.id
    //                 },
    //             },
    //             {}
    //         );
    //         return 1;
    //     },
    // },
    // {
    //     name: '当wechatMenu创建后，执行publish',
    //     entity: 'wechatMenu',
    //     action: 'create',
    //     when: 'after',
    //     fn: async ({ operation }, context, params) => {
    //         const { data, filter } = operation;
    //         const [wechatMenu] = await context.select(
    //             'wechatMenu',
    //             {
    //                 data: {
    //                     id: 1,
    //                     menuConfig: 1,
    //                     applicationId: 1,
    //                     iState: 1,
    //                     wechatPublicTagId: 1,
    //                 },
    //                 filter,
    //             },
    //             {}
    //         );
    //         await context.operate(
    //             'wechatMenu',
    //             {
    //                 id: await generateNewIdAsync(),
    //                 action: 'publish',
    //                 data: {
    //                 },
    //                 filter: {
    //                     id: wechatMenu.id
    //                 },
    //             },
    //             {}
    //         );
    //         return 1;
    //     },
    // } as CreateTrigger<EntityDict, 'wechatMenu', RuntimeCxt>,
    // {
    //     name: '当菜单发布前，构造微信菜单结构',
    //     entity: 'wechatMenu',
    //     action: 'publish',
    //     when: 'before',
    //     fn: async ({ operation }, context) => {
    //         const { data, filter } = operation;
    //         const [wechatMenu] = await context.select(
    //             'wechatMenu',
    //             {
    //                 data: {
    //                     id: 1,
    //                     menuConfig: 1,
    //                     applicationId: 1,
    //                     iState: 1,
    //                     wechatPublicTagId: 1,
    //                 },
    //                 filter,
    //             },
    //             {}
    //         );
    //         if (wechatMenu) {
    //             const removeSubTypeAndContent = (obj: any) => {
    //                 const { subType, content, ...newObj } = obj;
    //                 return newObj;
    //             };
    //             const menuConfig = wechatMenu.menuConfig!.button.map((item: any) => {
    //                 if (item.sub_button && item.sub_button.length > 0) {
    //                     const sub_button = item.sub_button.map(
    //                         removeSubTypeAndContent
    //                     );
    //                     return { ...removeSubTypeAndContent(item), sub_button };
    //                 } else {
    //                     return removeSubTypeAndContent(item);
    //                 }
    //             });
    //             const fn = wechatMenu.wechatPublicTagId ? createConditionalMenu : createMenu
    //             try {
    //                 const button = {
    //                     button: menuConfig,
    //                     matchrule: wechatMenu.menuConfig!.matchrule,
    //                 };
    //                 const result = await fn({
    //                     applicationId: wechatMenu.applicationId!,
    //                     menuConfig: wechatMenu.wechatPublicTagId ? button : { button: menuConfig },
    //                 }, context);
    //                 data.iState = 'success';
    //             } catch (e) {
    //                 data.iState = 'fail';
    //             }
    //         }
    //         return 1;
    //     },
    // },
    {
        name: '在删除微信公众号个性化菜单前，调用微信删除接口',
        entity: 'wechatMenu',
        action: 'remove',
        when: 'before',
        fn: async (event, context) => {
            const { operation: { data, filter }, } = event;
            const [wechatMenu] = await context.select('wechatMenu', {
                data: {
                    id: 1,
                    menuConfig: 1,
                    menuId: 1,
                    applicationId: 1,
                },
                filter,
            }, {});
            try {
                const result = await (0, wechatMenu_1.deleteConditionalMenu)({ applicationId: wechatMenu.applicationId, menuId: wechatMenu.menuId }, context);
            }
            catch (e) {
                throw e;
            }
            return 1;
        },
    },
];
exports.default = triggers;
