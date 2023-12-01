import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
export type IAction = 'succeed' | 'fail' | string;
export type IState = 'sending' | 'success' | 'failure' | string;
export type VisitState = 'unvisited' | 'visited' | string;
export type VisitAction = 'visit' | string;
export type ParticularAction = IAction | VisitAction;
export const actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "succeed", "fail", "visit"];
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
export type Action = GenericAction | ParticularAction | string;
export const ActionDefDict = {
    iState: IActionDef,
    visitState: VisitActionDef
};