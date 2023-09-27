import assert from 'assert';
import Qiniu from "./qiniu";
const qiniu = new Qiniu();
const CosDict = {
    [qiniu.name]: qiniu,
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
