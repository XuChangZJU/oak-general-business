import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { EntityDict } from '../../../oak-app-domain';
import { assert } from 'oak-domain/lib/utils/assert';

export default OakComponent({
    entity: 'extraFile',
    isList: true,
    projection: {
        id: 1,
        tag1: 1,
        tag2: 1,
        origin: 1,
        bucket: 1,
        objectId: 1,
        filename: 1,
        extra1: 1,
        extra2: 1,
        extension: 1,
        type: 1,
        entity: 1,
        entityId: 1,
        sort: 1,
        applicationId: 1,
    },
    features: ['extraFile2'],
    formData({ data: extraFiles, features }) {
        const avatar = extraFiles?.filter(
            (ele) => !ele.$$deleteAt$$ && ele.tag1 === 'avatar'
        )[0];
        const avatarUrl = features.extraFile2.getUrl(
            avatar as EntityDict['extraFile']['OpSchema']
        );
        return {
            avatar,
            avatarUrl,
        };
    },
    data: {
        origin: 'qiniu',
        type: 'image',
        tag1: 'avatar',
    },
    wechatMp: {
        externalClasses: ['oak-class'],
    },
    properties: {
        // 图片是否可预览
        preview: true as boolean,
        entity: '' as keyof EntityDict,
        entityId: '' as string,
        autoUpload: false,
    },
    methods: {
        async onPickByMp() {
            try {
                const { errMsg, tempFiles } = await wx.chooseMedia({
                    count: 1,
                    mediaType: ['image'],
                    sourceType: ['album', 'camera'],
                });
                if (errMsg !== 'chooseMedia:ok') {
                    this.setMessage({
                        type: 'warning',
                        content: errMsg,
                    });
                } else {
                    await Promise.all(
                        tempFiles.map(async (tempExtraFile) => {
                            const {
                                tempFilePath,
                                thumbTempFilePath,
                                fileType,
                                size,
                            } = tempExtraFile;
                            const filePath = tempFilePath || thumbTempFilePath;
                            const fileFullName =
                                filePath.match(/[^/]+(?!.*\/)/g)![0];
                            this.pushExtraFile({
                                name: fileFullName,
                                fileType,
                                size,
                                extra1: filePath,
                            });
                        })
                    );
                }
            } catch (err: any) {
                console.error(err);
                if (err.errMsg !== 'chooseMedia:fail cancel') {
                    this.setMessage({
                        type: 'error',
                        content: err.errMsg,
                    });
                }
            }
        },
        async onPickByWeb(files: File[]) {
            await Promise.all(
                files.map(async (file) => {
                    await this.pushExtraFile({
                        name: file.name,
                        fileType: file.type,
                        size: file.size,
                        extra1: file,
                    });
                })
            );
        },
        async pushExtraFile(options: {
            name: string;
            extra1: any;
            fileType: string;
            size: number;
        }) {
            const { origin, type, tag1, avatar } = this.state;
            const { entityId, entity, autoUpload = false } = this.props;
            const { name, extra1, fileType, size } = options;
            const extension = name.substring(name.lastIndexOf('.') + 1);
            const filename = name.substring(0, name.lastIndexOf('.'));
            const applicationId = this.features.application.getApplicationId();
            assert(entity, '必须传入entity');
            const updateData = {
                applicationId,
                origin,
                type,
                tag1,
                objectId: generateNewId(),
                entity,
                filename,
                size,
                extension,
                fileType,
                id: generateNewId(),
                entityId,
                sort: 1000,
            } as EntityDict['extraFile']['CreateSingle']['data'];

            // 如果autoUpload
            if (autoUpload) {
                await this.features.extraFile2.autoUpload(
                    updateData as EntityDict['extraFile']['OpSchema'],
                    extra1
                );
                if (avatar) {
                    this.removeItem(avatar.id as string);
                    this.execute();
                }
            } else {
                const id = this.addItem(updateData);
                if (avatar) {
                    this.removeItem(avatar.id as string);
                }
                this.features.extraFile2.addLocalFile(id, extra1);
            }
        },
    },
});
