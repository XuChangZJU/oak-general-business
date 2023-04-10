import { OakComponentOption as BaseOakComponentOption, DataOption, MethodOption, ReactComponentProps } from 'oak-frontend-base/lib/types/Page';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict } from '../general-app-domain';
import { Aspect } from 'oak-domain/lib/types/Aspect';
import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { BasicFeatures } from 'oak-frontend-base/lib/features/index';
import { CommonAspectDict } from 'oak-common-aspect';
import { GeneralFeatures } from '../features';
import { AspectDict as GeneralAspectDict } from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';

export type OakComponentOption<
    ED extends EntityDict & BaseEntityDict,
    T extends keyof ED,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD & GAD<ED, Cxt>>,
    AD extends Record<string, Aspect<ED, Cxt>>,
    FD extends Record<string, Feature>,
    FormedData extends Record<string, any>,
    IsList extends boolean,
    TData extends Record<string, any>,
    TProperty extends DataOption,
    TMethod extends Record<string, Function>,
> = BaseOakComponentOption<ED, T, Cxt, FrontCxt, AD & GAD<ED, Cxt>, FD & GFD<ED, Cxt, FrontCxt, AD & GAD<ED, Cxt>>, FormedData, IsList, TData, TProperty, TMethod, {
    subscribeMpMessage: (messageTypes: string[], haveToAccept?: boolean, tip?: string) => Promise<boolean>;
}> & Partial<{
    wechatMp: {
        relatedMessageTypes?: string[];
    }
}>;

export type GAD<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>> = GeneralAspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>;

type BF<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends GAD<ED, Cxt>> = BasicFeatures<ED, Cxt, FrontCxt, AD>;

type GF<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends GAD<ED, Cxt>> = GeneralFeatures<ED, Cxt, FrontCxt, AD>;

export type GFD<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends GAD<ED, Cxt>> = BF<ED, Cxt, FrontCxt, AD> & GF<ED, Cxt, FrontCxt, AD>;


export type MakeOakComponent<
    ED extends EntityDict & BaseEntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD & GAD<ED, Cxt>>,
    AD extends Record<string, Aspect<ED, Cxt>>,
    FD extends Record<string, Feature>
> = <
    T extends keyof ED,
    FormedData extends DataOption,
    IsList extends boolean,
    TData extends DataOption,
    TProperty extends DataOption,
    TMethod extends MethodOption
>(
    options: OakComponentOption<
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
    >
) => (props: ReactComponentProps<ED, T, IsList, TProperty>) => React.ReactElement;