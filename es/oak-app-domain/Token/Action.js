import { makeAbleActionDef } from "oak-domain/lib/actions/action";
export const actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "enable", "disable"];
const AbleActionDef = makeAbleActionDef('enabled');
export const ActionDefDict = {
    ableState: AbleActionDef
};
