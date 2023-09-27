import { BackendRuntimeContext } from '../../context/BackendRuntimeContext';
import { FrontendRuntimeContext, AspectDict } from '../../context/FrontendRuntimeContext';
import { ED } from '../../types/RuntimeCxt';
import Cos from "../../types/Cos";
/**
 * 注入一个其它OSS上实现的uploader类
 * @param clazz
 */
export declare function registerCos<ED2 extends ED, Cxt extends BackendRuntimeContext<ED2>, FrontCxt extends FrontendRuntimeContext<ED2, Cxt, AspectDict<ED2, Cxt>>>(clazz: new () => Cos<ED2, Cxt, FrontCxt>): void;
export declare function getCos<ED2 extends ED, Cxt extends BackendRuntimeContext<ED2>, FrontCxt extends FrontendRuntimeContext<ED2, Cxt, AspectDict<ED2, Cxt>>>(origin: string): Cos<ED2, Cxt, FrontCxt>;
export declare function composeFileUrl<ED2 extends ED, Cxt extends BackendRuntimeContext<ED2>, FrontCxt extends FrontendRuntimeContext<ED2, Cxt, AspectDict<ED2, Cxt>>>(extraFile: ED2['extraFile']['OpSchema'], context: Cxt | FrontCxt, style?: string): any;
