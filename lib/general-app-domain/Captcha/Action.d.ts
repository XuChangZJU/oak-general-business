import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction } from "oak-domain/lib/actions/action";
export declare type IState = 'unsent' | 'sending' | 'sent' | 'failure';
export declare type IAction = 'send' | 'success' | 'fail';
export declare type ParticularAction = IAction;
export declare type Action = GenericAction | ParticularAction;
export declare const ActionDefDict: {
    iState: ActionDef<IAction, IState>;
};
