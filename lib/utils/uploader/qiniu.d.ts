import { EntityDict } from '../../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain';
import { BackendRuntimeContext } from '../../context/BackendRuntimeContext';
import Uploader from "../../types/Uploader";
import { OpSchema } from '../../oak-app-domain/ExtraFile/Schema';
export default class Qiniu<ED extends EntityDict & BaseEntityDict> implements Uploader<ED> {
    name: string;
    formUploadMeta(extraFile: OpSchema, context: BackendRuntimeContext<ED>): Promise<void>;
    upload(extraFile: OpSchema, uploadFn: (name: string, // 文件的part name
    uploadUrl: string, // 上传的url
    formData: Record<string, any>, // 上传的其它part参数
    autoInform: boolean, // 上传成功是否会自动通知server（若不会则需要前台显式通知）
    file: string | File) => Promise<any>, file: string | File): Promise<void>;
    checkWhetherSuccess(extraFile: OpSchema, context: BackendRuntimeContext<ED>): Promise<boolean>;
    removeFile(extraFile: OpSchema, context: BackendRuntimeContext<ED>): Promise<void>;
}
