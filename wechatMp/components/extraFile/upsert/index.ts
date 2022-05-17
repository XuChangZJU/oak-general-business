import assert from 'assert';
import { WechatMpFileCarrier } from 'oak-frontend-base';
import { composeFileUrl } from '../../../../src/utils/extraFile';
OakComponent({
    entity: 'extraFile',
    formData: async (_rows, _features, _fileCarrier) => {
        if (_fileCarrier) {
            return {
                src: '11',
            };
        }
        else {
            assert(_rows);
            return {
                src: composeFileUrl(_rows[0]!),
            }
        }
    }
}, {
    methods: {
    }
});