"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageType = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
};
function getInstance(context, selector = '#oak-message') {
    const instance = context.selectComponent(selector);
    if (!instance) {
        return Promise.reject(new Error('未找到Message组件, 请检查selector是否正确'));
    }
    return instance;
}
function showMessage(options, theme = MessageType.info) {
    const options2 = { ...options };
    const { context } = options2;
    delete options.context;
    const instance = getInstance(context);
    instance.resetData(() => {
        instance.setData(Object.assign({ theme }, options), instance.show);
    });
    return instance;
}
const Message = {
    info(options) {
        return showMessage(options, MessageType.info);
    },
    success(options) {
        return showMessage(options, MessageType.success);
    },
    warning(options) {
        return showMessage(options, MessageType.warning);
    },
    error(options) {
        return showMessage(options, MessageType.error);
    },
    hide(context) {
        const instance = getInstance(context);
        if (!instance) {
            return;
        }
        instance.hide();
    },
};
exports.default = Message;
