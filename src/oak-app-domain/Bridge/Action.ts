import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
export type IAction = 'cancel' | 'qrcode' | string;
export type ParticularAction = IAction;
export const actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "cancel", "qrcode"];
export type Action = GenericAction | ParticularAction | string;
export const ActionDefDict = {};