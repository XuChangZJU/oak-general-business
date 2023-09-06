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

    async upload(extraFile: OpSchema, confirmUploadFn: () => Promise<void>, uploadFailureFn: (reason: string) => Promise<void>) {
        throw new Error('method not implemented');
    }
};
