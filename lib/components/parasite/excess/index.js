"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    isList: false,
    data: {
        loading: false,
        illegal: false,
        expired: false,
    },
    lifetimes: {
        attached: function () {
            var _a, _b;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var oakId, _c, parasite, err_1;
                return tslib_1.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            oakId = this.props.oakId;
                            this.setState({
                                loading: true,
                            });
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, this.features.cache.refresh('parasite', {
                                    data: {
                                        id: 1,
                                        expired: 1,
                                        expiresAt: 1,
                                        entity: 1,
                                        entityId: 1,
                                        redirectTo: 1,
                                        userId: 1,
                                        user: {
                                            id: 1,
                                            nickname: 1,
                                        }
                                    },
                                    filter: {
                                        id: oakId || 'illegal',
                                    },
                                })];
                        case 2:
                            _c = tslib_1.__read.apply(void 0, [(_d.sent()).data, 1]), parasite = _c[0];
                            if (!parasite) {
                                this.setState({
                                    loading: false,
                                    illegal: true,
                                });
                                return [2 /*return*/];
                            }
                            if (parasite.expired) {
                                this.setState({
                                    loading: false,
                                    expired: true,
                                });
                                return [2 /*return*/];
                            }
                            // 登录之后
                            this.features.token.removeToken();
                            return [4 /*yield*/, this.features.token.wakeupParasite(parasite.id)];
                        case 3:
                            _d.sent();
                            this.redirectPage(parasite.redirectTo, ((_a = parasite === null || parasite === void 0 ? void 0 : parasite.user) === null || _a === void 0 ? void 0 : _a.nickname) === 'shadow_user' ? undefined : (_b = parasite === null || parasite === void 0 ? void 0 : parasite.user) === null || _b === void 0 ? void 0 : _b.nickname);
                            return [3 /*break*/, 5];
                        case 4:
                            err_1 = _d.sent();
                            this.setState({
                                loading: false,
                                illegal: false,
                                expired: false,
                            });
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
    },
    methods: {
        redirectPage: function (redirectTo, nickname) {
            if (!redirectTo) {
                this.setMessage({
                    type: 'error',
                    content: '未配置跳转页面',
                });
                return;
            }
            var pathname = redirectTo.pathname, props = redirectTo.props, state = redirectTo.state;
            var url = pathname.substring(0, 1) === '/' ? pathname : "/".concat(pathname);
            // if (isTabBar) {
            //     this.switchTab(
            //         {
            //             url,
            //             ...(props || {}),
            //         },
            //         state
            //     );
            //     return;
            // }
            this.redirectTo(tslib_1.__assign(tslib_1.__assign({ url: url }, (props || {})), { name: nickname }), state);
        },
    },
});
