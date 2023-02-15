"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("oak-domain/lib/types");
exports.default = OakComponent({
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relation: 1,
        type: 1,
        qrCodeType: 1,
        remark: 1,
        granterId: 1,
        granteeId: 1,
    },
    isList: false,
    formData: function (_a) {
        var userEntityGrant = _a.data;
        return (tslib_1.__assign({}, (userEntityGrant || {})));
    },
    properties: {
        entity: String,
        entityId: String,
        relations: Array,
        type: String,
    },
    data: {
        period: 5,
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
        setPeriod: function (value) {
            this.update({
                period: value,
            });
        },
        onBack: function () {
            this.navigateBack();
        },
        reset: function () {
            this.setState({
                period: 5,
            });
            this.clean();
        },
        confirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var period, expiresAt, id, error_1, data;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            period = this.state.period;
                            expiresAt = Date.now() + period * 60 * 1000;
                            id = this.getId();
                            this.update({
                                expiresAt: expiresAt,
                            });
                            return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
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
