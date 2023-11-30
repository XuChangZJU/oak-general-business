import { assert } from 'oak-domain/lib/utils/assert';
import Ali from './ali';
import Tencent from './tencent';
const ali = new Ali();
const tencent = new Tencent();
const SmsDict = {
    [ali.name]: ali,
    [tencent.name]: tencent,
};
/**
 * 注入一个其它OSS上实现的uploader类
 * @param clazz
 */
export function registSms(clazz) {
    const instance = new clazz();
    SmsDict[instance.name] = instance;
}
export function getSms(origin) {
    assert(SmsDict.hasOwnProperty(origin));
    return SmsDict[origin];
}
export function getOrigin() {
    return Object.keys(SmsDict);
}
