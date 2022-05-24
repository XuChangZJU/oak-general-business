import { EntityDict } from 'oak-app-domain';
import { Action, Feature } from 'oak-frontend-base';
import { Aspect, Context } from 'oak-domain/lib/types';
import { RWLock } from 'oak-domain/lib/utils/concurrent';
import { Upload } from 'oak-frontend-base/lib/features/uplpad';

export class ExtraFile<
    ED extends EntityDict,
    Cxt extends Context<ED>,
    AD extends Record<string, Aspect<ED, Cxt>>
> extends Feature<ED, Cxt, AD> {
    private rwLock: RWLock;

    constructor() {
        super();
        this.rwLock = new RWLock();
    }
    @Action
    async upload(extraFile: EntityDict['extraFile']['Schema'], scene: string) {
        await this.rwLock.acquire('X');
        try {
            const { origin, extra1: filePath, filename: fileName } = extraFile;
            const uploadInfo =
                await this.getAspectProxy().getUploadInfo(
                    {
                        origin,
                        fileName,
                    },
                    scene
                );

            if (process.env.OAK_PLATFORM === 'wechatMp') {
                // 微信小程序使用wx.uploadFile, 封装upload，上传源为origin
                const up = new Upload();                
                const result = await up.uploadFile(origin, filePath!, uploadInfo);
                this.rwLock.release();
                return result;
            }
            
            this.rwLock.release();
        } catch (err) {
            this.rwLock.release();
            throw err;
        }
    }
}
