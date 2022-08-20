"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
exports.desc = {
    attributes: {
        name: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        level: {
            type: "varchar",
            params: {
                length: 16
            }
        },
        depth: {
            type: "int",
            params: {
                width: 4
            }
        },
        parentId: {
            type: "ref",
            ref: "area"
        },
        code: {
            type: "varchar",
            params: {
                length: 12
            }
        },
        center: {
            type: "geometry"
        }
    }
};
