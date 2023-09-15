"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const uploader_1 = tslib_1.__importDefault(require("../utils/uploader"));
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
                const uploader = uploader_1.default[origin];
                if (!uploader) {
                    throw new oak_domain_1.OakException(`origin为${origin}的extraFile没有定义上传类，请调用registerUploader注入`);
                }
                await uploader.formUploadMeta(data, context);
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
];
exports.default = triggers;
