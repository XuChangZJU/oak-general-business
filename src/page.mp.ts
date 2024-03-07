import { ComponentPublicThisType, DataOption } from 'oak-frontend-base';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict } from './oak-app-domain';
import { BasicFeatures } from 'oak-frontend-base';
import { CommonAspectDict } from 'oak-common-aspect';
import { BackendRuntimeContext } from './context/BackendRuntimeContext';
import { FrontendRuntimeContext } from './context/FrontendRuntimeContext';
import { OakMpHaveToSubscribeMessage, OakApplicationLoadingException } from './types/Exception';
import { GAD, GFD, OakComponentOption } from './types/Page';
import { createComponent as createBaseComponent } from 'oak-frontend-base/es/page.mp';

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
    IsList extends boolean,
    ED extends EntityDict & BaseEntityDict,
    T extends keyof ED,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends GAD<ED, Cxt>,
    FD extends GFD<ED, Cxt, FrontCxt, AD>,
    FormedData extends Record<string, any>,
    TData extends Record<string, any> = {},
    TProperty extends DataOption = {},
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
    >, messageTypes: string[], haveToAccept?: boolean, tip?: string) {
    const mttIds = this.features.cache.get('messageTypeTemplate', {
        data: {
            id: 1,
            templateId: 1,
            template: {
                id: 1,
                wechatId: 1,
            },
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
            ele => ele.template?.wechatId!
        );
        const result = await wx.requestSubscribeMessage({
            tmplIds
        });
        const rejected = Object.keys(result).filter(
            ele => {
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
            }
        );
        if (rejected.length > 0 && haveToAccept) {
            if (tip) {
                this.setMessage({
                    type: 'warning',
                    content: tip,
                });
                return false;
            }
            throw new OakMpHaveToSubscribeMessage(rejected);
        }
    }
    return true;
}

export function createComponent<
    IsList extends boolean,
    ED extends EntityDict & BaseEntityDict,
    T extends keyof ED,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends GAD<ED, Cxt>,
    FD extends GFD<ED, Cxt, FrontCxt, AD>,
    FormedData extends Record<string, any>,
    TData extends Record<string, any> = {},
    TProperty extends DataOption = {},
    TMethod extends Record<string, Function> = {}
>(
    option: OakComponentOption<
        IsList,
        ED,
        T,
        Cxt,
        FrontCxt,
        AD,
        FD,
        FormedData,
        TData,
        TProperty,
        TMethod
    >,
    features: BasicFeatures<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>> & FD,
) {
    const { wechatMp, data, methods, lifetimes, userInsensitive, features: optionFeatures, ...rest } = option;
    const { relatedMessageTypes } = wechatMp || {};
    const { ready, attached, show, hide, ...restLifeTimes } = lifetimes || {};

    const tokenFeatures = optionFeatures?.find(
        ele => ele === 'token' || (typeof ele === 'object' && ele.feature === 'token')
    );
    return createBaseComponent<
        IsList,
        ED,
        T,
        Cxt,
        FrontCxt,
        AD,
        FD,
        FormedData,
        TData & {
            __userId: string | undefined | null;
        },
        TProperty,
        TMethod & {
            subscribeMpMessage: (
                messageTypes: string[],
                haveToAccept?: boolean,
                tip?: string
            ) => Promise<boolean>;
        }
    >(
        {
            data:
                typeof data === 'function'
                    ? function () {
                          return {
                              __userId: null,
                              ...data.call(this),
                          } as TData & {
                              __userId: string | undefined | null;
                          };
                      }
                    : ({
                          __userId: null,
                          ...data,
                      } as TData & {
                          __userId: string | undefined | null;
                      }),
            methods: {
                async subscribeMpMessage(
                    messageTypes: string[],
                    haveToAccept?: boolean,
                    tip?: string
                ) {
                    return await subscribeMpMessage.call(
                        this as any,
                        messageTypes,
                        haveToAccept,
                        tip
                    );
                },
                async getMessageTypeTemplate() {
                    if (relatedMessageTypes) {
                        try {
                            const applicationId =
                                this.features.application.getApplicationId();
                            const existedOnes = this.features.cache.get(
                                'messageTypeTemplate',
                                {
                                    data: {
                                        id: 1,
                                        templateId: 1,
                                        template: {
                                            id: 1,
                                            applicationId: 1,
                                            wechatId: 1,
                                        },
                                        type: 1,
                                    },
                                    filter: {
                                        type: {
                                            $in: relatedMessageTypes,
                                        },
                                        template: {
                                            applicationId,
                                        },
                                    },
                                }
                            );
                            if (existedOnes.length === 0) {
                                await this.features.cache.refresh(
                                    'messageTypeTemplate',
                                    {
                                        data: {
                                            id: 1,
                                            templateId: 1,
                                            template: {
                                                id: 1,
                                                applicationId: 1,
                                                wechatId: 1,
                                            },
                                            type: 1,
                                        },
                                        filter: {
                                            type: {
                                                $in: relatedMessageTypes,
                                            },
                                            template: {
                                                applicationId,
                                            },
                                        },
                                    }
                                );
                            }
                        } catch (err) {
                            if (err instanceof OakApplicationLoadingException) {
                                if (process.env.NODE_ENV === 'development') {
                                    console.warn(
                                        '当Application（全局应用程序）对象正在加载和配置时，为了确保正确地获取模板消息类型的数据，我们会在Application准备就绪之后重新执行getMessageTypeTemplate方法来安全地获取并应用所需模版'
                                    );
                                }
                            } else {
                                throw err;
                            }
                        }
                    }
                },
                ...(methods as TMethod),
            },
            lifetimes: {
                attached() {
                    this.addFeatureSub('application', () =>
                        this.getMessageTypeTemplate()
                    );
                    attached && attached.call(this);
                },
                ready() {
                    this.getMessageTypeTemplate();
                    ready && ready.call(this);
                },
                show() {
                    show && show.call(this);
                    if (!userInsensitive) {
                        const userId = this.features.token.getUserId(true);
                        if (userId !== this.state.__userId) {
                            this.refresh();
                        }
                    }
                },
                hide() {
                    hide && hide.call(this);
                    if (!userInsensitive) {
                        const userId = this.features.token.getUserId(true);
                        this.setState({
                            __userId: userId as string | undefined,
                        } as any);
                    }
                },
                ...restLifeTimes,
            },
            features: (userInsensitive || !!tokenFeatures) ? optionFeatures : (optionFeatures || []).concat([{
                feature: 'token',
                behavior: 'refresh'
            }]),
            wechatMp,
            ...rest,
        },
        features
    );
}


