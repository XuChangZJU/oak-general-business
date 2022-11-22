"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
exports.default = OakComponent({
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relation: 1,
        type: 1,
        number: 1,
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
    data: {
        period: 5,
        userEntityGrantId: '',
    },
    lifetimes: {
        ready: function () {
            this.setInit();
        },
    },
    methods: {
        setInit: function () {
            var _a = this.props, entity = _a.entity, entityId = _a.entityId, type = _a.type;
            this.update({
                entity: entity,
                entityId: entityId,
                type: type || 'grant',
                number: 1,
            });
        },
        setRelation: function (value) {
            this.update({
                relation: value,
            });
        },
        setNumber: function (value) {
            this.update({
                number: value,
            });
        },
        onBack: function () {
            this.navigateBack();
        },
        confirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var period, expiresAt, id;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            period = this.state.period;
                            expiresAt = Date.now() + period * 60 * 1000;
                            this.update({
                                expiresAt: expiresAt,
                            });
                            (0, assert_1.default)(!this.props.oakId);
                            id = this.getId();
                            return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            // todo 在页面显示二维码 先弹窗方式吧
                            this.setState({
                                userEntityGrantId: id,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
