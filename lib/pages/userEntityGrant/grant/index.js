"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("oak-domain/lib/types");
exports.default = OakPage({
    path: 'userEntityGrant:upsert',
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relation: 1,
        type: 1,
        remark: 1,
        granterId: 1,
        granteeId: 1,
    },
    isList: false,
    formData: function (_a) {
        var userEntityGrant = _a.data;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                return [2 /*return*/, (tslib_1.__assign({}, userEntityGrant))];
            });
        });
    },
    properties: {
        entity: String,
        entityId: String,
        relations: Array,
        type: String,
    },
    data: {},
    lifetimes: {
        ready: function () {
            this.setUpdateData('entity', this.props.entity);
            this.setUpdateData('entityId', this.props.entityId);
            // 默认type为授权
            this.setUpdateData('type', this.props.type || 'grant');
        },
    },
    methods: {
        bindRadioChange: function (input) {
            var value = this.resolveInput(input).value;
            this.setRadioValue(value);
        },
        setRadioValue: function (value) {
            this.setUpdateData('relation', value);
        },
        reset: function () {
            this.resetUpdateData();
        },
        confirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var result, data, id, error_1, data;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.execute(this.props.oakId ? 'update' : 'create', [types_1.OakCongruentRowExists.name])];
                        case 1:
                            result = _a.sent();
                            data = result.data;
                            id = data.id;
                            this.navigateTo({
                                url: '/userEntityGrant/detail',
                                oakId: id,
                            });
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            if (error_1.constructor.name ===
                                types_1.OakCongruentRowExists.name) {
                                data = error_1.getData();
                                this.redirectTo({
                                    url: '/userEntityGrant/detail',
                                    oakId: data.id,
                                });
                            }
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
    },
});
