"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const Action_1 = require("./Action");
exports.desc = {
    attributes: {
        text: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        applicationId: {
            notNull: true,
            type: "ref",
            ref: "application"
        },
        wechatId: {
            type: "int",
            params: {
                width: 4,
                signed: false
            }
        },
        sync: {
            type: "boolean"
        },
        syncAt: {
            type: "datetime"
        }
    },
    actionType: "crud",
    actions: Action_1.actions,
    indexes: [
        {
            name: 'index_text_application',
            attributes: [
                {
                    name: 'text',
                },
                {
                    name: "applicationId",
                },
            ],
            config: {
                unique: true,
            },
        }
    ]
};
