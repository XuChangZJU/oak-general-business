import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        applicationId: {
            notNull: true,
            type: "ref",
            ref: "application"
        },
        wechatId: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        title: {
            notNull: true,
            type: "text"
        },
        primaryIndustry: {
            type: "text"
        },
        deputyIndustry: {
            type: "text"
        },
        content: {
            type: "text"
        },
        example: {
            type: "text"
        },
        param: {
            type: "object"
        },
        syncAt: {
            notNull: true,
            type: "datetime"
        },
        keywordEnumValueList: {
            type: "object"
        },
        type: {
            type: "enum",
            enumeration: ["2", "3"]
        }
    },
    actionType: "crud",
    actions
};