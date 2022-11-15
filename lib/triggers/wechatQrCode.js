"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var triggers = [
// {
//     name: '选择wechatQrCode时，动态生成需要的数据',
//     entity: 'wechatQrCode',
//     action: 'select',
//     when: 'after',
//     fn: async ({ result }, context, params) => {
//         // 生成需要的数据 移到aspect了 创建wechatQrcode 直接生成 
//         let count = 0;
//         // const application = await context.getApplication();
//         // const { type: appType, config } = application!;
//         // if (appType !== 'wechatMp' && config!.type !== 'wechatMp') {
//         // } else {
//         //     assert(appType === 'wechatMp' || config!.type === 'wechatMp');
//         //     const config2 = config as WechatMpConfig;
//         //     const { appId, appSecret } = config2;
//         //     for (const code of result) {
//         //         const { type, expired, id } = code;
//         //         if (
//         //             type === 'wechatMpWxaCode' &&
//         //             code.hasOwnProperty('buffer')
//         //         ) {
//         //             // 小程序码去实时获取（暂时不考虑缓存）
//         //             const wechatInstance = WechatSDK.getInstance(
//         //                 appId,
//         //                 appSecret,
//         //                 'wechatMp'
//         //             ) as WechatMpInstance;
//         //             const buffer = await wechatInstance.getMpUnlimitWxaCode(
//         //                 {
//         //                     scene: shrinkUuidTo32Bytes(id),
//         //                     page: 'pages/index/index', // todo，这里用其它的页面微信服务器拒绝，因为没发布。应该是 pages/wechatQrCode/scan/index
//         //                 }
//         //             );
//         //             // 把arrayBuffer转成字符串返回
//         //             const str = String.fromCharCode(
//         //                 ...new Uint8Array(buffer)
//         //             );
//         //             Object.assign(code, {
//         //                 buffer: str,
//         //             });
//         //             count++;
//         //         } else if (expired && code.hasOwnProperty('url')) {
//         //             // 如果过期了，在这里生成新的临时码并修改值（公众号）
//         //             throw new Error('not implemented yet');
//         //         }
//         //     }
//         // }
//             for (const code of result) {
//                 const { type, expired, id, applicationId } = code;
//                 const {
//                     result: [application],
//                 } = await context.rowStore.select(
//                     'application',
//                     {
//                         data: {
//                             id: 1,
//                             name: 1,
//                             config: 1,
//                             description: 1,
//                             type: 1,
//                             systemId: 1,
//                         },
//                         filter: {
//                             id: applicationId,
//                         },
//                         indexFrom: 0,
//                         count: 1,
//                     },
//                     context,
//                     {
//                         dontCollect: true,
//                     }
//                 );
//                 assert(application);
//                 const { type: appType, config } = application;
//                 switch (type) {
//                     case 'wechatMpWxaCode': {
//                         assert(
//                             appType === 'wechatMp' &&
//                                 config!.type === 'wechatMp'
//                         );
//                         const config2 = config as WechatMpConfig;
//                         const { appId, appSecret } = config2;
//                         // 小程序码去实时获取（暂时不考虑缓存）
//                         const wechatInstance = WechatSDK.getInstance(
//                             appId,
//                             appSecret,
//                             'wechatMp'
//                         ) as WechatMpInstance;
//                         const buffer =
//                             await wechatInstance.getMpUnlimitWxaCode({
//                                 scene: shrinkUuidTo32Bytes(id),
//                                 page: 'pages/index/index', // todo，这里用其它的页面微信服务器拒绝，因为没发布。应该是 pages/wechatQrCode/scan/index
//                             });
//                         // 把arrayBuffer转成字符串返回
//                         const str = String.fromCharCode(
//                             ...new Uint8Array(buffer)
//                         );
//                         Object.assign(code, {
//                             buffer: str,
//                         });
//                         count++;
//                         break;
//                     }
//                     case 'wechatPublic': {
//                         assert(
//                             appType === 'wechatPublic' &&
//                                 config!.type === 'wechatPublic'
//                         );
//                         const config2 = config as WechatPublicConfig;
//                         const { appId, appSecret } = config2;
//                         const wechatInstance = WechatSDK.getInstance(
//                             appId,
//                             appSecret,
//                             'wechatPublic'
//                         ) as WechatPublicInstance;
//                         const result = await wechatInstance.getQrCode({
//                             sceneStr: shrinkUuidTo32Bytes(id),
//                             isPermanent: false,
//                             expireSeconds: 2592000,
//                         });
//                         Object.assign(code, {
//                             ticket: result?.ticket,
//                             url: result?.url,
//                         });
//                         count++;
//                         break;
//                     }
//                     case 'wechatMpDomainUrl': {
//                         break;
//                     }
//                     default: {
//                         assert(false, `未实现的${type}`);
//                     }
//                 }
//             }
//         return count;
//     }
// } as SelectTriggerAfter<EntityDict, 'wechatQrCode', RuntimeContext<EntityDict>>,
];
exports.default = triggers;
