import UploaderDict from '../utils/uploader';
import { OakException } from 'oak-domain';
const triggers = [
    {
        name: '生成extraFile需要的上传meta',
        when: 'before',
        entity: 'extraFile',
        action: 'create',
        fn: async ({ operation }, context) => {
            const { data } = operation;
            const formMeta = async (data) => {
                const { origin } = data;
                const uploader = UploaderDict[origin];
                if (!uploader) {
                    throw new OakException(`origin为${origin}的extraFile没有定义上传类，请调用registerUploader注入`);
                }
                await uploader.formUploadMeta(data, context);
            };
            if (data instanceof Array) {
                await Promise.all(data.map(ele => formMeta(ele)));
                return data.length;
            }
            await formMeta(data);
            return 1;
        }
    },
];
export default triggers;
