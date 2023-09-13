;
const entityDesc = {
    locales: {
        zh_CN: {
            name: '文件',
            attr: {
                origin: '源',
                type: '类型',
                bucket: '桶',
                objectId: '对象编号',
                tag1: '标签一',
                tag2: '标签二',
                filename: '文件名',
                md5: 'md5',
                entity: '关联对象',
                entityId: '关联对象id',
                extra1: '额外信息',
                extension: '后缀名',
                size: '文件大小',
                sort: '排序',
                fileType: '文件类型',
                isBridge: '是否桥接访问',
                uploadState: '上传状态',
                uploadMeta: '上传需要的metadata',
            },
            v: {
                origin: {
                    qiniu: '七牛云',
                    unknown: '未知',
                },
                type: {
                    image: '图像',
                    video: '视频',
                    audio: '音频',
                    file: '文件',
                },
                uploadState: {
                    success: '上传成功',
                    failed: '上传失败',
                    uploading: '上传中',
                },
            },
        },
    }
};
export {};
