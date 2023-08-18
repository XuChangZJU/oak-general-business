"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var triggers = [
    {
        name: '当parasite过期时，使其相关token也过期',
        entity: 'parasite',
        action: 'update',
        check: function (operation) {
            var data = operation.data;
            return !!data.expired;
        },
        when: 'before',
        fn: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, filter, _b, _c, _d;
                var _e;
                return tslib_1.__generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            data = operation.data, filter = operation.filter;
                            _c = (_b = context).operate;
                            _d = ['token'];
                            _e = {};
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 1: return [4 /*yield*/, _c.apply(_b, _d.concat([(_e.id = _f.sent(),
                                    _e.action = 'disable',
                                    _e.data = {},
                                    _e.filter = {
                                        parasite: filter,
                                    },
                                    _e), {}]))];
                        case 2:
                            _f.sent();
                            return [2 /*return*/, 1];
                    }
                });
            });
        },
    },
    {
        name: '当parasite失效时，使其相关token也过期',
        entity: 'parasite',
        action: 'cancel',
        check: function (operation) {
            var data = operation.data;
            return !!data.expired;
        },
        when: 'before',
        fn: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, filter, _b, _c, _d;
                var _e;
                return tslib_1.__generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            data = operation.data, filter = operation.filter;
                            _c = (_b = context).operate;
                            _d = ['token'];
                            _e = {};
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 1: return [4 /*yield*/, _c.apply(_b, _d.concat([(_e.id = _f.sent(),
                                    _e.action = 'disable',
                                    _e.data = {},
                                    _e.filter = {
                                        parasite: filter,
                                    },
                                    _e), {}]))];
                        case 2:
                            _f.sent();
                            return [2 /*return*/, 1];
                    }
                });
            });
        },
    },
];
exports.default = triggers;
