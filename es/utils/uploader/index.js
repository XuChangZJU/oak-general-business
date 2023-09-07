import Qiniu from "./qiniu";
const qiniu = new Qiniu();
const UploaderDict = {
    [qiniu.name]: qiniu,
};
export default UploaderDict;
/**
 * 注入一个其它OSS上实现的uploader类
 * @param clazz
 */
export function registerUploader(clazz) {
    const instance = new clazz();
    UploaderDict[instance.name] = instance;
}
