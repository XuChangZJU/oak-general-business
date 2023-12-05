import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
export type IState = 'active' | 'done' | string;
export type IAction = 'complete' | string; //触发器执行
const IActionDef: ActionDef<IAction, IState> = {
    stm: {
        complete: ['active', 'done'],
    },
};
export type ParticularAction = IAction;
export const actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "complete"];
export type Action = GenericAction | ParticularAction | string;
export const ActionDefDict = {
    iState: IActionDef
};