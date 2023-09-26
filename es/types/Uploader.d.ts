import { EntityDict } from '../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext, AspectDict } from '../context/FrontendRuntimeContext';
export default interface Uploader<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AspectDict<ED, Cxt>>> {
    name: string;
    /**
     * 注入在后台extrafile生成之前，将上传所需要的token等信息生成并存放在uploadMeta属性中
     * @param extraFile，要生成的extraFile数据
     * @param context 后台上下文
     * @returns
     */
    formUploadMeta: (extraFile: EntityDict['extraFile']['OpSchema'], context: Cxt) => Promise<void>;
    /**
     * 前台在生成extraFile返回之后调用此函数，获得上传OSS的相应参数
     * 上传成功后，OSS服务器尽量使用通过后台回调服务器的方式去确认上传，若OSS不提供此能力则将autoInform置为false，前台主动在上传成功之后去更新
     * @param extraFile
     * @returns
     */
    upload: (extraFile: EntityDict['extraFile']['OpSchema'], uploadFn: (file: File | string, name: string, // 文件的part name
    uploadUrl: string, // 上传的url
    formData: Record<string, any>, // 上传的其它part参数
    autoInform?: boolean) => Promise<any>, file: string | File) => Promise<void>;
    composeFileUrl: (extraFile: EntityDict['extraFile']['OpSchema'], context: FrontCxt, style?: string) => string;
    /**
     * 后台对upload是否成功不确定的文件，向OSS发起主动确认
     * @param extraFile
     * @returns 是否已经上传OSS成功
     */
    checkWhetherSuccess: (extraFile: EntityDict['extraFile']['OpSchema'], context: Cxt) => Promise<boolean>;
    /**
     * 后台向OSS发起删除命令
     * @param extraFile
     * @param context
     * @returns
     */
    removeFile: (extraFile: EntityDict['extraFile']['OpSchema'], context: Cxt) => Promise<void>;
}
