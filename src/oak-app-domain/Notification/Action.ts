import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
export type IAction = 'succeed' | 'fail' | string;
export type IState = 'sending' | 'success' | 'failure' | string;
export type ParticularAction = IAction;
export const actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "succeed", "fail"];
const IActionDef: ActionDef<IAction, IState> = {
    stm: {
        succeed: ['sending', 'success'],
        fail: ['sending', 'failure']
    },
    is: 'sending'
};
export type Action = GenericAction | ParticularAction | string;
export const ActionDefDict = {
    iState: IActionDef
};