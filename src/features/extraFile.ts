import { Action, Feature } from 'oak-frontend-base/lib/types/Feature';
import { AspectWrapper, DeduceCreateOperationData } from 'oak-domain/lib/types';
import { Upload } from 'oak-frontend-base/lib/utils/upload';
import { CommonAspectDict } from 'oak-common-aspect';
import { AspectDict } from '../aspects/AspectDict';
import { EntityDict } from '../general-app-domain';
import { RuntimeContext } from '../context/RuntimeContext';
import { Origin } from '../types/Config';

export class ExtraFile<
    ED extends EntityDict,
    Cxt extends RuntimeContext<ED>,
    AD extends AspectDict<ED, Cxt>
> extends Feature {
    private aspectWrapper: AspectWrapper<ED, Cxt, AD>;
    constructor(
        aspectWrapper: AspectWrapper<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>
    ) {
        super();
        this.aspectWrapper = aspectWrapper;
    }

    private async getUploadInfo(origin: Origin, key?: string) {
        const { result: uploadInfo } = await this.aspectWrapper.exec(
            'getUploadInfo',
            {
                origin,
                key,
            }
        );
        return uploadInfo;
    }

    @Action
    async upload(
        extraFile: DeduceCreateOperationData<
            EntityDict['extraFile']['OpSchema']
        >
    ) {
        try {
            const { origin, extra1, filename, objectId, extension, entity } =
                extraFile;
            // 构造文件上传所需的key
            const key = `${entity ? entity + '/' : ''}${objectId}.${extension}`;
            const uploadInfo = await this.getUploadInfo(origin, key);

            if (process.env.OAK_PLATFORM === 'wechatMp') {
                // 微信小程序使用wx.uploadFile, 封装upload，上传源为origin
                const up = new Upload();
                const result = await up.uploadFile(origin, extra1!, uploadInfo);
                return result;
            } else {
                const up = new Upload();
                const result = await up.uploadFile(origin, extra1!, uploadInfo);
                return result;
            }
        } catch (err) {
            throw err;
        }
    }
}
