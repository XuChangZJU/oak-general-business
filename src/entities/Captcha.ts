import { ActionType, EntityShape } from 'oak-domain/lib/types/Entity';
import { String, Text, Boolean, Datetime } from 'oak-domain/lib/types/DataType';
import { ActionDef, Index } from 'oak-domain/lib/types';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
    mobile: String<11>;
    code: String<4>;
    visitorId: Text;
    reason?: Text;
    env: Object;
    expired: Boolean;
    expiresAt: Datetime;
    type: 'login' | 'changePassword';
};

type IState = 'unsent' | 'sending' | 'sent' | 'failure';
type IAction = 'send' | 'success' | 'fail';

const IActionDef: ActionDef<IAction, IState> = {
    stm: {
        send: ['unsent', 'sending'],
        success: ['sending', 'sent'],
        fail: ['sending', 'failure'],
    },
    is: 'unsent',
};

type Action = IAction;

const entityDesc: EntityDesc<Schema, Action, '', {
    iState: IState,
    type: Schema['type']
}> = {
    locales: {
        zh_CN: {
            name: '验证码',
            attr: {
                mobile: '手机号',
                code: '验证码',
                visitorId: '用户标识',
                reason: '失败原因',
                env: '用户环境',
                expired: '是否过期',
                expiresAt: '过期时间',
                iState: '状态',
                type: '类型',
            },
            action: {
                send: '发送',
                fail: '失败',
                success: '成功',
            },
            v: {
                iState: {
                    unsent: '未发送',
                    sending: '发送中',
                    sent: '已发送',
                    failure: '已失败',
                },
                type: {
                    login: '登录',
                    changePassword: '修改密码'
                }
            },
        },
    },
    indexes: [
        {
            name: 'index_mobile_code',
            attributes: [
                {
                    name: 'mobile',
                    direction: 'ASC',
                },
                {
                    name: 'code',
                    direction: 'ASC',
                },
                {
                    name: '$$createAt$$',
                    direction: 'DESC',
                }
            ],
        },
    ]
};
