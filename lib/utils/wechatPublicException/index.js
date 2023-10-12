"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleException = void 0;
function handleException(e) {
    const exception = JSON.parse(e);
    if (exception.code === 45157) {
        return '标签名非法，请注意不能和其他标签重名';
    }
    else if (exception.code === 45158) {
        return '标签名长度超过30个字节';
    }
    else if (exception.code === 45056) {
        return '创建的标签数过多，请注意不能超过100个';
    }
    else if (exception.code === 45058) {
        return '不能修改0/1/2这三个系统默认保留的标签';
    }
    else if (exception.code === 45159) {
        return '非法的标签';
    }
    else if (exception.code === 45059) {
        return '有粉丝身上的标签数已经超过限制，即超过20个';
    }
    else if (exception.code === 40003) {
        return '传入非法的openid';
    }
    else if (exception.code === 49003) {
        return '传入的openid不属于此AppID';
    }
    else if (exception.code === 40032) {
        return '每次传入的openid列表个数不能超过50个';
    }
    else if (exception.code === 40013) {
        return '无效的AppID';
    }
}
exports.handleException = handleException;
