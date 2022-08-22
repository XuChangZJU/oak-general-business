"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
exports.desc = {
    attributes: {
        name: {
            type: "varchar",
            params: {
                width: 32
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
                precision: 8,
                scale: 2
            }
        },
        parentId: {
            type: "ref",
            ref: "area"
        },
        code: {
            type: "varchar",
            params: {
                width: 12
            }
        },
        center: {
            type: "geometry"
        }
    }
};
