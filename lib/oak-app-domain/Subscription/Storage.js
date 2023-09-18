"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        entity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        entityId: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        name: {
            notNull: true,
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
