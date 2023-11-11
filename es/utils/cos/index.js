import { assert } from 'oak-domain/lib/utils/assert';
import Qiniu from './qiniu';
import Wechat from './wechat';
const qiniu = new Qiniu();
const wechat = new Wechat();
const CosDict = {
    [qiniu.name]: qiniu,
    [wechat.name]: wechat,
};
/**
 * 注入一个其它OSS上实现的uploader类
 * @param clazz
 */
export function registerCos(clazz) {
    const instance = new clazz();
    CosDict[instance.name] = instance;
}
export function getCos(origin) {
    assert(CosDict.hasOwnProperty(origin));
    return CosDict[origin];
}
export function composeFileUrl(extraFile, context, style) {
    const { origin } = extraFile;
    const cos = CosDict[origin];
    return cos.composeFileUrl(extraFile, context, style);
}
