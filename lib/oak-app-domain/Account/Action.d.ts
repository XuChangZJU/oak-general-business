import { AbleAction, AbleState } from 'oak-domain/lib/actions/action';
import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction } from "oak-domain/lib/actions/action";
export type PayAction = 'charge' | 'withdraw' | 'cost' | 'refund' | 'loan' | 'repay' | string;
export type ParticularAction = AbleAction | PayAction;
export declare const actions: string[];
export type Action = GenericAction | ParticularAction | string;
export declare const ActionDefDict: {
    ableState: ActionDef<AbleAction, AbleState>;
};
