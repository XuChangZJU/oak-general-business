import { EntityDict } from '../../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain';
import { BackendRuntimeContext } from '../../context/BackendRuntimeContext';
import Uploader from "../../types/Uploader";
type ED = EntityDict & BaseEntityDict;
declare const UploaderDict: Record<string, Uploader<ED>>;
export default UploaderDict;
/**
 * 注入一个其它OSS上实现的uploader类
 * @param clazz
 */
export declare function registerUploader<ED2 extends ED, Cxt extends BackendRuntimeContext<ED2>>(clazz: new () => Uploader<ED2>): void;
