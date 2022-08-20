import { AbleAction, AbleState } from 'oak-domain/lib/actions/action';
import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction } from "oak-domain/lib/actions/action";
export declare type ParticularAction = AbleAction;
export declare type Action = GenericAction | ParticularAction;
export declare const ActionDefDict: {
    ableState: ActionDef<AbleAction, AbleState>;
};
