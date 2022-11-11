"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    isList: false,
    entity: 'application',
    projection: {
        id: 1,
        name: 1,
        config: 1,
        description: 1,
        type: 1,
        systemId: 1,
    },
    formData: function (_a) {
        var data = _a.data;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                return [2 /*return*/, data || {}];
            });
        });
    },
    data: {
        typeArr: [
            {
                value: 'web',
            },
            {
                value: "wechatMp",
            },
            {
                value: "wechatPublic",
            },
        ],
    },
    lifetimes: {
        ready: function () {
            var _a = this.props, systemId = _a.systemId, oakId = _a.oakId;
            if (!oakId) {
                if (systemId) {
                    this.setUpdateData('systemId', systemId);
                }
            }
        },
    },
    methods: {
        confirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            this.navigateBack();
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
