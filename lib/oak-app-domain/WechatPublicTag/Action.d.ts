import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction } from "oak-domain/lib/actions/action";
export type IState = 'wait' | 'success' | 'fail' | string;
export type IAction = 'success' | 'fail' | string;
export type ParticularAction = 'sync' | IAction;
export declare const actions: string[];
export type Action = GenericAction | ParticularAction | string;
export declare const ActionDefDict: {
    iState: ActionDef<string, string>;
};
