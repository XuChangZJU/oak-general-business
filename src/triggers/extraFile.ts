import { CreateTrigger, Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../oak-app-domain/EntityDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';

import { getCos } from '../utils/cos';
import { OakException } from 'oak-domain/lib/types/Exception';
import { RemoveTrigger } from 'oak-domain/lib/types/Trigger';

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
                if (origin === 'unknown') {
                    Object.assign(data, {
                        uploadState: 'success',
                    });
                    return;
                }
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
        fn: async ({ ids }, context) => {
            let number = 0;
            const rows = await context.select('extraFile', {
                data: {
                    id: 1,
                    origin: 1,
                    objectId: 1,
                },
                filter: {
                    id: { $in: ids },
                },
            }, {});
            for (const extraFile of rows) {
                const { origin, objectId } = extraFile;

                // 用objectId来去重，只有当没有还有效的objectId方可删除
                const count = await context.count('extraFile', {
                    filter: {
                        objectId: objectId!,
                    },
                }, {});
                if (count === 0) {
                    const uploader = getCos(origin!);
                    await uploader.removeFile(extraFile as EntityDict['extraFile']['OpSchema'], context);
                    number ++;
                }
            }
            return number;
        }
    } as RemoveTrigger<EntityDict, 'extraFile', BackendRuntimeContext<EntityDict>>,
];

export default triggers;
