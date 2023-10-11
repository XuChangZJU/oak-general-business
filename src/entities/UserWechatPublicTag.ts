import { String, Text, Datetime, Boolean, Uint } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as WechatPublicTag } from './WechatPublicTag';
import { Schema as WechatUser } from './WechatUser';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';
import { ActionDef } from 'oak-domain/lib/types/Action';

export interface Schema extends EntityShape {
    wechatPublicTag: WechatPublicTag;
    wechatUser: WechatUser;
    sync: Boolean;
    syncAt: Datetime;
};

type IState =
    | 'wait'
    | 'success'
    | 'fail'

type IAction = 'success' | 'fail';
const IActionDef: ActionDef<IAction, IState> = {
    stm: {
        success: [['wait', 'fail'], 'success'],
        fail: [['wait', 'success'], 'fail']
    },
    is: 'wait',
};
type Action = 'sync' | IAction;

const entityDesc: EntityDesc<
    Schema,
    Action,
    '',
    {
        iState: IState;
    }
> = {
    locales: {
        zh_CN: {
            name: '用户公众号Tag',
            attr: {
                wechatPublicTag: 'tag',
                wechatUser: '微信用户',
                sync: '同步状态',
                syncAt: '同步时间',
                iState: '状态',
            },
            action: {
                sync: '同步',
                success: '成功',
                fail: '失败'
            },
            v: {
                iState: {
                    wait: '待同步',
                    success: '同步成功',
                    fail: '同步失败',
                }
            }
        },
    }
};
