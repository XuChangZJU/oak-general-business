"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var validator_1 = require("oak-domain/lib/utils/validator");
exports.default = OakComponent({
    entity: 'mobile',
    projection: {
        id: 1,
        mobile: 1,
        ableState: 1,
        userId: 1,
    },
    isList: false,
    formData: function (_a) {
        var mobile = _a.data;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var legal, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        legal = false;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.tryExecute()];
                    case 2:
                        legal = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        legal = false;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, {
                            legal: legal,
                            userId: mobile === null || mobile === void 0 ? void 0 : mobile.userId,
                        }];
                }
            });
        });
    },
    properties: {
        entity: String,
        entityId: String,
        relations: Array,
    },
    data: {
        mobileValue: '',
        mobileValueReady: false,
    },
    methods: {
        onMobileChange: function (value) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var mobileValueReady, data;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            mobileValueReady = (0, validator_1.isMobile)(value);
                            if (!mobileValueReady) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.features.cache.refresh('mobile', {
                                    data: {
                                        id: 1,
                                        mobile: 1,
                                        ableState: 1,
                                        userId: 1,
                                    },
                                    filter: {
                                        mobile: value,
                                        ableState: 'enabled',
                                    }
                                })];
                        case 1:
                            data = (_a.sent()).data;
                            if (!(data.length > 0)) return [3 /*break*/, 2];
                            this.cleanOperation();
                            this.setId(data[0].id);
                            return [3 /*break*/, 4];
                        case 2:
                            this.cleanOperation();
                            this.unsetId();
                            return [4 /*yield*/, this.addOperation({
                                    action: 'create',
                                    data: {
                                        mobile: value,
                                    }
                                })];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            this.cleanOperation();
                            this.unsetId();
                            _a.label = 6;
                        case 6:
                            this.setState({
                                mobileValueReady: mobileValueReady,
                                mobileValue: value,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        onConfirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            this.setState({
                                mobileValue: '',
                                mobileValueReady: false,
                            });
                            this.unsetId();
                            return [2 /*return*/];
                    }
                });
            });
        },
        onReset: function () {
            this.cleanOperation();
            this.setState({
                mobileValue: '',
                mobileValueReady: false,
            });
            this.unsetId();
        }
    },
});
