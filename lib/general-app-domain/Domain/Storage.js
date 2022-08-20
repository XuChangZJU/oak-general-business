"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
exports.desc = {
    attributes: {
        url: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        apiPath: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        protocol: {
            type: "varchar",
            params: {
                length: 16
            }
        },
        port: {
            type: "int",
            params: {
                width: 2,
                signed: true
            }
        },
        systemId: {
            type: "ref",
            ref: "system"
        }
    }
};
