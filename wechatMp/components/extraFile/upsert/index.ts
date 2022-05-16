import { WechatMpFileCarrier } from 'oak-frontend-base';
OakComponent({
    entity: 'extraFile',
    formData: async (_rows, _features, _fileCarrier) => {
        return {
            name: 1,
        }
    }
}, {
    methods: {
        async onFilePicked() {
            const fileCarrier = new WechatMpFileCarrier();
    
            this.setFileCarrier(fileCarrier);
        }
    }
});