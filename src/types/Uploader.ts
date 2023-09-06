import { EntityDict } from '../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain'
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';

export default interface Uploader<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>>{
    name: string;

    /**
     * 注入在后台extrafile生成之前
     * @param extraFile，要生成的extraFile数据 
     * @param context 后台上下文
     * @returns 
     */
    formUploadMeta: (extraFile: EntityDict['extraFile']['OpSchema'], context: Cxt) => Promise<void>;

    /**
     * 前台在生成extraFile返回之后调用此函数，进行对文件的真正上传
     * 上传成功后，OSS服务器尽量使用通过后台回调服务器的方式去确认上传，若OSS不提供此能力则由前台调用confirmUploadFn去通知后台（实现者尽量不要调用）
     * 上传失败，调用uploadFailureFn进行数据的处理
     * @param extraFile 
     * @returns 
     */
    upload: (extraFile: EntityDict['extraFile']['OpSchema'], confirmUploadFn: () => Promise<void>, uploadFailureFn: (reason: string) => Promise<void>) => Promise<void>;
}