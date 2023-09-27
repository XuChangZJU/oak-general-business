import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
export type IState = 'unsent' | 'sending' | 'sent' | 'failure' | string;
export type IAction = 'send' | 'success' | 'fail' | string;
const IActionDef: ActionDef<IAction, IState> = {
    stm: {
        send: ['unsent', 'sending'],
        success: ['sending', 'sent'],
        fail: ['sending', 'failure']
    },
    is: 'unsent'
};
export type ParticularAction = IAction;
export const actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "send", "success", "fail"];
export type Action = GenericAction | ParticularAction | string;
export const ActionDefDict = {
    iState: IActionDef
};