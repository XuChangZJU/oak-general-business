import React from 'react';
import { DataOption } from 'oak-frontend-base/lib/types/Page';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict } from './general-app-domain';
import { BasicFeatures } from 'oak-frontend-base/lib/features/index';
import { CommonAspectDict } from 'oak-common-aspect';
import { BackendRuntimeContext } from './context/BackendRuntimeContext';
import { FrontendRuntimeContext } from './context/FrontendRuntimeContext';
import { GAD, GFD, OakComponentOption } from './types/Page';
import { createComponent as createBaseComponent } from 'oak-frontend-base/lib/page.web';


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
    TProperty extends DataOption = {},
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
    const { lifetimes, methods, ...rest } = option;
    const { attached, ...restLifeTimes } = lifetimes || {};

    return createBaseComponent<ED, T, Cxt, FrontCxt, AD, FD, FormedData, IsList, TData, TProperty, TMethod & {
        subscribeMpMessage: (messageTypes: string[], haveToAccept?: boolean, tip?: string) => Promise<boolean>;
    }>({
        methods: {
            async subscribeMpMessage(messageTypes: string[], haveToAccept?: boolean, tip?: string) {
                throw new Error('小程序环境专有函数在web下不成立');
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
            ...restLifeTimes,
        },
        ...rest,
    }, features) as React.ForwardRefExoticComponent<React.RefAttributes<unknown>>;
}