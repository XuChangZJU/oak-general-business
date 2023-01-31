"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWeChatPublicEventCallback = void 0;
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
var url_1 = require("url");
var sha1_1 = tslib_1.__importDefault(require("sha1"));
var x2js_1 = tslib_1.__importDefault(require("x2js"));
var oak_external_sdk_1 = require("oak-external-sdk");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var domain_1 = require("../utils/domain");
var X2Js = new x2js_1.default();
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
        var list, weChatUser, _a, _b, _c, _d, _e, _f;
        var _g, _h, _j;
        return tslib_1.__generator(this, function (_k) {
            switch (_k.label) {
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
                    list = _k.sent();
                    if (!(list && list.length > 0)) return [3 /*break*/, 5];
                    (0, assert_1.default)(list.length === 1);
                    weChatUser = list[0];
                    if (!weChatUser.subscribed) return [3 /*break*/, 4];
                    _b = (_a = context).operate;
                    _c = ['wechatUser'];
                    _g = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 2: return [4 /*yield*/, _b.apply(_a, _c.concat([(_g.id = _k.sent(),
                            _g.action = 'update',
                            _g.data = {
                                subscribed: false,
                                unsubscribeAt: Date.now(),
                            },
                            _g.filter = {
                                id: weChatUser.id,
                            },
                            _g), { dontCollect: true, dontCreateOper: true }]))];
                case 3:
                    _k.sent();
                    _k.label = 4;
                case 4: return [3 /*break*/, 9];
                case 5:
                    _e = (_d = context).operate;
                    _f = ['wechatUser'];
                    _h = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 6:
                    _h.id = _k.sent(),
                        _h.action = 'create';
                    _j = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 7: return [4 /*yield*/, _e.apply(_d, _f.concat([(_h.data = (_j.id = _k.sent(),
                            _j.subscribed = false,
                            _j.applicationId = context.getApplicationId(),
                            _j.openId = openId,
                            _j),
                            _h), { dontCollect: true, dontCreateOper: true }]))];
                case 8:
                    _k.sent();
                    _k.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
function setUserSubscribed(openId, eventKey, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, applicationId, applicationType, list, now, data, doUpdate, sceneStr, wcqId, _b, wechatQrCode, application, _c, type, config, _d, appId, appSecret, wechatInstance, expired, entity, entityId, _e, _f, userEntityGrant, _g, id, granter, expired_1, entity2, name_1, _h, domain, url;
        var _this = this;
        return tslib_1.__generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    _a = context.getApplication(), applicationId = _a.id, applicationType = _a.type;
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
                    list = _j.sent();
                    now = Date.now();
                    data = {
                    // activeAt: now,
                    };
                    doUpdate = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var wechatUser, _a, _b, _c, _d, _e, _f, _g, _h, _j;
                        var _k, _l, _m;
                        return tslib_1.__generator(this, function (_o) {
                            switch (_o.label) {
                                case 0:
                                    if (!(list && list.length > 0)) return [3 /*break*/, 3];
                                    (0, assert_1.default)(list.length === 1);
                                    wechatUser = list[0];
                                    if (!wechatUser.subscribed) {
                                        Object.assign(data, {
                                            subscribed: true,
                                            subscribedAt: now,
                                        });
                                    }
                                    _b = (_a = context).operate;
                                    _c = ['wechatUser'];
                                    _k = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([(_k.id = _o.sent(),
                                            _k.action = 'update',
                                            _k.data = data,
                                            _k.filter = {
                                                id: wechatUser.id,
                                            },
                                            _k), { dontCollect: true, dontCreateOper: true }]))];
                                case 2: return [2 /*return*/, _o.sent()];
                                case 3:
                                    _e = (_d = Object).assign;
                                    _f = [data];
                                    _l = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 4:
                                    _e.apply(_d, _f.concat([(_l.id = _o.sent(),
                                            _l.subscribed = true,
                                            _l.subscribedAt = now,
                                            _l.origin = applicationType === 'wechatPublic' ? 'public' : 'web',
                                            _l.applicationId = applicationId,
                                            _l.openId = openId,
                                            _l)]));
                                    _h = (_g = context).operate;
                                    _j = ['wechatUser'];
                                    _m = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 5: return [4 /*yield*/, _h.apply(_g, _j.concat([(_m.id = _o.sent(),
                                            _m.action = 'create',
                                            _m.data = data,
                                            _m), { dontCollect: true }]))];
                                case 6: 
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
                                return [2 /*return*/, _o.sent()];
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
                                expired: 1,
                            },
                            filter: {
                                id: wcqId,
                            },
                            indexFrom: 0,
                            count: 10,
                        }, { dontCollect: true })];
                case 2:
                    _b = tslib_1.__read.apply(void 0, [_j.sent(), 1]), wechatQrCode = _b[0];
                    if (!wechatQrCode) return [3 /*break*/, 8];
                    application = context.getApplication();
                    _c = application, type = _c.type, config = _c.config;
                    (0, assert_1.default)(type === 'wechatPublic');
                    _d = config, appId = _d.appId, appSecret = _d.appSecret;
                    wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, appSecret, 'wechatPublic');
                    expired = wechatQrCode.expired;
                    if (expired) {
                        // 若二维码已经过期，则直接告知用户已经过期
                        wechatInstance.sendServeMessage({
                            openId: openId,
                            type: 'text',
                            content: '此二维码已经过期，请重新获取',
                        });
                        return [2 /*return*/];
                    }
                    entity = wechatQrCode.entity, entityId = wechatQrCode.entityId;
                    _e = entity;
                    switch (_e) {
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
                    _j.label = 4;
                case 4: return [4 /*yield*/, context.select('userEntityGrant', {
                        data: {
                            id: 1,
                            granter: {
                                id: 1,
                                name: 1,
                                nickname: 1,
                            },
                            expired: 1,
                            entity: 1,
                        },
                        filter: {
                            id: entityId,
                        }
                    }, { dontCollect: true })];
                case 5:
                    _f = tslib_1.__read.apply(void 0, [_j.sent(), 1]), userEntityGrant = _f[0];
                    _g = userEntityGrant, id = _g.id, granter = _g.granter, expired_1 = _g.expired, entity2 = _g.entity;
                    name_1 = (granter === null || granter === void 0 ? void 0 : granter.name) || (granter === null || granter === void 0 ? void 0 : granter.nickname) || '某用户';
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
                    _h = tslib_1.__read.apply(void 0, [_j.sent(), 1]), domain = _h[0];
                    (0, assert_1.default)(domain, "\u5904\u7406userEntityGrant\u65F6\uFF0C\u627E\u4E0D\u5230\u5BF9\u5E94\u7684domain\uFF0CapplicationId\u662F\u300C".concat(applicationId, "\u300D"));
                    url = (0, domain_1.composeDomainUrl)(domain, 'wechatQrCode/scan', {
                        scene: sceneStr,
                        time: "".concat(Date.now()),
                    });
                    (0, assert_1.default)(!expired_1); // 如果生成的wechatQrCode没过期，userEntityGrant就不可能过期。
                    wechatInstance.sendServeMessage({
                        openId: openId,
                        type: 'news',
                        url: url,
                        title: "".concat(name_1, "\u7ED9\u60A8\u521B\u5EFA\u4E86\u4E00\u4E2A\u6388\u6743"),
                        description: '请接受',
                        picurl: 'http://img95.699pic.com/element/40018/2473.png_860.png',
                    });
                    _j.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    console.warn("\u7EBF\u4E0A\u6709\u626B\u63CF\u4E8C\u7EF4\u7801\u573A\u666F\u503C\uFF0C\u4F46\u627E\u4E0D\u5230\u5BF9\u5E94\u7684qrCode\uFF0CeventKey\u662F".concat(eventKey));
                    _j.label = 9;
                case 9: return [4 /*yield*/, doUpdate()];
                case 10:
                    _j.sent();
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
                            data = X2Js.xml2js(body).xml;
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
                            searchParams = new url_1.URL("http://".concat(req.headers.host).concat(req.url)).searchParams;
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
