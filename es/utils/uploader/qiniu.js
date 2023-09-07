export default class Qiniu {
    name = 'qiniu';
    async formUploadMeta(extraFile, context) {
        throw new Error('method not implemented');
    }
    getUploadInfo(extraFile) {
        throw new Error('method not implemented');
        return {};
    }
    async checkWhetherSuccess(extraFile, context) {
        throw new Error('method not implemented');
        return false;
    }
    async removeFile(extraFile, context) {
        throw new Error('method not implemented');
    }
}
;
