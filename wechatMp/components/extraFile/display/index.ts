import { isMockId } from 'oak-frontend-base/src/utils/mockId';
import { composeFileUrl } from '../../../../src/utils/extraFile';
OakComponent(
    {
        entity: 'extraFile',
        isList: false,
        formData: async ({ data: extraFile }) => {
            const isTmp = extraFile?.id && isMockId(extraFile.id);
            return {
                src: extraFile && composeFileUrl(extraFile),
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