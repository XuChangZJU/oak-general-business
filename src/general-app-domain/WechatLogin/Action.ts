import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
export type ParticularAction = 'success';
export type Action = GenericAction | ParticularAction | string;
export const actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "success"];
export const ActionDefDict = {};