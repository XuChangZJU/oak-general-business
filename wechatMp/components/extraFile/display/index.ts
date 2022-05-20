import { isMockId } from 'oak-frontend-base/src/utils/mockId';
import { composeFileUrl } from '../../../../src/utils/extraFile';
OakComponent(
    {
        entity: 'extraFile',
        formData: async ([extraFile], _features) => {
            const isTmp = isMockId(extraFile!.id);
            return {
                src: composeFileUrl(extraFile!),
                isTmp,
            };
        },
    },
    {
        methods: {},
        lifetimes: {},
        properties: {
            // 图片显示模式
            mode: {
                type: String,
                value: 'aspectFit',
            },
        },
    }
);