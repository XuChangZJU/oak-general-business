"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponent = exports.subscribeMpMessage = void 0;
const Exception_1 = require("./types/Exception");
const page_mp_1 = require("oak-frontend-base/es/page.mp");
/**
 * 这里的逻辑暴露出去，是为了让general可以被其它库重载
 * @param this
 * @param messageTypes
 * @param haveToAccept
 * @param action
 * @param messageProps
 * @returns
 */
async function subscribeMpMessage(messageTypes, haveToAccept, tip) {
    const mttIds = this.features.cache.get('messageTypeTemplateId', {
        data: {
            id: 1,
            templateId: 1,
            type: 1,
        },
        filter: {
            type: {
                $in: messageTypes,
            },
        },
    });
    if (mttIds.length > 0) {
        const tmplIds = mttIds.map(ele => ele.templateId);
        const result = await wx.requestSubscribeMessage({
            tmplIds
        });
        const rejected = Object.keys(result).filter(ele => {
            // 排除errMsg
            if (ele === 'errMsg') {
                return false;
            }
            else if (result[ele] === 'reject') {
                return true;
            }
            else if (result[ele] !== 'accept') {
                this.setMessage({
                    type: 'warning',
                    content: `类型${ele}的模板消息被${result[ele]}，请管理员查看后台`,
                });
            }
        });
        if (rejected.length > 0 && haveToAccept) {
            if (tip) {
                this.setMessage({
                    type: 'warning',
                    content: tip,
                });
                return false;
            }
            throw new Exception_1.OakMpHaveToSubscribeMessage(rejected);
        }
    }
    return true;
}
exports.subscribeMpMessage = subscribeMpMessage;
function createComponent(option, features) {
    const { wechatMp, methods, lifetimes, ...rest } = option;
    const { relatedMessageTypes } = wechatMp || {};
    const { ready, attached, ...restLifeTimes } = lifetimes || {};
    return (0, page_mp_1.createComponent)({
        methods: {
            async subscribeMpMessage(messageTypes, haveToAccept, tip) {
                return await subscribeMpMessage.call(this, messageTypes, haveToAccept, tip);
            },
            ...methods,
        },
        lifetimes: {
            attached() {
                this.subscribed.push(this.features.token.subscribe(() => this.refresh()));
                attached && attached.call(this);
            },
            ready() {
                if (relatedMessageTypes) {
                    const applicationId = this.features.application.getApplicationId();
                    const existedOnes = this.features.cache.get('messageTypeTemplateId', {
                        data: {
                            id: 1,
                            templateId: 1,
                            type: 1,
                        },
                        filter: {
                            type: {
                                $in: relatedMessageTypes,
                            },
                            applicationId,
                        },
                    });
                    if (existedOnes.length === 0) {
                        this.features.cache.refresh('messageTypeTemplateId', {
                            data: {
                                id: 1,
                                templateId: 1,
                                type: 1,
                            },
                            filter: {
                                type: {
                                    $in: relatedMessageTypes,
                                },
                                applicationId,
                            },
                        });
                    }
                }
                ready && ready.call(this);
            },
            ...restLifeTimes,
        },
        wechatMp,
        ...rest,
    }, features);
}
exports.createComponent = createComponent;
