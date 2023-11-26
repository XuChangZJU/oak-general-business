import { assert } from 'oak-domain/lib/utils/assert';
import { getCos } from '../utils/cos';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { groupBy } from 'oak-domain/lib/utils/lodash';
async function checkWhetherSuccess(context, applicationId, rows) {
    const successIds = [];
    const failedIds = [];
    await context.setApplication(applicationId);
    for (const d of rows) {
        const { origin } = d;
        const cos = getCos(origin);
        assert(cos);
        const success = await cos.checkWhetherSuccess(d, context);
        if (success) {
            successIds.push(d.id);
        }
        else {
            failedIds.push(d.id);
        }
    }
    if (successIds.length > 0) {
        await context.operate('extraFile', {
            id: await generateNewIdAsync(),
            action: 'update',
            data: {
                uploadState: 'success',
            },
            filter: {
                id: {
                    $in: successIds,
                }
            }
        }, {});
    }
    if (failedIds.length > 0) {
        await context.operate('extraFile', {
            id: await generateNewIdAsync(),
            action: 'update',
            data: {
                uploadState: 'failed',
            },
            filter: {
                id: {
                    $in: successIds,
                }
            }
        }, {});
    }
}
const watchers = [
    {
        name: '确定uploading的文件状态',
        entity: 'extraFile',
        filter: async () => {
            const now = Date.now();
            const deadline = process.env.NODE_ENV === 'production' ? now - 3600 * 1000 : now - 60 * 1000;
            return {
                $$updateAt$$: {
                    $lt: deadline,
                },
                uploadState: 'uploading',
            };
        },
        projection: {
            id: 1,
            applicationId: 1,
            origin: 1,
            bucket: 1,
            uploadState: 1,
            objectId: 1,
            extension: 1,
        },
        fn: async (context, data) => {
            const eg = groupBy(data, 'applicationId');
            for (const appId in eg) {
                await checkWhetherSuccess(context, appId, eg[appId]);
            }
            return {
                extraFile: {
                    update: data.length,
                }
            };
        }
    },
];
export default watchers;
