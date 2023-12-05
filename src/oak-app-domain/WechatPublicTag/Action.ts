import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
export type IState = 'wait' | 'success' | 'fail' | string;
export type IAction = 'success' | 'fail' | string;
const IActionDef: ActionDef<IAction, IState> = {
    stm: {
        success: [['wait', 'fail'], 'success'],
        fail: [['wait', 'success'], 'fail']
    },
    is: 'wait',
};
export type ParticularAction = 'sync' | IAction;
export const actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "sync", "success", "fail"];
export type Action = GenericAction | ParticularAction | string;
export const ActionDefDict = {
    iState: IActionDef
};