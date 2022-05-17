import assert from 'assert';
import { EntityDict } from 'oak-app-domain';
import { WechatMpFileCarrier } from 'oak-frontend-base';
import { composeFileUrl } from '../../../../src/utils/extraFile';
OakComponent({
    entity: 'extraFile',
    formData: async (_rows, _features, _fileCarrier) => {
        if (_fileCarrier) {
            const file = (<WechatMpFileCarrier<EntityDict, 'extraFile'>>_fileCarrier).getFile();
            return {
                src: file.tempFilePath || file.thumbTempFilePath,
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