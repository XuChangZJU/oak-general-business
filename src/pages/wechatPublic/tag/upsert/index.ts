import assert from "assert";

export default OakComponent({
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
        return {
            text: tag?.text,
            wechatId: tag?.wechatId,
            sync: tag?.sync,
        }
    },
    lifetimes: {
        ready() {
            const { oakId, applicationId } = this.props;
            if (!oakId) {
                assert(applicationId);
                this.update({
                    applicationId,
                    iState: 'wait',
                });
            }
        }
    },
    methods: {
        async confirm() {
            this.navigateBack();
        },
        async createTag(name: string) {
            if (!name) {
                this.setMessage({
                    type: 'warning',
                    content: '请输入标签名称'
                });
                return;
            }
            const { applicationId } = this.props;
            const { text } = this.state;
            await this.features.wechatPublicTag.createTag({applicationId: applicationId!, name: text!});
            this.setMessage({
                type: 'success',
                content: '操作成功',
            });
            await this.confirm();
        },
        async editTag(id: number, name: string) {
            if (!name) {
                this.setMessage({
                    type: 'warning',
                    content: '请输入标签名称'
                });
                return;
            }
            const { applicationId } = this.props;
            const { wechatId, text } = this.state;
            await this.features.wechatPublicTag.editTag({applicationId: applicationId!, id: wechatId!, name: text! });
            this.setMessage({
                type: 'success',
                content: '操作成功',
            });
            await this.confirm();
        }
    }
})