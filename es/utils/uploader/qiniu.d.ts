import { EntityDict } from '../../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain';
import { BackendRuntimeContext } from '../../context/BackendRuntimeContext';
import Uploader from "../../types/Uploader";
import { OpSchema } from '../../oak-app-domain/ExtraFile/Schema';
export default class Qiniu<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>> implements Uploader<ED, Cxt> {
    name: string;
    formUploadMeta(extraFile: OpSchema, context: Cxt): Promise<void>;
    getUploadInfo(extraFile: OpSchema): any;
    checkWhetherSuccess(extraFile: OpSchema, context: Cxt): Promise<boolean>;
    removeFile(extraFile: OpSchema, context: Cxt): Promise<void>;
}
