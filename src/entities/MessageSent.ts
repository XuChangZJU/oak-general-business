import { String, Int, Text, Image } from 'oak-domain/lib/types/DataType';
import { Schema as Message } from './Message';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Index, ActionDef } from 'oak-domain/lib/types';

export interface Schema extends EntityShape {
    channel: 'wechat' | 'jPush' | 'jim' | 'mp' | 'sms',
    data: Object,
    message: Message,
    data1: Object,
    data2: Object,
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
    channel: Schema['channel']
}> = {
    zh_CN: {
        attr: {
            channel: '消息渠道',
            data: '消息数据',
            message: '消息',
            data1: '数据1',
            data2: '数据2',
            iState: '状态',
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
            channel: {
                wechat: '公众号',
                jPush: '极光推送',
                jim: '极光消息',
                mp: '小程序',
                sms: '短信',
            }
        }
    },
};
