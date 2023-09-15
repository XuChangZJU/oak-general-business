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
    {
        name: '删除extraFile时远端也进行删除',
        when: 'before',
        entity: 'extraFile',
        action: 'remove',
        fn: async ({ operation }, context) => {
            const { filter } = operation;
            const extraFileList = await context.select('extraFile', {
                data: {
                    id: 1,
                    origin: 1,
                    type: 1,
                    bucket: 1,
                    objectId: 1,
                    tag1: 1,
                    tag2: 1,
                    filename: 1,
                    md5: 1,
                    entity: 1,
                    entityId: 1,
                    extra1: 1,
                    extension: 1,
                    size: 1,
                    sort: 1,
                    fileType: 1,
                    isBridge: 1,
                    uploadState: 1,
                    uploadMeta: 1,
                },
                filter,
            }, {
                dontCollect: true,
            });
            for (const extraFile of extraFileList) {
                const { origin } = extraFile;
                const uploader = uploader_1.default[origin];
                await uploader.checkWhetherSuccess(extraFile, context);
            }
            return 1;
        }
    },
];
exports.default = triggers;
