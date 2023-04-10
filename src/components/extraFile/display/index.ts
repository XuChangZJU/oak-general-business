import { EntityDict } from '../../../general-app-domain';

export default OakComponent({
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
        entityId: 1,
    },
    formData: ({ data: extraFile, features }) => {
        return {
            url: features.extraFile.getUrl(
                extraFile as EntityDict['extraFile']['Schema']
            ),
        };
    },
    wechatMp: {
        externalClasses: ['oak-class'],
    },
    properties: {
        // 图片显示模式
        mode: 'aspectFit' as string,
    },
});
