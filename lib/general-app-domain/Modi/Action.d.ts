import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction } from "oak-domain/lib/actions/action";
export declare type IState = 'active' | 'applied' | 'abandoned';
export declare type IAction = 'apply' | 'abandon';
export declare type ParticularAction = IAction;
export declare type Action = GenericAction | ParticularAction;
export declare const ActionDefDict: {
    iState: ActionDef<IAction, IState>;
};
