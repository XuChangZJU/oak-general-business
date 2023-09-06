import { EntityDict } from '../oak-app-domain/EntityDict';
import { Trigger, CreateTrigger } from 'oak-domain/lib/types';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { assert } from 'oak-domain/lib/utils/assert';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { OakPreConditionUnsetException } from 'oak-domain/lib/types';
import { RuntimeCxt } from '../types/RuntimeCxt';
import { getUploadInfo } from '../aspects/extraFile';

const triggers: Trigger<
    EntityDict,
    'extraFile',
    BackendRuntimeContext<EntityDict>
>[] = [
        {
            name: '创建extraFile时，获取uploadInfo并赋值',
            entity: 'extraFile',
            action: 'create',
            when: 'before',
            fn: async ({ operation }, context) => {
                const {
                    data, filter
                } = operation;
                const setUploadInfo = async (extraFile: EntityDict['extraFile']['CreateSingle']['data']) => {
                    const uploaInfo = await getUploadInfo({ extraFile }, context as BackendRuntimeContext<EntityDict>)
                    Object.assign(data, { getUploadInfo });
                }
                if (data instanceof Array) {
                    for (const row of data) {
                        setUploadInfo(row);
                    }
                } else {
                    setUploadInfo(data);
                }
                return 0;
            },
        } as CreateTrigger<EntityDict, 'extraFile', RuntimeCxt>,
        {
            name: '在删除extraFile前，若已上传成功，则将对应的远端文件也进行删除',
            entity: 'extraFile',
            action: 'remove',
            when: 'before',
            fn: async (event: any, context: any) => {
                const {
                    operation: { data, filter },
                } = event;

                //todo
                return 0;
            },
        },
    ];
export default triggers;
