"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
exports.default = OakComponent({
    entity: 'wechatPublicTag',
    isList: false,
    properties: {
        applicationId: String,
        Tags: Object,
    },
    projection: {
        id: 1,
        text: 1,
        wechatId: 1,
        sync: 1,
        syncAt: 1,
        $$createAt$$: 1,
        $$updateAt$$: 1,
        $$seq$$: 1,
    },
    formData: function (_a) {
        var data = _a.data;
        return data || {};
    },
    lifetimes: {
        ready: function () {
            var _a = this.props, oakId = _a.oakId, applicationId = _a.applicationId;
            if (!oakId) {
                (0, assert_1.default)(applicationId);
                this.update({
                    applicationId: applicationId,
                });
            }
        }
    },
    methods: {
        confirm: function () {
            this.execute();
        }
    }
});
