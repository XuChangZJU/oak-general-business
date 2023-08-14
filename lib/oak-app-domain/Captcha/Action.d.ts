import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction } from "oak-domain/lib/actions/action";
export declare type IState = 'unsent' | 'sending' | 'sent' | 'failure' | string;
export declare type IAction = 'send' | 'success' | 'fail' | string;
export declare type ParticularAction = IAction;
export declare const actions: string[];
export declare type Action = GenericAction | ParticularAction | string;
export declare const ActionDefDict: {
    iState: ActionDef<string, string>;
};
