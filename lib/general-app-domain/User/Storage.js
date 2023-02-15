"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var Action_1 = require("./Action");
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        name: {
            type: "varchar",
            params: {
                length: 16
            }
        },
        nickname: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        password: {
            type: "text"
        },
        passwordSha1: {
            type: "text"
        },
        birth: {
            type: "datetime"
        },
        gender: {
            type: "varchar",
            params: {
                length: 24
            }
        },
        avatar: {
            type: "text"
        },
        idCardType: {
            type: "varchar",
            params: {
                length: 24
            }
        },
        idNumber: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        refId: {
            type: "ref",
            ref: "user"
        },
        idState: {
            type: "varchar",
            params: {
                length: 24
            }
        },
        userState: {
            type: "varchar",
            params: {
                length: 24
            }
        }
    },
    actionType: "crud",
    actions: Action_1.actions.concat(action_1.relationActions),
    indexes: [
        {
            name: 'index_birth',
            attributes: [
                {
                    name: 'birth',
                    direction: 'ASC'
                },
            ]
        },
        {
            name: 'index_fulltext',
            attributes: [
                {
                    name: 'name'
                },
                {
                    name: 'nickname'
                }
            ],
            config: {
                type: 'fulltext',
                parser: 'ngram'
            }
        }
    ]
};
