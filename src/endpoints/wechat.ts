import { Endpoint } from 'oak-domain/lib/types/Endpoint';
import { EntityDict } from '../general-app-domain';
import { BRC } from '../types/RuntimeCxt';
import URL from 'url';
import { WechatPublicConfig } from '../entities/Application';
import sha1 from 'sha1';
import { AccountBookOutlined } from '@ant-design/icons';

type VerifyQuery = {
    applicationId: string,
    signature: string,
    nonce: string,
    timestamp: string,
    echostr: string,
}

function assertFromWeChat(query: VerifyQuery, config: WechatPublicConfig) {
    const { signature, nonce, timestamp } = query;
    const token = config.server?.token as string;
    const stringArray = [nonce, timestamp, token];
    const sign = stringArray.sort().reduce((acc, val) => {
        acc += val;
        return acc;
    });
    const sha1Sign = sha1(sign);
    return signature === sha1Sign;
}

const endpoints: Record<string, Endpoint<EntityDict, BRC>> = {
    wechatApi: {
        name: '微信公众号回调接口',
        method: 'post',
        params: ['appId'],
        fn: async (context, params, body, req, headers) => {
            const { appId } = params as { appId: string };
            throw new Error('not implemented yet');
        },
    },
    wechatVerify: {
        name: '微信公众号验证接口',
        method: 'get',
        // params: ['applicationId'],
        fn: async (context, params, body, req, headers) => {
            const query = URL.parse(req.url as string, true, false).query as VerifyQuery;
            const { applicationId } = query;
            if (!applicationId) {
                throw new Error('applicationId参数不存在');
            }
            const [application] = await context.select(
                'application',
                {
                    data: {
                        id: 1,
                        config: 1,
                    },
                    filter: {
                        id: applicationId,
                    },
                },
                {}
            );
            if (!application) {
                throw new Error(`未找到${applicationId}对应的app`);
            }
            const isWeChat = assertFromWeChat(query, application.config as WechatPublicConfig);
            if (isWeChat) {
                return query.echostr;
            }
            else {
                throw new Error('Verify Failed');
            }
        },
    }
};


export default endpoints;