"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SEND_KEY = 'captcha:sendAt';
var SEND_CAPTCHA_LATENCY = process.env.NODE_ENV === 'development' ? 10 : 60;
exports.default = OakComponent({
    isList: false,
    entity: 'user',
    projection: {
        id: 1,
        name: 1,
        nickname: 1,
        mobile$user: {
            $entity: 'mobile',
            data: {
                id: 1,
                mobile: 1,
            },
            filter: {
                ableState: 'enabled'
            }
        }
    },
    formData: function (_a) {
        var user = _a.data, features = _a.features, props = _a.props;
        return {
            user: user,
        };
    },
    data: {
        channels: [],
    },
    lifetimes: {
        attached: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var userId, result;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = this.props.oakId;
                            return [4 /*yield*/, this.features.cache.exec('getChangePasswordChannels', {
                                    userId: userId,
                                })];
                        case 1:
                            result = (_a.sent()).result;
                            console.log(result);
                            this.setState({
                                channels: result
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
    methods: {
        goToMobile: function () {
            this.navigateTo({
                url: '/mobile/me',
            });
        },
    },
});
