import assert from 'assert';
import { BackendRuntimeContext } from '../../context/BackendRuntimeContext';
import { FrontendRuntimeContext, AspectDict } from '../../context/FrontendRuntimeContext';
import { ED, BRC, FRC } from '../../types/RuntimeCxt';

import Cos from "../../types/Cos";
import Qiniu from "./qiniu";

const qiniu = new Qiniu();

const CosDict: Record<string, any> = {
    [qiniu.name]: qiniu,
};

/**
 * 注入一个其它OSS上实现的uploader类
 * @param clazz 
 */
export function registerCos<
    ED2 extends ED,
    Cxt extends BackendRuntimeContext<ED2>,
    FrontCxt extends FrontendRuntimeContext<ED2, Cxt, AspectDict<ED2, Cxt>>>(clazz: new () => Cos<ED2, Cxt, FrontCxt>) {
    const instance = new clazz();
    CosDict[instance.name] = instance;
}

export function getCos<
    ED2 extends ED,
    Cxt extends BackendRuntimeContext<ED2>,
    FrontCxt extends FrontendRuntimeContext<ED2, Cxt, AspectDict<ED2, Cxt>>>(origin: string) {
    assert(CosDict.hasOwnProperty(origin));
    return CosDict[origin] as Cos<ED2, Cxt, FrontCxt>;
}

export function composeFileUrl<
    ED2 extends ED,
    Cxt extends BackendRuntimeContext<ED2>,
    FrontCxt extends FrontendRuntimeContext<ED2, Cxt, AspectDict<ED2, Cxt>>>(
        extraFile: ED2['extraFile']['OpSchema'],
        context: Cxt | FrontCxt,
        style?: string) {
    const { origin } = extraFile;
    const cos = CosDict[origin];
    return cos.composeFileUrl(extraFile, context as any, style);
}

