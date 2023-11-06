import { String, Int, Datetime, Price, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { AbleAction, AbleState, makeAbleActionDef } from 'oak-domain/lib/actions/action';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';
import { ActionDef } from 'oak-domain/lib/types/Action';


export type RedirectToProps = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
};

export interface Schema extends EntityShape {
    title: Text;
    description?: Text;
    targetEntity: String<32>;
    action: String<32>;
    redirectTo: RedirectToProps;
};

type Relation = 'collaborator';
type IState = 'active' | 'done'

type IAction = 'done'; //触发器执行


const IActionDef: ActionDef<IAction, IState> = {
    stm: {
        done: ['active', 'done'],
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
                action: '动作',
                redirectTo: '重定向页面',
            },
            r: {
                collaborator: '协作者',
            },
            action: {
                done: '完成',
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
