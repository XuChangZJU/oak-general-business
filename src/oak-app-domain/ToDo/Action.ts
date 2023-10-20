import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
export type IState = 'active' | 'done' | string;
export type IAction = 'done' | string; //触发器执行
const IActionDef: ActionDef<IAction, IState> = {
    stm: {
        done: ['active', 'done'],
    },
};
export type ParticularAction = IAction;
export const actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "done"];
export type Action = GenericAction | ParticularAction | string;
export const ActionDefDict = {
    iState: IActionDef
};