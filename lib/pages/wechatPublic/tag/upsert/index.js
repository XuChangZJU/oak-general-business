"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
exports.default = OakComponent({
    entity: 'wechatPublicTag',
    isList: false,
    properties: {
        applicationId: '',
        oakId: '',
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
    formData({ data: tag }) {
        console.log(tag);
        return {
            text: tag?.text,
            wechatId: tag?.wechatId,
            sync: tag?.sync,
        };
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
        },
        async createTag(name) {
            if (!name) {
                this.setMessage({
                    type: 'warning',
                    content: '请输入标签名称'
                });
                return;
            }
            const { applicationId } = this.props;
            await this.confirm();
        },
        async editTag(id, name) {
            if (!name) {
                this.setMessage({
                    type: 'warning',
                    content: '请输入标签名称'
                });
                return;
            }
            const { applicationId } = this.props;
            await this.confirm();
        }
    }
});
