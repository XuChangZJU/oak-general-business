import { EntityDict } from "./EntityDict";
import { CreateOperationData as Relation } from "./Relation/Schema";
export const relations: Relation[] = [
    {
        id: "account-owner",
        entity: "account",
        name: "owner"
    },
    {
        id: "account-audit",
        entity: "account",
        name: "audit"
    },
    {
        id: "session-partner",
        entity: "session",
        name: "partner"
    }
];