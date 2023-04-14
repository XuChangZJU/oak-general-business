import {
    String,
} from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Index, ActionDef } from 'oak-domain/lib/types';
import { Channel } from '../types/Message';
import { Schema as Application } from './Application';
import { Schema as MessageSystem } from './MessageSystem';

export interface Schema extends EntityShape {
    channel: Channel,
    application?: Application,
    data?: Object,
    messageSystem: MessageSystem,
    data1?: Object,
    data2?: Object,
    templateId?: String<128>;
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
        name: '通知',
        attr: {
            channel: '消息渠道',
            data: '消息数据',
            messageSystem: '消息系统连接',
            data1: '数据1',
            data2: '数据2',
            iState: '状态',
            application: '关联应用',
            templateId: '模板id'
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
                wechatPublic: '公众号',
                jPush: '极光推送',
                jim: '极光消息',
                wechatMp: '小程序',
                sms: '短信',
            }
        }
    },
};
