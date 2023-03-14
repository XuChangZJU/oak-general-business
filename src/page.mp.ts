import { ComponentPublicThisType, PropertyOption } from 'oak-frontend-base/lib/types/Page';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict } from './general-app-domain';
import { BasicFeatures } from 'oak-frontend-base/lib/features/index';
import { CommonAspectDict } from 'oak-common-aspect';
import { BackendRuntimeContext } from './context/BackendRuntimeContext';
import { FrontendRuntimeContext } from './context/FrontendRuntimeContext';
import { createComponent as createBaseComponent } from 'oak-frontend-base/lib/page.mp';
import { OakMpHaveToSubscribeMessage } from './types/Exception';
import { GAD, GFD, OakComponentOption } from './types/Page';
import { BackTopProps } from 'antd';

/**
 * 这里的逻辑暴露出去，是为了让general可以被其它库重载
 * @param this 
 * @param messageTypes 
 * @param haveToAccept 
 * @param action 
 * @param messageProps 
 * @returns 
 */
export async function subscribeMpMessage<
    ED extends EntityDict & BaseEntityDict,
    T extends keyof ED,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends GAD<ED, Cxt>,
    FD extends GFD<ED, Cxt, FrontCxt, AD>,
    FormedData extends Record<string, any>,
    IsList extends boolean,
    TData extends Record<string, any> = {},
    TProperty extends PropertyOption = {},
    TMethod extends Record<string, Function> = {}>(this: ComponentPublicThisType<
        ED,
        T,
        Cxt,
        FrontCxt,
        AD,
        FD,
        FormedData,
        IsList,
        TData,
        TProperty,
        TMethod
    >, messageTypes: string[], haveToAccept?: boolean, showTip?: boolean) {
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
        const tmplIds = mttIds.map(
            ele => ele.templateId!
        );
        const result = await wx.requestSubscribeMessage({
            tmplIds
        });
        const rejected = Object.keys(result).filter(
            ele => {
                if (result[ele] === 'reject') {
                    return true;
                }
                else if (result[ele] !== 'accept') {
                    this.setMessage({
                        type: 'warning',
                        content: `类型${ele}的模板消息被${result[ele]}，请管理员查看后台`,
                    });
                }
            }
        );
        if (rejected.length > 0 && haveToAccept) {
            if (showTip) {
                this.setMessage({
                    type: 'warning',
                    content: '请接受订阅消息，以便及时收取系统通知',
                });
                return false;
            }
            throw new OakMpHaveToSubscribeMessage(rejected);
        }
    }
    return true;
}

export function createComponent<
    ED extends EntityDict & BaseEntityDict,
    T extends keyof ED,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends GAD<ED, Cxt>,
    FD extends GFD<ED, Cxt, FrontCxt, AD>,
    FormedData extends Record<string, any>,
    IsList extends boolean,
    TData extends Record<string, any> = {},
    TProperty extends PropertyOption = {},
    TMethod extends Record<string, Function> = {}
>(
    option: OakComponentOption<
        ED,
        T,
        Cxt,
        FrontCxt,
        AD,
        FD,
        FormedData,
        IsList,
        TData,
        TProperty,
        TMethod
    >,
    features: BasicFeatures<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>> & FD,
) {
    const { wechatMp, methods, lifetimes, ...rest } = option;
    const { relatedMessageTypes } = wechatMp || {};
    const { ready, attached, ...restLifeTimes } = lifetimes || {};

    return createBaseComponent<ED, T, Cxt, FrontCxt, AD, FD, FormedData, IsList, TData, TProperty, TMethod & {
        subscribeMpMessage: (messageTypes: string[], haveToAccept?: boolean) => Promise<boolean>;
    }>({
        methods: {
            async subscribeMpMessage(messageTypes: string[], haveToAccept?: boolean, showTip?: boolean) {
                return await subscribeMpMessage.call(this as any, messageTypes, haveToAccept, showTip);
            },
            ...(methods as TMethod),
        },
        lifetimes: {
            attached() {
                this.subscribed.push(
                    this.features.token.subscribe(
                        () => this.refresh()
                    )
                );
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


