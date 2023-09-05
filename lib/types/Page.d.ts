import React from 'react';
import { OakComponentOption as BaseOakComponentOption, DataOption, MethodOption, ReactComponentProps } from 'oak-frontend-base';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict } from '../oak-app-domain';
import { Aspect } from 'oak-domain/lib/types/Aspect';
import { Feature } from 'oak-frontend-base';
import { BasicFeatures } from 'oak-frontend-base';
import { CommonAspectDict } from 'oak-common-aspect';
import { GeneralFeatures } from '../features';
import GeneralAspectDict from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
export declare type OakComponentOption<IsList extends boolean, ED extends EntityDict & BaseEntityDict, T extends keyof ED, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD & GAD<ED, Cxt>>, AD extends Record<string, Aspect<ED, Cxt>>, FD extends Record<string, Feature>, FormedData extends Record<string, any>, TData extends Record<string, any>, TProperty extends DataOption, TMethod extends Record<string, Function>> = BaseOakComponentOption<IsList, ED, T, Cxt, FrontCxt, AD & GAD<ED, Cxt>, FD & GFD<ED, Cxt, FrontCxt, AD & GAD<ED, Cxt>>, FormedData, TData, TProperty, TMethod, {
    subscribeMpMessage: (messageTypes: string[], haveToAccept?: boolean, tip?: string) => Promise<boolean>;
}> & Partial<{
    wechatMp: {
        relatedMessageTypes?: string[];
    };
}>;
export declare type GAD<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>> = GeneralAspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>;
declare type BF<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends GAD<ED, Cxt>> = BasicFeatures<ED, Cxt, FrontCxt, AD>;
declare type GF<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends GAD<ED, Cxt>> = GeneralFeatures<ED, Cxt, FrontCxt, AD>;
export declare type GFD<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends GAD<ED, Cxt>> = BF<ED, Cxt, FrontCxt, AD> & GF<ED, Cxt, FrontCxt, AD>;
export declare type MakeOakComponent<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD & GAD<ED, Cxt>>, AD extends Record<string, Aspect<ED, Cxt>>, FD extends Record<string, Feature>> = <IsList extends boolean, T extends keyof ED, FormedData extends DataOption, TData extends DataOption, TProperty extends DataOption, TMethod extends MethodOption>(options: OakComponentOption<IsList, ED, T, Cxt, FrontCxt, AD, FD, FormedData, TData, TProperty, TMethod>) => (props: ReactComponentProps<ED, T, IsList, TProperty>) => React.ReactElement;
export {};
