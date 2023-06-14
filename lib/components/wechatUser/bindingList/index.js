"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    entity: 'wechatUser',
    isList: true,
    projection: {
        id: 1,
    },
    formData: function (_a) {
        var data = _a.data;
        return {
            wechatUsers: data === null || data === void 0 ? void 0 : data.filter(function (ele) { return !!ele.userId; }),
        };
    },
    lifetimes: {},
    data: {},
    properties: {},
    methods: {},
});
