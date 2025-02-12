import { String, Int, Text, Image } from 'oak-domain/lib/types/DataType';
import { Schema as User } from './User';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Index, ActionDef } from 'oak-domain/lib/types';
import { Channel, Weight } from '../types/Message';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';
import { Schema as System } from './System';
import { Schema as Platform } from './Platform';


export type Router = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
    isTabBar?: boolean; //小程序独有 小程序跳回tabBar的话 必须使用 wx.switchTab
};

type MessageRestriction = {
    systemIds?: string[];        // 允许发送的system
    channels?: Array<Channel>;        // 允许推送的渠道
}

type Chaanels = Channel[];

export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    user: User;
    type: String<64>;
    weight: Weight;
    restriction?: MessageRestriction;
    title: String<256>;
    content: Text;
    data?: Object; // 透传到前台的数据（OpRecords）
    router?: Router; // 通知前端需要到达的路由
    platform?: Platform;
    channels?: Chaanels;
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
};

const VisitActionDef: ActionDef<VisitAction, VisitState> = {
    stm: {
        visit: ['unvisited', 'visited'],
    },
    is: 'unvisited',
};

const entityDesc: EntityDesc<
    Schema,
    Action,
    '',
    {
        visitState: VisitState;
        iState: IState;
        weight: Weight;
    }
> = {
    locales: {
        zh_CN: {
            name: '消息',
            attr: {
                entity: '关联对象',
                entityId: '关联对象ID',
                restriction: '限制',
                title: '标题',
                content: '内容',
                user: '关联用户',
                type: '消息类型',
                weight: '优先级',
                iState: '发送状态',
                visitState: '访问状态',
                router: '目标路由',
                data: '透传数据',
                platform: '平台',
                channels: '渠道',
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
                },
            },
        },
    },
};
