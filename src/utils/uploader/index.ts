import { EntityDict } from '../../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain'
import { BackendRuntimeContext } from '../../context/BackendRuntimeContext';

import Uploader from "../../types/Uploader";
import Qiniu from "./qiniu";

type ED = EntityDict & BaseEntityDict;
const qiniu = new Qiniu<ED, BackendRuntimeContext<ED>>();

const UploaderDict: Record<string, Uploader<ED, BackendRuntimeContext<ED>>> = {
    [qiniu.name]: qiniu,
};

export default UploaderDict;

/**
 * 注入一个其它OSS上实现的uploader类
 * @param clazz 
 */
export function registerUploader<ED2 extends ED, Cxt extends BackendRuntimeContext<ED2>>(clazz: new () => Uploader<ED2, Cxt>) {
    const instance = new clazz();
    UploaderDict[instance.name] = instance as Uploader<ED, BackendRuntimeContext<ED>>;
}
