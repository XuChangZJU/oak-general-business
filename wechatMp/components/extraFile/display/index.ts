import assert from 'assert';
import { EntityDict } from 'oak-app-domain';
import { WechatMpFileCarrier } from 'oak-frontend-base';
import { composeFileUrl } from '../../../../src/utils/extraFile';
OakComponent({
    entity: 'extraFile',
    formData: async (_rows, _features) => {        
        return {
            src: composeFileUrl(_rows[0]!),
        }
    }
}, {
    methods: {
    },
    lifetimes: {
    }
});