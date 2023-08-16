"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var SEND_KEY = 'captcha:sendAt';
var SEND_CAPTCHA_LATENCY = process.env.NODE_ENV === 'development' ? 10 : 60;
exports.default = OakComponent({
    isList: false,
    entity: 'user',
    projection: {
        id: 1,
        name: 1,
        nickname: 1,
    },
    formData: function (_a) {
        var user = _a.data, features = _a.features, props = _a.props;
        return {
            user: user,
        };
    },
    data: {
        failTimes: 0,
    },
    lifetimes: {
        ready: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var userId, _a, lastSuccessfulTemp, failTempList;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            userId = this.props.oakId;
                            return [4 /*yield*/, this.features.cache.refresh('changePasswordTemp', {
                                    data: {
                                        id: 1,
                                        $$seq$$: 1,
                                    },
                                    filter: {
                                        userId: userId,
                                        $$createAt$$: {
                                            $gt: (0, dayjs_1.default)().startOf('day').valueOf(),
                                        },
                                        result: 'success',
                                    },
                                    sorter: [
                                        {
                                            $attr: {
                                                $$seq$$: 1,
                                            },
                                            $direction: 'desc',
                                        },
                                    ],
                                    indexFrom: 0,
                                    count: 1,
                                })];
                        case 1:
                            _a = tslib_1.__read.apply(void 0, [(_b.sent()).data, 1]), lastSuccessfulTemp = _a[0];
                            return [4 /*yield*/, this.features.cache.refresh('changePasswordTemp', {
                                    data: {
                                        id: 1,
                                    },
                                    filter: lastSuccessfulTemp ? {
                                        userId: userId,
                                        $$seq$$: {
                                            $gt: lastSuccessfulTemp.$$seq$$,
                                        },
                                        result: 'fail',
                                    } : {
                                        userId: userId,
                                        $$createAt$$: {
                                            $gt: (0, dayjs_1.default)().startOf('day').valueOf(),
                                        },
                                        result: 'fail',
                                    },
                                })];
                        case 2:
                            failTempList = (_b.sent()).data;
                            this.setState({
                                failTimes: failTempList.length,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        }
    },
    methods: {
        onConfirm: function (prevPassword, newPassword) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var userId, result, resultMessage, times;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = this.props.oakId;
                            return [4 /*yield*/, this.features.cache.exec('updateUserPassword', {
                                    userId: userId,
                                    prevPassword: prevPassword,
                                    newPassword: newPassword,
                                })];
                        case 1:
                            result = (_a.sent()).result;
                            resultMessage = result.result, times = result.times;
                            if (resultMessage === 'success') {
                                this.setMessage({
                                    type: 'success',
                                    content: '修改密码成功'
                                });
                                this.navigateBack();
                            }
                            else {
                                if (times) {
                                    this.setState({
                                        failTimes: times,
                                    });
                                }
                                this.setMessage({
                                    type: 'error',
                                    content: resultMessage
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
