import { assert } from 'oak-domain/lib/utils/assert';
import URL from 'url';
import sha1 from 'sha1';
import x2js from 'x2js';
import { WechatSDK, } from 'oak-external-sdk';
import { expandUuidTo36Bytes, generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { composeDomainUrl } from '../utils/domain';
import { composeUrl } from 'oak-domain/lib/utils/url';
import { createSession } from '../aspects/session';
import { getMaterial } from '../aspects/application';
const X2Js = new x2js();
function assertFromWeChat(query, config) {
    const { signature, nonce, timestamp } = query;
    const token = config.server?.token;
    const stringArray = [nonce, timestamp, token];
    const sign = stringArray.sort().reduce((acc, val) => {
        acc += val;
        return acc;
    });
    const sha1Sign = sha1(sign);
    return signature === sha1Sign;
}
const CALLBACK = {};
export function registerWeChatPublicEventCallback(appId, callback) {
    assert(!CALLBACK.hasOwnProperty(appId));
    CALLBACK[appId] = callback;
}
/**
 * 用户取关事件，注意要容wechatUser不存在的情况
 * @param openId
 * @param context
 * @returns
 */
async function setUserUnsubscribed(openId, context) {
    const list = await context.select('wechatUser', {
        data: {
            id: 1,
            subscribed: 1,
            subscribedAt: 1,
        },
        filter: {
            applicationId: context.getApplicationId(),
            openId,
        },
        indexFrom: 0,
        count: 10,
    }, { dontCollect: true });
    if (list && list.length > 0) {
        assert(list.length === 1);
        const weChatUser = list[0];
        if (weChatUser.subscribed) {
            await context.operate('wechatUser', {
                id: await generateNewIdAsync(),
                action: 'update',
                data: {
                    subscribed: false,
                    unsubscribeAt: Date.now(),
                },
                filter: {
                    id: weChatUser.id,
                },
            }, { dontCollect: true, dontCreateOper: true });
        }
    }
    else {
        await context.operate('wechatUser', {
            id: await generateNewIdAsync(),
            action: 'create',
            data: {
                id: await generateNewIdAsync(),
                subscribed: false,
                applicationId: context.getApplicationId(),
                openId,
            },
        }, { dontCollect: true, dontCreateOper: true });
    }
    return;
}
async function setUserSubscribed(openId, eventKey, context) {
    const { id: applicationId, type: applicationType } = context.getApplication();
    const list = await context.select('wechatUser', {
        data: {
            id: 1,
            subscribed: 1,
            subscribedAt: 1,
        },
        filter: {
            applicationId,
            openId,
        },
        indexFrom: 0,
        count: 1,
    }, { dontCollect: true });
    const now = Date.now();
    const data = {
    // activeAt: now,
    };
    const doUpdate = async () => {
        if (list && list.length > 0) {
            assert(list.length === 1);
            const wechatUser = list[0];
            if (!wechatUser.subscribed) {
                Object.assign(data, {
                    subscribed: true,
                    subscribedAt: now,
                });
            }
            return await context.operate('wechatUser', {
                id: await generateNewIdAsync(),
                action: 'update',
                data,
                filter: {
                    id: wechatUser.id,
                },
            }, { dontCollect: true, dontCreateOper: true });
        }
        Object.assign(data, {
            id: await generateNewIdAsync(),
            subscribed: true,
            subscribedAt: now,
            origin: applicationType === 'wechatPublic' ? 'public' : 'web',
            applicationId,
            openId,
        });
        // 这里试着直接把user也创建出来，by Xc 20190720
        /**
         * 这里不能创建user，否则会出现一个weChatUser有openId和userId，却没有unionId
         * 当同一个user先从小程序登录，再从公众号登录时就会生成两个user
         */
        /* return warden.insertEntity(tables.user, {
         state: UserState.normal,
         activeAt: Date.now(),
         }, txn).then(
         (user) => {
         assign(data, { userId: user.id });
         return warden.insertEntity(tables.weChatUser, data, txn);
         }
         );*/
        return await context.operate('wechatUser', {
            id: await generateNewIdAsync(),
            action: 'create',
            data,
        }, { dontCollect: true });
    };
    if (eventKey) {
        // 如果带着场景值，需要查找对应的二维码，如果有公共逻辑在这里处理
        let sceneStr;
        if (eventKey.startsWith('qrscene_')) {
            sceneStr = eventKey.slice(eventKey.indexOf('qrscene_') + 8);
        }
        else {
            sceneStr = eventKey;
        }
        // sceneStr是id压缩后的字符串
        const wcqId = expandUuidTo36Bytes(sceneStr);
        const [wechatQrCode] = await context.select('wechatQrCode', {
            data: {
                id: 1,
                entity: 1,
                entityId: 1,
                expired: 1,
            },
            filter: {
                id: wcqId,
            },
            indexFrom: 0,
            count: 10,
        }, { dontCollect: true });
        if (wechatQrCode) {
            const application = context.getApplication();
            const { type, config, systemId } = application;
            assert(type === 'wechatPublic');
            const { appId, appSecret } = config;
            const wechatInstance = WechatSDK.getInstance(appId, 'wechatPublic', appSecret);
            const { expired } = wechatQrCode;
            if (expired) {
                // 若二维码已经过期，则直接告知用户已经过期
                wechatInstance.sendServeMessage({
                    openId,
                    type: 'text',
                    content: '此二维码已经过期，请重新获取',
                });
                return;
            }
            const { entity, entityId } = wechatQrCode;
            switch (entity) {
                case 'user': {
                    // 裂变获得的用户
                    if (list[0] && !list[0].userId) {
                        Object.assign(data, { userId: entityId });
                    }
                    break;
                }
                case 'userEntityGrant': {
                    // 授权过来的用户，推送接受分享的客服消息给他
                    const [userEntityGrant] = await context.select('userEntityGrant', {
                        data: {
                            id: 1,
                            qrCodeType: 1,
                            granter: {
                                id: 1,
                                name: 1,
                                nickname: 1,
                            },
                            expired: 1,
                            relationalEntity: 1,
                        },
                        filter: {
                            id: entityId,
                        },
                    }, { dontCollect: true });
                    const { id, granter, expired, relationEntity: entity2, qrCodeType, } = userEntityGrant;
                    const name = granter?.name || granter?.nickname || '某用户';
                    if (qrCodeType === 'wechatPublicForMp') {
                        // 找到相关的小程序
                        const [appMp] = await context.select('application', {
                            data: {
                                id: 1,
                                config: 1,
                            },
                            filter: {
                                systemId,
                                type: 'wechatMp',
                            },
                        }, { dontCollect: true });
                        assert(appMp, '公众号推送小程序码时找不到关联的小程序');
                        const { config } = appMp;
                        const { appId } = config;
                        const url = composeUrl('pages/wechatQrCode/scan/index', {
                            scene: sceneStr,
                            time: `${Date.now()}`,
                        });
                        // 先试着发文字链接
                        const content = `${name}为您创建了一个授权，<a href='#' data-miniprogram-appid='${appId}' data-miniprogram-path='${url}'>请点击领取</a>`;
                        if (!expired) {
                            wechatInstance.sendServeMessage({
                                openId,
                                type: 'text',
                                content,
                            });
                        }
                        else {
                            wechatInstance.sendServeMessage({
                                openId,
                                type: 'text',
                                content: '您好，您扫描的二维码已经过期，请联系管理员重新获取',
                            });
                        }
                    }
                    else {
                        // 推domain上的scan/code链接
                        const [domain] = await context.select('domain', {
                            data: {
                                id: 1,
                                url: 1,
                                apiPath: 1,
                                protocol: 1,
                                port: 1,
                            },
                            filter: {
                                system: {
                                    application$system: {
                                        id: applicationId,
                                    },
                                },
                            },
                        }, { dontCollect: true });
                        assert(domain, `处理userEntityGrant时，找不到对应的domain，applicationId是「${applicationId}」`);
                        const url = composeDomainUrl(domain, 'wechatQrCode/scan', {
                            scene: sceneStr,
                            time: `${Date.now()}`,
                        });
                        if (!expired) {
                            wechatInstance.sendServeMessage({
                                openId,
                                type: 'news',
                                url,
                                title: `${name}为您创建了一个授权`,
                                description: '请接受',
                                picurl: 'http://img95.699pic.com/element/40018/2473.png_860.png',
                            });
                        }
                        else {
                            wechatInstance.sendServeMessage({
                                openId,
                                type: 'text',
                                content: '您好，您扫描的二维码已经过期，请联系管理员重新获取',
                            });
                        }
                    }
                    break;
                }
                case 'wechatLogin': {
                    const [wechatLogin] = await context.select('wechatLogin', {
                        data: {
                            id: 1,
                            qrCodeType: 1,
                            expired: 1,
                            userId: 1,
                            type: 1,
                            successed: 1,
                        },
                        filter: {
                            id: entityId,
                        },
                    }, { dontCollect: true });
                    const { qrCodeType, expired, userId, type, successed } = wechatLogin;
                    if (qrCodeType === 'wechatPublicForMp') {
                        // todo 公众号跳小程序 绑定login 后面再实现
                    }
                    else {
                        const [domain] = await context.select('domain', {
                            data: {
                                id: 1,
                                url: 1,
                                apiPath: 1,
                                protocol: 1,
                                port: 1,
                            },
                            filter: {
                                system: {
                                    application$system: {
                                        id: applicationId,
                                    },
                                },
                            },
                        }, { dontCollect: true });
                        assert(domain, `处理wechatLogin时，找不到对应的domain，applicationId是「${applicationId}」`);
                        const url = composeDomainUrl(domain, 'wechatQrCode/scan', {
                            scene: sceneStr,
                            time: `${Date.now()}`,
                        });
                        const title = type === 'bind' ? '扫码绑定' : '扫码登录';
                        const description = type === 'bind' ? '去绑定' : '去登录';
                        if (!expired) {
                            wechatInstance.sendServeMessage({
                                openId,
                                type: 'news',
                                url,
                                title,
                                description,
                                picurl: 'http://img95.699pic.com/element/40018/2473.png_860.png',
                            });
                        }
                        else {
                            wechatInstance.sendServeMessage({
                                openId,
                                type: 'text',
                                content: '您好，您扫描的二维码已经过期，请重新生成',
                            });
                        }
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        }
        else {
            console.warn(`线上有扫描二维码场景值，但找不到对应的qrCode，eventKey是${eventKey}`);
        }
    }
    await doUpdate();
    return;
}
async function setClickEventKey(openId, eventKey, context) {
    const application = context.getApplication();
    const { type, config, systemId, id: applicationId } = application;
    assert(type === 'wechatPublic');
    const { appId, appSecret } = config;
    const wechatInstance = WechatSDK.getInstance(appId, 'wechatPublic', appSecret);
    if (eventKey) {
        var indexOfDollarSign = eventKey.indexOf('$');
        var resultString = eventKey.substring(0, indexOfDollarSign);
        const [wechatMenu] = await context.select('wechatMenu', {
            data: {
                id: 1,
                applicationId: 1,
                menuConfig: 1,
                wechatPublicTagId: 1,
                wechatPublicTag: {
                    wechatId: 1,
                },
            },
            filter: indexOfDollarSign !== -1
                ? {
                    applicationId,
                    wechatPublicTag: {
                        wechatId: Number(resultString),
                    },
                }
                : {
                    applicationId,
                    wechatPublicTagId: {
                        $exists: false,
                    },
                },
        }, { dontCollect: true });
        if (wechatMenu) {
            let content = null;
            wechatMenu.menuConfig?.button.map((ele) => {
                if (ele.key === eventKey) {
                    content = ele.content;
                }
                else if (ele.sub_button && ele.sub_button.length > 0) {
                    var subEle = ele.sub_button.find((sub) => {
                        return sub.key === eventKey;
                    });
                    if (subEle) {
                        content = subEle.content;
                    }
                }
            });
            if (content) {
                wechatInstance.sendServeMessage({
                    openId,
                    type: 'text',
                    content,
                });
                return;
            }
        }
    }
}
async function setSubscribedEventKey(openId, eventKey, context) {
    const application = context.getApplication();
    const { type, config, systemId, id: applicationId } = application;
    assert(type === 'wechatPublic');
    const { appId, appSecret } = config;
    const wechatInstance = WechatSDK.getInstance(appId, 'wechatPublic', appSecret);
    if (eventKey) {
        const [wechatPublicAutoReply] = await context.select('wechatPublicAutoReply', {
            data: {
                id: 1,
                applicationId: 1,
                content: 1,
                event: 1,
                type: 1,
            },
            filter: {
                applicationId,
                event: 'subscribe',
            },
        }, { dontCollect: true });
        if (wechatPublicAutoReply) {
            let content = null;
            if (wechatPublicAutoReply.type === 'text' &&
                wechatPublicAutoReply.content &&
                wechatPublicAutoReply.content.text) {
                content = wechatPublicAutoReply.content.text;
                wechatInstance.sendServeMessage({
                    openId,
                    type: 'text',
                    content,
                });
                return;
            }
        }
    }
}
async function onWeChatPublicEvent(data, context) {
    const { ToUserName, FromUserName, CreateTime, MsgType, Event, EventKey } = data;
    const appId = context.getApplicationId();
    let evt;
    // 如果有应用注入的事件回调则处理之，不依赖其返回
    if (CALLBACK[appId]) {
        CALLBACK[appId](data, context);
    }
    // 接收事件推送
    if (MsgType === 'event') {
        if (Event) {
            const event = Event.toLowerCase();
            switch (event) {
                case 'subscribe':
                    setUserSubscribed(FromUserName, EventKey, context);
                    evt = `用户${FromUserName}关注公众号`;
                    break;
                case 'scan':
                    setUserSubscribed(FromUserName, EventKey, context);
                    evt = `用户${FromUserName}再次扫描带${EventKey}键值的二维码`;
                    break;
                case 'unsubscribe': {
                    setUserUnsubscribed(FromUserName, context);
                    evt = `用户${FromUserName}取关`;
                    break;
                }
                case 'location': {
                    evt = `用户${FromUserName}上传了地理位置信息`;
                    break;
                }
                case 'click': {
                    setClickEventKey(FromUserName, EventKey, context);
                    evt = `用户${FromUserName}点击菜单【${EventKey}】`;
                    break;
                }
                case 'view': {
                    evt = `用户${FromUserName}点击菜单跳转链接【${EventKey}】`;
                    break;
                }
                case 'templatesendjobfinish': {
                    // 模板消息发送完成，去更新对应的messageSent对象
                    // 这个在线上测试没法通过，返回的msgId不符合，不知道为什么
                    const { MsgID: msgId, Status: status, FromUserName: openId, } = data;
                    evt = `应用${appId}的用户${FromUserName}发来了${Event}事件，内容是${JSON.stringify(data)}`;
                    break;
                }
                default: {
                    evt = `应用${appId}的用户${FromUserName}发来了${Event}事件，内容是${JSON.stringify(data)}`;
                    break;
                }
            }
            if (process.env.NODE_ENV === 'development') {
                console.log(evt);
            }
            return {
                content: '',
                contentType: 'application/text',
            };
        }
    }
    assert(MsgType);
    // 接收普通消息
    const content = '<xml>' +
        `<ToUserName>${FromUserName}</ToUserName>` +
        `<FromUserName>${ToUserName}</FromUserName>` +
        `<CreateTime>${CreateTime}</CreateTime>` +
        '<MsgType>transfer_customer_service</MsgType>' +
        '</xml>';
    const { Content, Title, Description, Url, PicUrl } = data;
    switch (MsgType) {
        case 'text': {
            evt = `接收到来自用户「${MsgType}」消息：「${Content}」`;
            break;
        }
        case 'link': {
            evt = `接收到来自用户「${MsgType}」消息：Title =>「${Title}」, Description =>「${Description}」, Url =>「${Url}」`;
            break;
        }
        case 'image': {
            evt = `接收到来自用户「${MsgType}」消息：「${PicUrl}」`;
            break;
        }
        default: {
            evt = `接收到来自用户「${MsgType}」消息`;
            break;
        }
    }
    if (process.env.NODE_ENV === 'development') {
        console.log(evt);
    }
    try {
        await createSession({
            data,
            type: 'wechatPublic',
            entity: 'application',
            entityId: appId,
        }, context);
    }
    catch (err) {
        // todo 出错的话怎么处理 by wkj
        return {
            content,
            contentType: 'application/xml',
        };
    }
    return {
        content,
        contentType: 'application/xml',
    };
}
async function onWeChatMpEvent(data, context) {
    const appId = context.getApplicationId();
    try {
        await createSession({
            data,
            type: 'wechatMp',
            entity: 'application',
            entityId: appId,
        }, context);
    }
    catch (err) {
        // todo 出错的话怎么处理 by wkj
        return {
            content: 'success',
        };
    }
    return {
        content: 'success',
    };
}
const endpoints = {
    wechatPublicEvent: [
        {
            name: '微信公众号回调接口',
            method: 'post',
            params: ['appId'],
            fn: async (context, params, headers, req, body) => {
                const { appId } = params;
                if (!appId) {
                    console.error('applicationId参数不存在');
                    console.log(JSON.stringify(body));
                    return '';
                }
                await context.setApplication(appId);
                const { xml: data } = X2Js.xml2js(body);
                const { content, contentType } = await onWeChatPublicEvent(data, context);
                return content;
            },
        },
        {
            name: '微信公众号验证接口',
            method: 'get',
            params: ['appId'],
            fn: async (context, params, body, req, headers) => {
                const { searchParams } = new URL.URL(`http://${req.headers.host}${req.url}`);
                const { appId } = params;
                if (!appId) {
                    console.error('applicationId参数不存在');
                    const echostr = searchParams.get('echostr');
                    return echostr;
                }
                const [application] = await context.select('application', {
                    data: {
                        id: 1,
                        config: 1,
                    },
                    filter: {
                        id: appId,
                    },
                }, {});
                if (!application) {
                    throw new Error(`未找到${appId}对应的app`);
                }
                const signature = searchParams.get('signature');
                const timestamp = searchParams.get('timestamp');
                const nonce = searchParams.get('nonce');
                const isWeChat = assertFromWeChat({ signature, timestamp, nonce }, application.config);
                if (isWeChat) {
                    const echostr = searchParams.get('echostr');
                    return echostr;
                }
                else {
                    throw new Error('Verify Failed');
                }
            },
        },
    ],
    wechatMpEvent: [
        {
            name: '微信小程序回调接口',
            method: 'post',
            params: ['appId'],
            fn: async (context, params, headers, req, body) => {
                const { appId } = params;
                if (!appId) {
                    console.error('applicationId参数不存在');
                    console.log(JSON.stringify(body));
                    return '';
                }
                await context.setApplication(appId);
                const application = context.getApplication();
                const { config } = application;
                const { server } = config;
                if (!server) {
                    throw new Error(`请配置：“微信小程序-服务器配置”`);
                }
                if (server?.dataFormat === 'json') {
                    const { content } = await onWeChatMpEvent(body, context);
                    return content;
                }
                else {
                    const { xml: data } = X2Js.xml2js(body);
                    const { content } = await onWeChatMpEvent(data, context);
                    return content;
                }
            },
        },
        {
            name: '微信小程序验证接口',
            method: 'get',
            params: ['appId'],
            fn: async (context, params, body, req, headers) => {
                const { searchParams } = new URL.URL(`http://${req.headers.host}${req.url}`);
                const { appId } = params;
                if (!appId) {
                    console.error('applicationId参数不存在');
                    const echostr = searchParams.get('echostr');
                    return echostr;
                }
                const [application] = await context.select('application', {
                    data: {
                        id: 1,
                        config: 1,
                    },
                    filter: {
                        id: appId,
                    },
                }, {});
                if (!application) {
                    throw new Error(`未找到${appId}对应的app`);
                }
                const signature = searchParams.get('signature');
                const timestamp = searchParams.get('timestamp');
                const nonce = searchParams.get('nonce');
                const isWeChat = assertFromWeChat({ signature, timestamp, nonce }, application.config);
                if (isWeChat) {
                    const echostr = searchParams.get('echostr');
                    return echostr;
                }
                else {
                    throw new Error('Verify Failed');
                }
            },
        },
    ],
    wechatMaterial: [
        {
            name: '获取微信素材',
            method: 'get',
            fn: async (context, params, headers, req, body) => {
                const { searchParams } = new URL.URL(`http://${req.headers.host}${req.url}`);
                const applicationId = searchParams.get('applicationId');
                const mediaId = searchParams.get('mediaId');
                const isPermanent = searchParams.get('isPermanent');
                const base64 = await getMaterial({
                    applicationId: applicationId,
                    mediaId: mediaId,
                    isPermanent: isPermanent === 'true',
                }, context);
                // 微信临时素材 公众号只支持image和video，小程序只支持image
                // 现只支持image 
                const af = Buffer.from(base64, 'base64');
                return af;
            },
        },
    ],
};
export default endpoints;
