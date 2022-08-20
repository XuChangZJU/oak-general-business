"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
exports.desc = {
    attributes: {
        email: {
            type: "varchar",
            params: {
                length: 16
            }
        },
        userId: {
            type: "ref",
            ref: "user"
        },
        ableState: {
            type: "varchar",
            params: {
                length: 16
            }
        }
    },
    indexes: [
        {
            name: 'index_email_ableState',
            attributes: [
                {
                    name: 'email',
                    direction: 'ASC'
                },
                {
                    name: 'ableState',
                    direction: 'ASC'
                }
            ]
        }
    ]
};
