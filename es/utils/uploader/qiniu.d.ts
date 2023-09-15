import { EntityDict } from '../../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain';
import { BackendRuntimeContext } from '../../context/BackendRuntimeContext';
import Uploader from "../../types/Uploader";
import { OpSchema } from '../../oak-app-domain/ExtraFile/Schema';
import { Config } from '../../types/Config';
export default class Qiniu<ED extends EntityDict & BaseEntityDict> implements Uploader<ED> {
    name: string;
    formUploadMeta(extraFile: OpSchema, context: BackendRuntimeContext<ED>): Promise<void>;
    upload(extraFile: OpSchema, uploadFn: (file: File | string, name: string, // 文件的part name
    uploadUrl: string, // 上传的url
    formData: Record<string, any>, // 上传的其它part参数
    autoInform?: boolean) => Promise<any>, file: string | File): Promise<void>;
    composeFileUrl(extraFile: EntityDict['extraFile']['OpSchema'], config: Config, style?: string): string;
    checkWhetherSuccess(extraFile: OpSchema, context: BackendRuntimeContext<ED>): Promise<boolean>;
    removeFile(extraFile: OpSchema, context: BackendRuntimeContext<ED>): Promise<void>;
}
