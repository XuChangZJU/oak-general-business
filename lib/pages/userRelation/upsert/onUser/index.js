"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("oak-domain/lib/types");
var string_1 = require("oak-domain/lib/utils/string");
exports.default = OakComponent({
    entity: 'user',
    projection: {
        id: 1,
        name: 1,
        password: 1,
        nickname: 1,
    },
    isList: false,
    formData: function (_a) {
        var user = _a.data;
        var _b = user || {}, name = _b.name, nickname = _b.nickname, password = _b.password;
        return {
            password: password,
            name: name,
            nickname: nickname,
        };
    },
    properties: {
        oakId: String,
        entity: String,
        entityId: String,
        relations: Array,
    },
    lifetimes: {
        ready: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, entity, oakId, entityStr_1;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
                    _a = this.props, entity = _a.entity, oakId = _a.oakId;
                    if (!oakId) {
                        entityStr_1 = (0, string_1.firstLetterUpperCase)(entity);
                        this.update({
                            password: '12345678',
                        }, undefined, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var operations, _a, operation;
                            var _b;
                            return tslib_1.__generator(this, function (_c) {
                                operations = this.getOperations();
                                _a = tslib_1.__read(operations, 1), operation = _a[0].operation;
                                if (!operation.data.name) {
                                    throw new types_1.OakInputIllegalException('user', ['name'], this.t('placeholder.name'));
                                }
                                if (((_b = operation.data["user".concat(entityStr_1, "$user")]) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                                    return [2 /*return*/];
                                }
                                throw new types_1.OakInputIllegalException('user', ["user".concat(entityStr_1, "$user")], this.t('placeholder.relation'));
                            });
                        }); });
                    }
                    return [2 /*return*/];
                });
            });
        },
    },
    methods: {
        onConfirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
