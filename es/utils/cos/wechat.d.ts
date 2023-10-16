import { ED, BRC, FRC } from '../../types/RuntimeCxt';
import Cos from "../../types/Cos";
import { OpSchema } from '../../oak-app-domain/ExtraFile/Schema';
export default class Wechat implements Cos<ED, BRC, FRC> {
    name: string;
    autoInform(): boolean;
    private formKey;
    formUploadMeta(extraFile: OpSchema, context: BRC): Promise<void>;
    upload(extraFile: OpSchema, uploadFn: (file: File | string, name: string, // 文件的part name
    uploadUrl: string, // 上传的url
    formData: Record<string, any>, // 上传的其它part参数
    autoInform?: boolean) => Promise<any>, file: string | File): Promise<void>;
    composeFileUrl(extraFile: ED['extraFile']['OpSchema'], context: FRC, style?: string): string;
    checkWhetherSuccess(extraFile: OpSchema, context: BRC): Promise<boolean>;
    removeFile(extraFile: OpSchema, context: BRC): Promise<void>;
}
