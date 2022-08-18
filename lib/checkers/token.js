"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var checkers = [
    {
        type: 'data',
        action: 'select',
        entity: 'token',
        checker: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_b) {
                    /* const scene = context.getScene();
                    const { filter } = operation;
                    if (scene === 'token:me') {
                        if (!filter || !filter.id) {
                            const token = await context.getToken();
                            if (!token) {
                                throw new OakUnloggedInException();
                            }
                            const { id } = token;
                            assign(operation, {
                                filter: combineFilters([filter, { id }]),
                            });
                            return 1;
                        }
                        return 0;
                    }
                    if (scene === undefined || ['app:onLaunch', 'token:me', 'token:login'].includes(scene)) {
                        return 0;
                    }
                    // 对获取token的权限进行精细化控制，除了root
                    if (filter && filter.id === await context.getTokenValue()) {
                        return 0;
                    }
                    const isRoot = await checkIsRoot(context);
                    if (!isRoot) {
                        // 不是root只能访问自己的token
                        if (!filter) {
                            throw new OakUserUnpermittedException();
                        }
                        assign(operation, {
                            filter: addFilterSegment(filter, {
                                id: await context.getTokenValue(),
                            })
                        });
                    } */
                    return [2 /*return*/, 0];
                });
            });
        },
    }
];
exports.default = checkers;
