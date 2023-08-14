import { ComponentPublicThisType, DataOption } from 'oak-frontend-base/lib/types/Page';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict } from './oak-app-domain';
import { BasicFeatures } from 'oak-frontend-base/lib/features/index';
import { CommonAspectDict } from 'oak-common-aspect';
import { BackendRuntimeContext } from './context/BackendRuntimeContext';
import { FrontendRuntimeContext } from './context/FrontendRuntimeContext';
import { GAD, GFD, OakComponentOption } from './types/Page';
/**
 * 这里的逻辑暴露出去，是为了让general可以被其它库重载
 * @param this
 * @param messageTypes
 * @param haveToAccept
 * @param action
 * @param messageProps
 * @returns
 */
export declare function subscribeMpMessage<IsList extends boolean, ED extends EntityDict & BaseEntityDict, T extends keyof ED, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends GAD<ED, Cxt>, FD extends GFD<ED, Cxt, FrontCxt, AD>, FormedData extends Record<string, any>, TData extends Record<string, any> = {}, TProperty extends DataOption = {}, TMethod extends Record<string, Function> = {}>(this: ComponentPublicThisType<ED, T, Cxt, FrontCxt, AD, FD, FormedData, IsList, TData, TProperty, TMethod>, messageTypes: string[], haveToAccept?: boolean, tip?: string): Promise<boolean>;
export declare function createComponent<IsList extends boolean, ED extends EntityDict & BaseEntityDict, T extends keyof ED, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends GAD<ED, Cxt>, FD extends GFD<ED, Cxt, FrontCxt, AD>, FormedData extends Record<string, any>, TData extends Record<string, any> = {}, TProperty extends DataOption = {}, TMethod extends Record<string, Function> = {}>(option: OakComponentOption<IsList, ED, T, Cxt, FrontCxt, AD, FD, FormedData, TData, TProperty, TMethod>, features: BasicFeatures<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>> & FD): string;
