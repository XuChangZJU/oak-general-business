import { EntityDict } from 'general-app-domain';
import { Action, Feature } from 'oak-frontend-base';
import { Aspect, Context, DeduceCreateOperationData } from 'oak-domain/lib/types';
import { RWLock } from 'oak-domain/lib/utils/concurrent';
import { Upload } from 'oak-frontend-base';

export class ExtraFile<
    ED extends EntityDict,
    Cxt extends Context<ED>,
    AD extends Record<string, Aspect<ED, Cxt>>
> extends Feature<ED, Cxt, AD> {
    constructor() {
        super();
    }
    @Action
    async upload(extraFile: DeduceCreateOperationData<EntityDict['extraFile']['OpSchema']>, scene: string) {
        try {
            const {
                origin,
                extra1: filePath,
                filename,
                objectId,
                extension,
                entity,
            } = extraFile;
            // 构造文件上传所需的fileName
            const fileName = `${entity}/${objectId}.${extension}`;
            const uploadInfo = await this.getAspectProxy().getUploadInfo(
                {
                    origin,
                    fileName,
                },
                scene
            );

            if (process.env.OAK_PLATFORM === 'wechatMp') {
                // 微信小程序使用wx.uploadFile, 封装upload，上传源为origin
                const up = new Upload();
                const result = await up.uploadFile(
                    origin,
                    filePath!,
                    uploadInfo
                );
                return result;
            } else {
                throw new Error('not implemented yet');
            }
        } catch (err) {
            throw err; 
        }
    }
}
