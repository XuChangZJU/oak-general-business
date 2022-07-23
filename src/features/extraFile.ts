import { EntityDict } from 'general-app-domain';
import { Action, Feature } from 'oak-frontend-base/lib/types/Feature';
import { AspectWrapper, DeduceCreateOperationData } from 'oak-domain/lib/types';
import { Upload } from 'oak-frontend-base/lib/utils/upload';
import { CommonAspectDict } from 'oak-common-aspect';
import { AspectDict } from '../aspects/AspectDict';
import { GeneralRuntimeContext } from '..';

export class ExtraFile<
    ED extends EntityDict,
    Cxt extends GeneralRuntimeContext<ED>,
    AD extends AspectDict<ED, Cxt>
> extends Feature<ED, Cxt, AD & CommonAspectDict<ED, Cxt>> {
    constructor(aspectWrapper: AspectWrapper<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>) {
        super(aspectWrapper);
    }
    @Action
    async upload(extraFile: DeduceCreateOperationData<EntityDict['extraFile']['OpSchema']>) {
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
            const { result: uploadInfo } = await this.getAspectWrapper().exec('getUploadInfo',
                {
                    origin,
                    fileName,
                }
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
