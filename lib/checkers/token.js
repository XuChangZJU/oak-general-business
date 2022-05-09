"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("oak-domain/lib/types");
const Exceptions_1 = require("../types/Exceptions");
const lodash_1 = require("lodash");
const filter_1 = require("oak-domain/lib/store/filter");
const checkers = [
    {
        type: 'user',
        action: 'select',
        entity: 'token',
        checker: async ({ operation }, context) => {
            const scene = context.getScene();
            const { filter } = operation;
            if (scene === 'token:me') {
                if (!filter || !filter.id) {
                    const token = await context.getToken();
                    if (!token) {
                        throw new Exceptions_1.OakUnloggedInException();
                    }
                    const { id } = token;
                    (0, lodash_1.assign)(operation, {
                        filter: (0, filter_1.combineFilters)([filter, { id }]),
                    });
                    return 1;
                }
                return 0;
            }
            if (['app:onLaunch', 'token:me', 'token:login'].includes(scene)) {
                return 0;
            }
            // 对获取token的权限进行精细化控制，除了root
            throw new types_1.OakUserUnpermittedException();
        },
    }
];
exports.default = checkers;
