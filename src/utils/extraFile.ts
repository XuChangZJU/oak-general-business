//获取file文件url
export function getFileURL(file: File) {
    let getUrl = '';

    // @ts-ignore
    if (window.createObjectURL !== undefined) {
        // basic
        // @ts-ignore
        getUrl = window.createObjectURL(file);
    } else if (window.URL !== undefined) {
        // mozilla(firefox)
        getUrl = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        getUrl = window.webkitURL.createObjectURL(file);
    }
    return getUrl;
}

export function bytesToSize(size: number) {
    let data = '';
    if (size < 0.1 * 1024) {
        //小于0.1KB，则转化成B
        data = size.toFixed(2) + 'B';
    } else if (size < 0.1 * 1024 * 1024) {
        // 小于0.1MB，则转化成KB
        data = (size / 1024).toFixed(2) + 'KB';
    } else if (size < 0.1 * 1024 * 1024 * 1024) {
        // 小于0.1GB，则转化成MB
        data = (size / (1024 * 1024)).toFixed(2) + 'MB';
    } else {
        // 其他转化成GB
        data = (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
    }

    // 转成字符串
    let sizeStr = data + '',
        // 获取小数点处的索引
        index = sizeStr.indexOf('.'),
        // 获取小数点后两位的值
        dou = sizeStr.substring(index + 1, 2);

    // 判断后两位是否为00，如果是则删除00
    if (dou == '00')
        return sizeStr.substring(0, index) + sizeStr.substring(index + 3, 2);

    return sizeStr;
}