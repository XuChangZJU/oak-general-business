"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
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
        var oakFullpath = this.state.oakFullpath;
        var userRelations = oakFullpath && this.features.runningTree.getOperations("".concat(oakFullpath, ".user.userRelation$user"));
        return {
            userId: mobile === null || mobile === void 0 ? void 0 : mobile.userId,
            legal: userRelations && userRelations.length > 0,
        };
    },
    properties: {
        entity: '',
        entityId: '',
        relations: [],
    },
    data: {
        mobileValue: '',
        mobileValueReady: false,
        isNew: false,
    },
    methods: {
        onMobileChange: function (value) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var mobileValueReady, data;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            mobileValueReady = (0, validator_1.isMobile)(value);
                            if (!mobileValueReady) return [3 /*break*/, 2];
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
                            if (data.length > 0) {
                                this.clean();
                                this.unsetId();
                                this.setId(data[0].id);
                                this.setState({
                                    isNew: false,
                                });
                            }
                            else {
                                this.clean();
                                this.unsetId();
                                this.setState({
                                    isNew: true,
                                });
                                this.create({
                                    mobile: value,
                                    user: {
                                        id: (0, uuid_1.generateNewId)(),
                                        action: 'create',
                                        data: {
                                            id: (0, uuid_1.generateNewId)(),
                                        }
                                    }
                                });
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            this.clean();
                            this.unsetId();
                            _a.label = 3;
                        case 3:
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
                var userValue;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.state.isNew) {
                                userValue = this.getFreshValue('user');
                                if (!userValue.name) {
                                    this.setMessage({
                                        type: 'error',
                                        content: '用户姓名未填写',
                                    });
                                    return [2 /*return*/];
                                }
                                if (!userValue.password) {
                                    this.setMessage({
                                        type: 'error',
                                        content: '用户密码未设置',
                                    });
                                    return [2 /*return*/];
                                }
                            }
                            return [4 /*yield*/, this.execute()];
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
            this.clean();
            this.setState({
                mobileValue: '',
                mobileValueReady: false,
            });
            this.unsetId();
        },
        searchChangeMp: function (e) {
            var value = e.detail.value;
            this.onMobileChange(value);
        },
        searchCancelMp: function () {
            this.onReset();
        }
    },
});
