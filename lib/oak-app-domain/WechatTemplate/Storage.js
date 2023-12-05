"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
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
    actions: action_1.genericActions
};
