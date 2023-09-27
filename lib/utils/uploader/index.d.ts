import { BackendRuntimeContext } from '../../context/BackendRuntimeContext';
import { FrontendRuntimeContext, AspectDict } from '../../context/FrontendRuntimeContext';
import { ED, BRC, FRC } from '../../types/RuntimeCxt';
import Uploader from "../../types/Uploader";
declare const UploaderDict: Record<string, Uploader<ED, BRC, FRC>>;
export default UploaderDict;
/**
 * 注入一个其它OSS上实现的uploader类
 * @param clazz
 */
export declare function registerUploader<ED2 extends ED, Cxt extends BackendRuntimeContext<ED2>, FrontCxt extends FrontendRuntimeContext<ED2, Cxt, AspectDict<ED2, Cxt>>>(clazz: new () => Uploader<ED2, Cxt, FrontCxt>): void;
