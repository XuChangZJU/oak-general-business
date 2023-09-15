import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction } from "oak-domain/lib/actions/action";
export type IAction = 'succeed' | 'fail' | string;
export type IState = 'sending' | 'success' | 'failure' | string;
export type VisitState = 'unvisited' | 'visited' | string;
export type VisitAction = 'visit' | string;
export type ParticularAction = IAction | VisitAction;
export declare const actions: string[];
export type Action = GenericAction | ParticularAction | string;
export declare const ActionDefDict: {
    iState: ActionDef<string, string>;
    visitState: ActionDef<string, string>;
};
