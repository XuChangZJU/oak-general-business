"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    isList: false,
    lifetimes: {
        attached: function () {
            this.getMessageCount();
        },
    },
    data: {
        count: undefined,
    },
    methods: {
        goMessageList: function () {
            this.navigateTo({
                url: '/message/list',
            });
        },
        getMessageCount: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var userId, application, systemId, result;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = this.features.token.getUserId(true);
                            application = this.features.application.getApplication();
                            systemId = application.systemId;
                            if (!userId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.features.cache.count('message', {
                                    data: {
                                        id: 1,
                                    },
                                    filter: {
                                        userId: userId,
                                        systemId: systemId,
                                        visitState: 'unvisited',
                                    },
                                })];
                        case 1:
                            result = _a.sent();
                            this.setState({
                                count: result,
                            });
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        },
    },
});
