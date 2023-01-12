import { String, Int, Text, Image } from 'oak-domain/lib/types/DataType';
import { Schema as User } from './User';
import { Schema as System } from './System';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Index, ActionDef } from 'oak-domain/lib/types';

type MessageParams = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
};

export interface Schema extends EntityShape {
    user: User;
    system: System;
    type: String<64>;
    weight: 'high' | 'medium' | 'low' | 'data';
    title: String<32>;
    content: Text;
    props: Object; // 消息的结构化数据（用于向各个渠道推送时的格式化）
    data?: Object; // 透传到前台的数据（OpRecords）
    params?: MessageParams; // 通知前端需要到达的路由
};

type IAction = 'succeed' | 'fail';
type IState = 'sending' | 'success' | 'failure';

type VisitState = 'unvisited' | 'visited';
type VisitAction = 'visit';

type Action = IAction | VisitAction;

const IActionDef: ActionDef<IAction, IState> = {
    stm: {
        succeed: ['sending', 'success'],
        fail: ['sending', 'failure'],
    },
    is: 'sending',
};

const VisitActionDef: ActionDef<VisitAction, VisitState> = {
    stm: {
        visit: ['unvisited', 'visited'],
    },
    is: 'unvisited',
};

const locale: LocaleDef<
    Schema,
    Action,
    '',
    {
        visitState: VisitState,
        iState: IState;
        weight: Schema['weight'];
    }
> = {
    zh_CN: {
        attr: {
            title: '标题',
            content: '内容',
            user: '关联用户',
            system: '系统',
            type: '消息类型',
            weight: '优先级',
            iState: '发送状态',
            visitState: '访问状态',
            props: '属性',
            params: '渠道定制参数',
            data: '透传数据',
        },
        action: {
            succeed: '成功',
            fail: '失败',
            visit: '阅读',
        },
        v: {
            iState: {
                sending: '发送中',
                success: '发送成功',
                failure: '发送失败',
            },
            visitState: {
                unvisited: '未读',
                visited: '已读',
            },
            weight: {
                high: '高',
                medium: '中',
                low: '低',
                data: '数据',
            },
        },
    },
};
