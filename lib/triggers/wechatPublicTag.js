"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("oak-domain/lib/utils/uuid");
const wechatPublicTag_1 = require("../aspects/wechatPublicTag");
const types_1 = require("oak-domain/lib/types");
const wechatPublicException_1 = require("../utils/wechatPublicException");
const triggers = [
    // {
    //     name: '当wechatPublicTag更新后，执行sync',
    //     entity: 'wechatPublicTag',
    //     action: 'update',
    //     when: 'after',
    //     fn: async ({ operation }, context) => {
    //         const { data, filter } = operation;
    //         const [wechatPublicTag] = await context.select(
    //             'wechatPublicTag',
    //             {
    //                 data: {
    //                     id: 1,
    //                     sync: 1,
    //                 },
    //                 filter,
    //             },
    //             {}
    //         );
    //         await context.operate(
    //             'wechatPublicTag',
    //             {
    //                 id: await generateNewIdAsync(),
    //                 action: 'sync',
    //                 data: {
    //                 },
    //                 filter: {
    //                     id: wechatPublicTag.id
    //                 },
    //             },
    //             {}
    //         );
    //         return 1;
    //     },
    // },
    // {
    //     name: '当wechatPublicTag创建后，执行sync',
    //     entity: 'wechatPublicTag',
    //     action: 'create',
    //     when: 'after',
    //     fn: async ({ operation }, context, params) => {
    //         const { data, filter } = operation;
    //         const [wechatPublicTag] = await context.select(
    //             'wechatPublicTag',
    //             {
    //                 data: {
    //                     id: 1,
    //                 },
    //                 filter,
    //             },
    //             {}
    //         );
    //         await context.operate(
    //             'wechatPublicTag',
    //             {
    //                 id: await generateNewIdAsync(),
    //                 action: 'sync',
    //                 data: {
    //                 },
    //                 filter: {
    //                     id: wechatPublicTag.id
    //                 },
    //             },
    //             {}
    //         );
    //         return 1;
    //     },
    // } as CreateTrigger<EntityDict, 'wechatPublicTag', RuntimeCxt>,
    {
        name: '在删除微信公众号标签前，调用微信删除接口同时删除关联的userWechatPublic和wechatMenu',
        entity: 'wechatPublicTag',
        action: 'remove',
        when: 'before',
        fn: async (event, context) => {
            const { operation: { data, filter }, } = event;
            const [wechatPublicTag] = await context.select('wechatPublicTag', {
                data: {
                    id: 1,
                    wechatId: 1,
                    applicationId: 1,
                },
                filter,
            }, {});
            try {
                const result = await (0, wechatPublicTag_1.deleteTag)({
                    applicationId: wechatPublicTag.applicationId,
                    id: wechatPublicTag.id,
                    wechatId: wechatPublicTag.wechatId,
                }, context);
                await context.operate('userWechatPublicTag', {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    action: 'remove',
                    data: {},
                    filter: {
                        wechatPublicTagId: filter.id,
                    },
                }, {});
                await context.operate('userWechatPublicTag', {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    action: 'remove',
                    data: {},
                    filter: {
                        wechatPublicTagId: filter.id,
                    },
                }, {});
            }
            catch (e) {
                throw new types_1.OakPreConditionUnsetException(`${(0, wechatPublicException_1.handleException)(e)}`);
            }
            return 1;
        },
    },
    // {
    //     name: '当标签发布前，同步',
    //     entity: 'wechatPublicTag',
    //     action: 'sync',
    //     when: 'before',
    //     fn: async ({ operation }, context) => {
    //         const { data, filter } = operation;
    //         const [wechatPublicTag] = await context.select(
    //             'wechatPublicTag',
    //             {
    //                 data: {
    //                     id: 1,
    //                     sync: 1,
    //                     syncAt: 1,
    //                     wechatId: 1,
    //                     applicationId: 1,
    //                     text: 1,
    //                 },
    //                 filter,
    //             },
    //             {}
    //         );
    //         assert(wechatPublicTag);
    //         try {
    //             const { tags } = await getTags({
    //                 applicationId: wechatPublicTag.applicationId!
    //             }, context);
    //             if(!wechatPublicTag.wechatId) {
    //                 try {
    //                     const result = await createTag({
    //                         applicationId: wechatPublicTag.applicationId!,
    //                         name: wechatPublicTag.text!,
    //                     }, context);
    //                     data.sync = true;
    //                     data.syncAt = Date.now();
    //                     data.wechatId = result.tag.id;
    //                     data.iState = 'success';
    //                 } catch(e) {
    //                     data.sync = false;
    //                     data.iState = 'fail';
    //                     // throw new OakPreConditionUnsetException(`${handleException(e as string)}`);
    //                 }
    //             } 
    //             if(wechatPublicTag.wechatId && tags.find((ele: Tag) => ele.id === wechatPublicTag.wechatId && ele.name !== wechatPublicTag.text)) {
    //                 try {
    //                     const result = await editTag({
    //                         applicationId: wechatPublicTag.applicationId!,
    //                         id: wechatPublicTag.wechatId!,
    //                         name: wechatPublicTag.text!,
    //                     }, context);
    //                     data.sync = true;
    //                     data.syncAt = Date.now();
    //                     data.iState = 'success';
    //                 } catch(e) {
    //                     data.sync = false;
    //                     data.syncAt = Date.now();
    //                     data.iState = 'fail';
    //                     // throw new OakPreConditionUnsetException(`${handleException(e as string)}`);
    //                 }
    //             } 
    //             if(wechatPublicTag.wechatId && tags.find((ele: Tag) => ele.id === wechatPublicTag.wechatId && ele.name === wechatPublicTag.text)) {
    //                 try {
    //                     const result = await deleteTag({
    //                         applicationId: wechatPublicTag.applicationId!,
    //                         id: wechatPublicTag.id!,
    //                         wechatId: wechatPublicTag.wechatId!,
    //                     }, context);
    //                     data.sync = true;
    //                     data.syncAt = Date.now();
    //                     data.iState = 'success';
    //                 } catch(e) {
    //                     data.sync = false;
    //                     data.syncAt = Date.now();
    //                     data.iState = 'fail';
    //                     // throw new OakPreConditionUnsetException(`${handleException(e as string)}`);
    //                 }
    //             } 
    //         } catch (e) {
    //             throw new OakPreConditionUnsetException(`${handleException(e as string)}`);
    //         }
    //         return 1;
    //     },
    // },
];
exports.default = triggers;
