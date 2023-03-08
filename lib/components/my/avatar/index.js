"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    properties: {
        shape: {
            type: String,
            value: 'circle',
        },
        size: {
            type: Number,
            optionalTypes: [Number, String],
        },
        iconColor: {
            type: String,
            value: 'primary',
        },
        iconName: {
            type: String,
            value: 'user',
        },
    },
    formData: function (_a) {
        var _b;
        var features = _a.features;
        var userInfo = features.token.getUserInfo();
        if (userInfo) {
            var extraFile = (_b = userInfo === null || userInfo === void 0 ? void 0 : userInfo.extraFile$entity) === null || _b === void 0 ? void 0 : _b.find(function (ele) { return ele.tag1 === 'avatar'; });
            var avatarUrl = extraFile && features.extraFile.getUrl(extraFile);
            return {
                avatarUrl: avatarUrl,
            };
        }
        return {
            avatarUrl: '',
        };
    },
    lifetimes: {
        attached: function () {
            var _this = this;
            this.subscribed.push(this.features.token.subscribe(function () { return _this.reRender(); }));
        }
    }
});
