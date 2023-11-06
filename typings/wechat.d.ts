

declare namespace WechatMiniprogram {
    /** 本地临时文件列表 */
    interface MediaFile {
        /** 视频的时间长度 */
        duration: number;
        /** 视频的高度 */
        height: number;
        /** 本地临时文件大小，单位 B */
        size: number;
        /** 本地临时文件路径 (本地路径) */
        tempFilePath: string;
        /** 视频缩略图临时文件路径 */
        thumbTempFilePath: string;
        /** 视频的宽度 */
        width: number;
        /** 文件类型 */
        fileType: 'image' | 'video';
    }
}