"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    entity: 'extraFile',
    isList: false,
    projection: {
        id: 1,
        tag1: 1,
        origin: 1,
        bucket: 1,
        objectId: 1,
        filename: 1,
        extra1: 1,
        extension: 1,
        type: 1,
        entity: 1,
        entityId: 1,
    },
    formData: function (_a) {
        var extraFile = _a.data, features = _a.features;
        return {
            url: features.extraFile.getUrl(extraFile),
        };
    },
    wechatMp: {
        externalClasses: ['oak-class'],
    },
    properties: {
        // 图片显示模式
        mode: 'aspectFit',
    },
});
