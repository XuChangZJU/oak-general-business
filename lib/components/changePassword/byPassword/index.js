"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");

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
            return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            }); });
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
