import { getCos } from '../utils/cos';
import { OakException } from 'oak-domain/lib/types/Exception';
const triggers = [
    {
        name: '生成extraFile需要的上传meta',
        when: 'before',
        entity: 'extraFile',
        action: 'create',
        fn: async ({ operation }, context) => {
            const { data } = operation;
            const formMeta = async (data) => {
                const { origin } = data;
                if (origin === 'unknown') {
                    Object.assign(data, {
                        uploadState: 'success',
                    });
                    return;
                }
                const cos = getCos(origin);
                if (!cos) {
                    throw new OakException(`origin为${origin}的extraFile没有定义Cos类，请调用registerCos注入`);
                }
                await cos.formUploadMeta(data, context);
                Object.assign(data, {
                    uploadState: 'uploading',
                });
            };
            if (data instanceof Array) {
                await Promise.all(data.map(ele => formMeta(ele)));
                return data.length;
            }
            await formMeta(data);
            return 1;
        }
    },
    {
        name: '删除extraFile时远端也进行删除',
        when: 'commit',
        strict: 'makeSure',
        entity: 'extraFile',
        action: 'remove',
        fn: async ({ ids }, context) => {
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
                        objectId: objectId,
                    },
                }, {});
                if (count === 0) {
                    const uploader = getCos(origin);
                    await uploader.removeFile(extraFile, context);
                }
            }
        }
    },
];
export default triggers;
