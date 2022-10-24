import { isMockId } from 'oak-frontend-base/lib/utils/mockId';
import { composeFileUrl } from '../../../utils/extraFile';
OakComponent(
    {
        entity: 'extraFile',
        isList: false,
        projection: {
            id: 1,
            tag1: 1,
            origin: 1,
            bucket: 1,
            objectId: 1,
            filename: 1,
            extra1: 1,
            extension: 1,
            type: 1,
            entity: 1,
        },
        formData: async ({ data: extraFile, features }) => {
            const application = await features.application.getApplication();

            const isTmp = extraFile?.id && isMockId(extraFile.id);
            return {
                src: extraFile && composeFileUrl(extraFile, application?.system?.config),
                isTmp,
            };
        },
        properties: {
            // 图片显示模式
            mode: {
                type: String,
                value: 'aspectFit',
            },
        },
    }
);