"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
exports.default = OakComponent({
    entity: 'wechatPublicTag',
    isList: false,
    properties: {
        applicationId: '',
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
    formData({ data }) {
        return data || {};
    },
    lifetimes: {
        ready() {
            const { oakId, applicationId } = this.props;
            if (!oakId) {
                (0, assert_1.default)(applicationId);
                this.update({
                    applicationId,
                });
            }
        }
    },
    methods: {
        async confirm() {
            await this.execute();
            this.navigateBack();
        }
    }
});
