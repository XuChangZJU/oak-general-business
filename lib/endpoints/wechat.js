"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWeChatPublicEventCallback = void 0;
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
var node_url_1 = require("node:url");
var node_path_1 = tslib_1.__importDefault(require("node:path"));
var sha1_1 = tslib_1.__importDefault(require("sha1"));
var xml2json_1 = tslib_1.__importDefault(require("xml2json"));
var oak_external_sdk_1 = require("oak-external-sdk");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var domain_1 = require("../utils/domain");
function assertFromWeChat(query, config) {
    var _a;
    var signature = query.signature, nonce = query.nonce, timestamp = query.timestamp;
    var token = (_a = config.server) === null || _a === void 0 ? void 0 : _a.token;
    var stringArray = [nonce, timestamp, token];
    var sign = stringArray.sort().reduce(function (acc, val) {
        acc += val;
        return acc;
    });
    var sha1Sign = (0, sha1_1.default)(sign);
    return signature === sha1Sign;
}
var CALLBACK = {};
function registerWeChatPublicEventCallback(appId, callback) {
    (0, assert_1.default)(!CALLBACK.hasOwnProperty(appId));
    CALLBACK[appId] = callback;
}
exports.registerWeChatPublicEventCallback = registerWeChatPublicEventCallback;
/**
 * 用户取关事件，注意要容wechatUser不存在的情况
 * @param openId
 * @param context
 * @returns
 */
