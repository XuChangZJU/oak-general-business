import { assert } from 'oak-domain/lib/utils/assert';
import Ali from './ali';
import Tencent from './tencent';
import CTYun from './ctyun';
const ali = new Ali();
const tencent = new Tencent();
const ctyun = new CTYun();
const SmsDict = {
    [ali.name]: ali,
    [tencent.name]: tencent,
    [ctyun.name]: ctyun,
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
