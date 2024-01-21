import { String, Int, Datetime, Price, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { AbleAction, AbleState, makeAbleActionDef } from 'oak-domain/lib/actions/action';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';
import { ActionDef } from 'oak-domain/lib/types/Action';


export type RedirectToProps = {
    batchPath: string;
    singlePath?: string;
};

export interface Schema extends EntityShape {
    title: Text;
    description?: Text;
    targetEntity: String<32>;
    targetFilter: Object;
    action: String<32>;
    redirectTo: RedirectToProps;
    entity: String<32>;
    entityId: String<64>;
};

type Relation = 'collaborator';
type IState = 'active' | 'done'

type IAction = 'complete'; //触发器执行


const IActionDef: ActionDef<IAction, IState> = {
    stm: {
        complete: ['active', 'done'],
    },
};

type Action = IAction;


const entityDesc: EntityDesc<
    Schema,
    Action,
    Relation,
    {
        iState: IState;
    }
> = {
    locales: {
        zh_CN: {
            name: '待办',
            attr: {
                iState: '状态',
                title: '标题',
                description: '描述',
                targetEntity: '对象实体',
                targetFilter: '过滤条件',
                action: '动作',
                redirectTo: '重定向页面',
                entity: '关联对象',
                entityId: '关联对象id',
            },
            r: {
                collaborator: '协作者',
            },
            action: {
                complete: '完成',
            },
            v: {
                iState: {
                    active: '待办',
                    done: '已完成',
                },
            },
        },
    },
};
