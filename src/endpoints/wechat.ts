import { Endpoint } from 'oak-domain/lib/types/Endpoint';
import { EntityDict } from '../general-app-domain';
import { BRC } from '../types/RuntimeCxt';

const endpoints: Record<string, Endpoint<EntityDict, BRC>> = {
    wechatApi: {
        name: '微信公众号回调接口',
        method: 'post',
        params: ['appId'],
        fn: async (context, params, body, headers) => {
            const { appId } = params as { appId: string };
            throw new Error('not implemented yet');
        },
    }
};

export default endpoints;