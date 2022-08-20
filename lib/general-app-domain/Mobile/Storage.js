"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
exports.desc = {
    attributes: {
        mobile: {
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
            name: 'index_mobile_ableState',
            attributes: [
                {
                    name: 'mobile',
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
