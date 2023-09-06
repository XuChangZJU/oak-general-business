import { CreateTrigger, Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../oak-app-domain/EntityDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';

import UploaderDict from '../utils/uploader';
import { OakException } from 'oak-domain';

const triggers: Trigger<EntityDict, 'extraFile', BackendRuntimeContext<EntityDict>>[] = [
    {
        name: '生成extraFile需要的上传meta',
        when: 'before',
        entity: 'extraFile',
        action: 'create',
        fn: async({ operation }, context) => {
            const { data } = operation;

            const formMeta = async(data: EntityDict['extraFile']['OpSchema']) => {
                const { origin } = data;
                const uploader = UploaderDict[origin];
                if (!uploader) {
                    throw new OakException(`origin为${origin}的extraFile没有定义上传类，请调用registerUploader注入`);
                }
                await uploader.formUploadMeta(data, context);
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
];

export default triggers;
