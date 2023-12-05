import { assert } from 'oak-domain/lib/utils/assert';
import { BackendRuntimeContext } from '../../context/BackendRuntimeContext';
import {
    FrontendRuntimeContext,
    AspectDict,
} from '../../context/FrontendRuntimeContext';
import { ED, BRC, FRC } from '../../types/RuntimeCxt';

import Sms from '../../types/Sms';

import Ali from './ali';
import Tencent from './tencent';

const ali = new Ali();
const tencent = new Tencent();

const SmsDict: Record<string, any> = {
    [ali.name]: ali,
    [tencent.name]: tencent,
};


/**
 * 注入一个其它OSS上实现的uploader类
 * @param clazz
 */
export function registSms<
    ED2 extends ED,
    Cxt extends BackendRuntimeContext<ED2>,
    FrontCxt extends FrontendRuntimeContext<ED2, Cxt, AspectDict<ED2, Cxt>>
>(clazz: new () => Sms<ED2, Cxt>) {
    const instance = new clazz();
    SmsDict[instance.name] = instance;
}

export function getSms<
    ED2 extends ED,
    Cxt extends BackendRuntimeContext<ED2>,
    FrontCxt extends FrontendRuntimeContext<ED2, Cxt, AspectDict<ED2, Cxt>>
>(origin: string) {
    assert(SmsDict.hasOwnProperty(origin));
    return SmsDict[origin] as Sms<ED2, Cxt>;
}

export function getOrigin<ED2 extends ED,
    Cxt extends BackendRuntimeContext<ED2>,
    FrontCxt extends FrontendRuntimeContext<ED2, Cxt, AspectDict<ED2, Cxt>>
>() {
    return Object.keys(SmsDict);
}   