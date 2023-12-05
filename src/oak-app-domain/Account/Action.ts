import { AbleAction, AbleState, makeAbleActionDef } from 'oak-domain/lib/actions/action';
import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
export type PayAction = 'charge' | 'withdraw' | 'cost' | 'refund' | 'loan' | 'repay' | string;
export type ParticularAction = AbleAction | PayAction;
export const actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "enable", "disable", "charge", "withdraw", "cost", "refund", "loan", "repay"];
const AbleActionDef: ActionDef<AbleAction, AbleState> = makeAbleActionDef('enabled');
export type Action = GenericAction | ParticularAction | string;
export const ActionDefDict = {
    ableState: AbleActionDef
};