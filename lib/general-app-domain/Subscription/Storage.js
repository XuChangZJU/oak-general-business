"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        entity: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        entityId: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        name: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        description: {
            type: "text"
        },
        config: {
            type: "object"
        },
        offset: {
            type: "int",
            params: {
                width: 4,
                signed: true
            }
        }
    },
    actionType: "crud",
    actions: action_1.genericActions,
    indexes: [
        //索引
        {
            name: 'index_name',
            attributes: [
                {
                    name: 'name'
                },
            ]
        },
        {
            name: 'index_entity',
            attributes: [
                {
                    name: 'entity'
                },
                {
                    name: 'entityId'
                }
            ]
        }
    ]
};
