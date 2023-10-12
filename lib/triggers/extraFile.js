"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cos_1 = require("../utils/cos");
const oak_domain_1 = require("oak-domain");
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
                const cos = (0, cos_1.getCos)(origin);
                if (!cos) {
                    throw new oak_domain_1.OakException(`origin为${origin}的extraFile没有定义Cos类，请调用registerCos注入`);
                }
                await cos.formUploadMeta(data, context);
                Object.assign(data, {
                    uploadState: 'uploading',
                });
            };
            if (data instanceof Array) {
                await Promise.all(data.map(ele => formMeta(ele)));
                return data.length;
            }
            await formMeta(data);
            return 1;
        }
    },
    {
        name: '删除extraFile时远端也进行删除',
        when: 'commit',
        strict: 'makeSure',
        entity: 'extraFile',
        action: 'remove',
        fn: async ({ rows }, context) => {
            for (const extraFile of rows) {
                const { origin } = extraFile;
                const uploader = (0, cos_1.getCos)(origin);
                await uploader.removeFile(extraFile, context);
            }
            return 1;
        }
    },
];
exports.default = triggers;
