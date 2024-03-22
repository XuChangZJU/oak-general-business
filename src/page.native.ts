import React from 'react';
import { DataOption } from 'oak-frontend-base';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict } from './oak-app-domain';
import { BasicFeatures } from 'oak-frontend-base';
import { CommonAspectDict } from 'oak-common-aspect';
import { BackendRuntimeContext } from './context/BackendRuntimeContext';
import { FrontendRuntimeContext } from './context/FrontendRuntimeContext';
import { GAD, GFD, OakComponentOption } from './types/Page';
import { createComponent as createBaseComponent } from 'oak-frontend-base/es/page.native';


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
    const { methods, features: optionFeatures, userInsensitive, ...rest } = option;

    const tokenFeatures = optionFeatures?.find(
        ele => ele === 'token' || (typeof ele === 'object' && ele.feature === 'token')
    );
    return createBaseComponent<IsList, ED, T, Cxt, FrontCxt, AD, FD, FormedData, TData, TProperty, TMethod & {
        subscribeMpMessage: (messageTypes: string[], haveToAccept?: boolean, tip?: string) => Promise<boolean>;
    }>({
        methods: {
            async subscribeMpMessage(messageTypes: string[], haveToAccept?: boolean, tip?: string) {
                throw new Error('小程序环境专有函数在native下不成立');
            },
            ...(methods as TMethod),
        },
        features: (userInsensitive || !!tokenFeatures) ? optionFeatures : (optionFeatures || []).concat([{
            feature: 'token',
            behavior: 'refresh'
        }]),
        ...rest,
    }, features) as React.ForwardRefExoticComponent<React.RefAttributes<unknown>>;
}