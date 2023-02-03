import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction } from "oak-domain/lib/actions/action";
export declare type IAction = 'succeed' | 'fail' | string;
export declare type IState = 'sending' | 'success' | 'failure' | string;
export declare type VisitState = 'unvisited' | 'visited' | string;
export declare type VisitAction = 'visit' | string;
export declare type ParticularAction = IAction | VisitAction;
export declare type Action = GenericAction | ParticularAction | string;
export declare const actions: string[];
export declare const ActionDefDict: {
    iState: ActionDef<string, string>;
    visitState: ActionDef<string, string>;
};
