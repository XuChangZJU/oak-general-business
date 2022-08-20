"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
exports.desc = {
    attributes: {
        detail: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        areaId: {
            type: "ref",
            ref: "area"
        },
        phone: {
            type: "varchar",
            params: {
                length: 12
            }
        },
        name: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        default: {
            type: "boolean"
        },
        remark: {
            type: "text"
        }
    }
};
