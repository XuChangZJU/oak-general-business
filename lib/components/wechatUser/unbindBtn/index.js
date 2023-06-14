"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    entity: 'wechatUser',
    isList: false,
    projection: {
        id: 1,
        userId: 1,
    },
    formData: function (_a) {
        var data = _a.data;
        return {
            id: data === null || data === void 0 ? void 0 : data.id,
        };
    },
    lifetimes: {},
    data: {},
    properties: {},
    methods: {},
});
