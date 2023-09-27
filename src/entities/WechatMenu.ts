import { String, Text, Datetime, Boolean, Uint, Int } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { ActionDef } from 'oak-domain/lib/types/Action';
import { Schema as Application } from './Application';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';
import { Schema as WechatPublicTag } from './WechatPublicTag';

type Config = {
    button: any[],
    matchrule?: {
        tag_id?: string,
    },
};
export interface Schema extends EntityShape {
    menuId?: Int<4>;
    menuConfig: Config;
    application: Application;
    wechatPublicTag?: WechatPublicTag;
};

type IAction = 'success' | 'fail';
type IState =
    | 'wait'
    | 'success'
    | 'fail'
const IActionDef: ActionDef<IAction, IState> = {
    stm: {
        success: [['wait', 'fail'], 'success'],
        fail: [['wait', 'success'], 'fail']
    },
    is: 'wait',
};

type Action = IAction | 'publish';

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
            name: '微信菜单',
            attr: {
                menuId: '菜单Id',
                menuConfig: '菜单配置',
                application: '应用',
                wechatPublicTag: '标签',
                iState: '状态',
            },
            action: {
                publish: '保存并发布',
                success: '发布成功',
                fail: '发布失败',
            },
            v: {
                iState: {
                    wait: '等待发布',
                    success: '发布成功',
                    fail: '发布失败',
                }
            }
        },
    },
};

