"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        sourceEntity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        path: {
            notNull: true,
            type: "varchar",
            params: {
                length: 256
            }
        },
        destEntity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        deActions: {
            notNull: true,
            type: "object"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions,
    indexes: [
        {
            name: 'index_entity_root_path',
            attributes: [
                {
                    name: 'destEntity'
                },
                {
                    name: 'sourceEntity'
                },
                {
                    name: 'path'
                },
            ],
            config: {
                unique: true
            }
        }
    ]
};
