import { EntityDict } from '../../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain'
import { BackendRuntimeContext } from '../../context/BackendRuntimeContext';

import Uploader from "../../types/Uploader";
import { OpSchema } from '../../oak-app-domain/ExtraFile/Schema';

export default class Qiniu<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>> implements Uploader<ED, Cxt> {
    name = 'qiniu';

    async formUploadMeta(extraFile: OpSchema, context: Cxt) {
        throw new Error('method not implemented');
    }

    getUploadInfo(extraFile: OpSchema) {
        throw new Error('method not implemented');
        return {} as any;
    }

    async checkWhetherSuccess(extraFile: OpSchema, context: Cxt) {
        throw new Error('method not implemented');
        return false;
    }

    async removeFile(extraFile: OpSchema, context: Cxt) {
        throw new Error('method not implemented');
    }
};
