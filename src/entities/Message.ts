import { String, Int, Text, Image } from 'oak-domain/lib/types/DataType';
import { Schema as User } from './User';
import { Schema as System } from './System';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Index, ActionDef } from 'oak-domain/lib/types';

type MessageType = 'adminNotification';

export interface Schema extends EntityShape {
    user: User;
    system: System;
    type: 'adminNotification' | 'conversationMessage';
    weight: 'high' | 'medium' | 'low' | 'data';
    desc: Text;
    props: Object;
    data: Object;
    params: Object;
};

type IAction = 'succeed' | 'fail';
type IState = 'sending' | 'success' | 'failure';

type Action = IAction;

const IActionDef: ActionDef<IAction, IState> = {
    stm: {
        succeed: ['sending', 'success'],
        fail: ['sending', 'failure'],
    },
    is: 'sending',
};

const locale: LocaleDef<Schema, Action, '', {
    iState: IState;
    weight: Schema['weight'],
    type: Schema['type'],
}> = {
    zh_CN: {
        attr: {
            desc: '描述',
            user: '关联用户',
            system: '系统',
            type: '消息类型',
            weight: '优先级',
            iState: '状态',
            props: '属性',
            params: '渠道定制参数',
            data: '透传数据'
        },
        action: {
            succeed: '成功',
            fail: '失败',
        },
        v: {
            iState: {
                sending: '发送中',
                success: '发送成功',
                failure: '发送失败',
            },
            weight: {
                high: '高',
                medium: '中',
                low: '低',
                data: '数据',
            },
            type: {
                adminNotification: '管理员通知'
            }
        }
    },
};