function setUserUnsubscribed(openId, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var list, weChatUser;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.select('wechatUser', {
                        data: {
                            id: 1,
                            subscribed: 1,
                            subscribedAt: 1,
                        },
                        filter: {
                            applicationId: context.getApplicationId(),
                            openId: openId,
                        },
                        indexFrom: 0,
                        count: 10,
                    }, { dontCollect: true })];
                case 1:
                    list = _a.sent();
                    if (!(list && list.length > 0)) return [3 /*break*/, 4];
                    (0, assert_1.default)(list.length === 1);
                    weChatUser = list[0];
                    if (!weChatUser.subscribed) return [3 /*break*/, 3];
                    return [4 /*yield*/, context.operate('wechatUser', {
                            action: 'update',
                            data: {
                                subscribed: false,
                                unsubscribeAt: Date.now(),
                            },
                            id: weChatUser.id,
                        }, { dontCollect: true, dontCreateOper: true })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, context.operate('wechatUser', {
                        action: 'create',
                        data: {
                            subscribed: false,
                            applicationId: context.getApplicationId(),
                            openId: openId,
                        },
                    }, { dontCollect: true, dontCreateOper: true })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function setUserSubscribed(openId, eventKey, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var applicationId, list, now, data, doUpdate, sceneStr, wcqId, _a, weChatQrCode, entity, entityId, _b, _c, userEntityGrant, _d, id, granter, expired, entity2, _e, domain, url, name_1, application, _f, type, config, _g, appId, appSecret, wechatInstance;
        var _this = this;
        return tslib_1.__generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    applicationId = context.getApplicationId();
                    return [4 /*yield*/, context.select('wechatUser', {
                            data: {
                                id: 1,
                                subscribed: 1,
                                subscribedAt: 1,
                            },
                            filter: {
                                applicationId: applicationId,
                                openId: openId,
                            },
                            indexFrom: 0,
                            count: 1,
                        }, { dontCollect: true })];
                case 1:
                    list = _h.sent();
                    now = Date.now();
                    data = {
                        activeAt: now,
                    };
                    doUpdate = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var wechatUser;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(list && list.length > 0)) return [3 /*break*/, 2];
                                    (0, assert_1.default)(list.length === 1);
                                    wechatUser = list[0];
                                    if (!wechatUser.subscribed) {
                                        Object.assign(data, {
                                            subscribed: true,
                                            subscribeAt: now,
                                        });
                                    }
                                    return [4 /*yield*/, context.operate('wechatUser', {
                                            action: 'update',
                                            data: data,
                                            filter: {
                                                id: wechatUser.id,
                                            },
                                        }, { dontCollect: true, dontCreateOper: true })];
                                case 1: return [2 /*return*/, _a.sent()];
                                case 2:
                                    Object.assign(data, {
                                        subscribed: true,
                                        subscribeAt: now,
                                        applicationId: applicationId,
                                        openId: openId,
                                    });
                                    return [4 /*yield*/, context.operate('wechatUser', {
                                            action: 'create',
                                            data: data,
                                        }, { dontCollect: true })];
                                case 3: 
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
                                return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); };
                    if (!eventKey) return [3 /*break*/, 9];
                    sceneStr = void 0;
                    if (eventKey.startsWith('qrscene_')) {
                        sceneStr = eventKey.slice(eventKey.indexOf('qrscene_') + 8);
                    }
                    else {
                        sceneStr = eventKey;
                    }
                    wcqId = (0, uuid_1.expandUuidTo36Bytes)(sceneStr);
                    return [4 /*yield*/, context.select('wechatQrCode', {
                            data: {
                                id: 1,
                                entity: 1,
                                entityId: 1,
                            },
                            filter: {
                                id: wcqId,
                            },
                            indexFrom: 0,
                            count: 10,
                        }, { dontCollect: true })];
                case 2:
                    _a = tslib_1.__read.apply(void 0, [_h.sent(), 1]), weChatQrCode = _a[0];
                    if (!weChatQrCode) return [3 /*break*/, 8];
                    entity = weChatQrCode.entity, entityId = weChatQrCode.entityId;
                    _b = entity;
                    switch (_b) {
                        case 'user': return [3 /*break*/, 3];
                        case 'userEntityGrant': return [3 /*break*/, 4];
                    }
                    return [3 /*break*/, 7];
                case 3:
                    {
                        // 裂变获得的用户
                        if (list[0] && !list[0].userId) {
                            Object.assign(data, { userId: entityId });
                        }
                        return [3 /*break*/, 7];
                    }
                    _h.label = 4;
                case 4: return [4 /*yield*/, context.select('userEntityGrant', {
                        data: {
                            id: 1,
                        },
                        filter: {
                            id: entityId,
                        }
                    }, { dontCollect: true })];
                case 5:
                    _c = tslib_1.__read.apply(void 0, [_h.sent(), 1]), userEntityGrant = _c[0];
                    _d = userEntityGrant, id = _d.id, granter = _d.granter, expired = _d.expired, entity2 = _d.entity;
                    return [4 /*yield*/, context.select('domain', {
                            data: {
                                id: 1,
                                url: 1,
                                apiPath: 1,
                                protocol: 1,
                                port: 1,
                            },
                            filter: {
                                systemId: {
                                    $in: {
                                        entity: 'application',
                                        data: {
                                            systemId: 1,
                                        },
                                        filter: {
                                            id: applicationId,
                                        }
                                    }
                                }
                            }
                        }, { dontCollect: true })];
                case 6:
                    _e = tslib_1.__read.apply(void 0, [_h.sent(), 1]), domain = _e[0];
                    (0, assert_1.default)(domain, "\u5904\u7406userEntityGrant\u65F6\uFF0C\u627E\u4E0D\u5230\u5BF9\u5E94\u7684domain\uFF0CapplicationId\u662F\u300C".concat(applicationId, "\u300D"));
                    url = (0, domain_1.composeDomainUrl)(domain, 'wechatQrCode/scan', {
                        scene: sceneStr,
                    });
                    (0, assert_1.default)(!expired); // 如果生成的wechatQrCode没过期，userEntityGrant就不可能过期。
                    name_1 = granter.name || granter.nickname;
                    application = context.getApplication();
                    _f = application, type = _f.type, config = _f.config;
                    (0, assert_1.default)(type === 'wechatPublic');
                    _g = config, appId = _g.appId, appSecret = _g.appSecret;
                    wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, appSecret, 'wechatPublic');
                    wechatInstance.sendServeMessage({
                        openId: openId,
                        type: 'news',
                        url: url,
                        title: "".concat(name_1, "\u7ED9\u60A8\u521B\u5EFA\u4E86\u4E00\u4E2A\u6388\u6743"),
                        description: '请接受',
                        picurl: 'http://img95.699pic.com/element/40018/2473.png_860.png',
                    });
                    _h.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    console.warn("\u7EBF\u4E0A\u6709\u626B\u63CF\u4E8C\u7EF4\u7801\u573A\u666F\u503C\uFF0C\u4F46\u627E\u4E0D\u5230\u5BF9\u5E94\u7684qrCode\uFF0CeventKey\u662F".concat(eventKey));
                    _h.label = 9;
                case 9: return [4 /*yield*/, doUpdate()];
                case 10:
                    _h.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function onWeChatPublicEvent(data, context) {
    var ToUserName = data.ToUserName, FromUserName = data.FromUserName, CreateTime = data.CreateTime, MsgType = data.MsgType, Event = data.Event, Content = data.Content, EventKey = data.EventKey;
    var appId = context.getApplicationId();
    var evt;
    // 如果有应用注入的事件回调则处理之，不依赖其返回
    if (CALLBACK[appId]) {
        CALLBACK[appId](data, context);
    }
    if (Event) {
        var event_1 = Event.toLowerCase();
        switch (event_1) {
            case 'subscribe':
                setUserSubscribed(FromUserName, EventKey, context);
                evt = "\u7528\u6237".concat(FromUserName, "\u5173\u6CE8\u516C\u4F17\u53F7");
                break;
            case 'scan':
                setUserSubscribed(FromUserName, EventKey, context);
                evt = "\u7528\u6237".concat(FromUserName, "\u518D\u6B21\u626B\u63CF\u5E26").concat(EventKey, "\u952E\u503C\u7684\u4E8C\u7EF4\u7801");
                break;
            case 'unsubscribe': {
                setUserUnsubscribed(FromUserName, context);
                evt = "\u7528\u6237".concat(FromUserName, "\u53D6\u5173");
                break;
            }
            case 'location': {
                evt = "\u7528\u6237".concat(FromUserName, "\u4E0A\u4F20\u4E86\u5730\u7406\u4F4D\u7F6E\u4FE1\u606F");
                break;
            }
            case 'click': {
                evt = "\u7528\u6237".concat(FromUserName, "\u70B9\u51FB\u83DC\u5355\u3010").concat(EventKey, "\u3011");
                break;
            }
            case 'view': {
                evt = "\u7528\u6237".concat(FromUserName, "\u70B9\u51FB\u83DC\u5355\u8DF3\u8F6C\u94FE\u63A5\u3010").concat(EventKey, "\u3011");
                break;
            }
            case 'templatesendjobfinish': {
                // 模板消息发送完成，去更新对应的messageSent对象
                // 这个在线上测试没法通过，返回的msgId不符合，不知道为什么
                var msgId = data.MsgID, status_1 = data.Status, openId = data.FromUserName;
                evt = "\u5E94\u7528".concat(appId, "\u7684\u7528\u6237").concat(FromUserName, "\u53D1\u6765\u4E86").concat(Event, "\u4E8B\u4EF6\uFF0C\u5185\u5BB9\u662F").concat(JSON.stringify(data));
                break;
            }
            default: {
                evt = "\u5E94\u7528".concat(appId, "\u7684\u7528\u6237").concat(FromUserName, "\u53D1\u6765\u4E86").concat(Event, "\u4E8B\u4EF6\uFF0C\u5185\u5BB9\u662F").concat(JSON.stringify(data));
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
    (0, assert_1.default)(MsgType);
    var content = '<xml>' +
        "<ToUserName>".concat(FromUserName, "</ToUserName>") +
        "<FromUserName>".concat(ToUserName, "</FromUserName>") +
        "<CreateTime>".concat(CreateTime, "</CreateTime>") +
        '<MsgType>transfer_customer_service</MsgType>' +
        '</xml>';
    switch (MsgType) {
        case 'text':
        case 'link': {
            evt = "\u63A5\u6536\u5230\u6765\u81EA\u7528\u6237\u7684\u6587\u5B57\u6D88\u606F\uFF1A".concat(Content);
            break;
        }
        case 'image': {
            evt = "\u63A5\u6536\u5230\u6765\u81EA\u7528\u6237\u7684\u56FE\u7247\u6D88\u606F\uFF1A".concat(Content);
            break;
        }
        default: {
            evt = "\u63A5\u6536\u5230\u6765\u81EA\u7528\u6237\u7684".concat(MsgType, "\u578B\u6D88\u606F");
            break;
        }
    }
    if (process.env.NODE_ENV === 'development') {
        console.log(evt);
    }
    return {
        content: content,
        contentType: 'application/xml',
    };
}
var endpoints = {
    wechatPublicEvent: [{
            name: '微信公众号回调接口',
            method: 'post',
            params: ['appId'],
            fn: function (context, params, headers, req, body) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var appId, data, _a, content, contentType;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            appId = params.appId;
                            if (!appId) {
                                throw new Error('applicationId参数不存在');
                            }
                            return [4 /*yield*/, context.setApplication(appId)];
                        case 1:
                            _b.sent();
                            data = xml2json_1.default.toJson(body, { object: true });
                            _a = onWeChatPublicEvent(data, context), content = _a.content, contentType = _a.contentType;
                            return [2 /*return*/, content];
                    }
                });
            }); },
        }, {
            name: '微信公众号验证接口',
            method: 'get',
            params: ['appId'],
            fn: function (context, params, body, req, headers) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var searchParams, appId, _a, application, signature, timestamp, nonce, isWeChat, echostr;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            searchParams = new node_url_1.URL(node_path_1.default.join('http://', req.headers.host, req.url)).searchParams;
                            appId = params.appId;
                            if (!appId) {
                                throw new Error('applicationId参数不存在');
                            }
                            return [4 /*yield*/, context.select('application', {
                                    data: {
                                        id: 1,
                                        config: 1,
                                    },
                                    filter: {
                                        id: appId,
                                    },
                                }, {})];
                        case 1:
                            _a = tslib_1.__read.apply(void 0, [_b.sent(), 1]), application = _a[0];
                            if (!application) {
                                throw new Error("\u672A\u627E\u5230".concat(appId, "\u5BF9\u5E94\u7684app"));
                            }
                            signature = searchParams.get('signature');
                            timestamp = searchParams.get('timestamp');
                            nonce = searchParams.get('nonce');
                            isWeChat = assertFromWeChat({ signature: signature, timestamp: timestamp, nonce: nonce }, application.config);
                            if (isWeChat) {
                                echostr = searchParams.get('echostr');
                                return [2 /*return*/, echostr];
                            }
                            else {
                                throw new Error('Verify Failed');
                            }
                            return [2 /*return*/];
                    }
                });
            }); },
        }],
};
exports.default = endpoints;
