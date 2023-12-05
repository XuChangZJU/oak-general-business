import { BackendRuntimeContext } from '../../context/BackendRuntimeContext';
import { FrontendRuntimeContext, AspectDict } from '../../context/FrontendRuntimeContext';
import { ED } from '../../types/RuntimeCxt';
import Sms from '../../types/Sms';
/**
 * 注入一个其它OSS上实现的uploader类
 * @param clazz
 */
export declare function registSms<ED2 extends ED, Cxt extends BackendRuntimeContext<ED2>, FrontCxt extends FrontendRuntimeContext<ED2, Cxt, AspectDict<ED2, Cxt>>>(clazz: new () => Sms<ED2, Cxt>): void;
export declare function getSms<ED2 extends ED, Cxt extends BackendRuntimeContext<ED2>, FrontCxt extends FrontendRuntimeContext<ED2, Cxt, AspectDict<ED2, Cxt>>>(origin: string): Sms<ED2, Cxt>;
export declare function getOrigin<ED2 extends ED, Cxt extends BackendRuntimeContext<ED2>, FrontCxt extends FrontendRuntimeContext<ED2, Cxt, AspectDict<ED2, Cxt>>>(): string[];
