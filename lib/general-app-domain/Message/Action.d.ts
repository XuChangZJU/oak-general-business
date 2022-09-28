import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction } from "oak-domain/lib/actions/action";
export declare type IAction = 'succeed' | 'fail';
export declare type IState = 'sending' | 'success' | 'failure';
export declare type ParticularAction = IAction;
export declare type Action = GenericAction | ParticularAction;
export declare const actions: string[];
export declare const ActionDefDict: {
    iState: ActionDef<IAction, IState>;
};
