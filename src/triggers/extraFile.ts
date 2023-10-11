import { CreateTrigger, Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../oak-app-domain/EntityDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';

import { getCos } from '../utils/cos';
import { OakException, RemoveTrigger } from 'oak-domain';

const triggers: Trigger<EntityDict, 'extraFile', BackendRuntimeContext<EntityDict>>[] = [
    {
        name: '生成extraFile需要的上传meta',
        when: 'before',
        entity: 'extraFile',
        action: 'create',
        fn: async ({ operation }, context) => {
            const { data } = operation;

            const formMeta = async (data: EntityDict['extraFile']['OpSchema']): Promise<void> => {
                const { origin } = data;
                const cos = getCos(origin!);
                if (!cos) {
                    throw new OakException(`origin为${origin}的extraFile没有定义Cos类，请调用registerCos注入`);
                }
                await cos.formUploadMeta(data, context);
                Object.assign(data, {
                    uploadState: 'uploading',
                });
            }
            if (data instanceof Array) {
                await Promise.all(
                    data.map(ele => formMeta(ele as EntityDict['extraFile']['OpSchema']))
                );
                return data.length;
            }
            await formMeta(data as EntityDict['extraFile']['OpSchema']);
            return 1;
        }
    } as CreateTrigger<EntityDict, 'extraFile', BackendRuntimeContext<EntityDict>>,
    {
        name: '删除extraFile时远端也进行删除',
        when: 'commit',
        strict: 'makeSure',
        entity: 'extraFile',
        action: 'remove',
        fn: async ({ rows }, context) => {
            for (const extraFile of rows) {
                const { origin } = extraFile;
                const uploader = getCos(origin!);
                await uploader.removeFile(extraFile as EntityDict['extraFile']['OpSchema'], context);
            }
            return 1;
        }
    } as RemoveTrigger<EntityDict, 'extraFile', BackendRuntimeContext<EntityDict>>,
];

export default triggers;
