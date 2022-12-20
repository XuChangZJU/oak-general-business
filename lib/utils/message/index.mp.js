"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var MessageType = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
};
function getInstance(context, selector) {
    if (selector === void 0) { selector = '#oak-message'; }
    var instance = context.selectComponent(selector);
    if (!instance) {
        return Promise.reject(new Error('未找到Message组件, 请检查selector是否正确'));
    }
    return instance;
}
function showMessage(options, theme) {
    if (theme === void 0) { theme = MessageType.info; }
    var options2 = tslib_1.__assign({}, options);
    var context = options2.context;
    delete options.context;
    var instance = getInstance(context);
    instance.resetData(function () {
        instance.setData(Object.assign({ theme: theme }, options), instance.show);
    });
    return instance;
}
var Message = {
    info: function (options) {
        return showMessage(options, MessageType.info);
    },
    success: function (options) {
        return showMessage(options, MessageType.success);
    },
    warning: function (options) {
        return showMessage(options, MessageType.warning);
    },
    error: function (options) {
        return showMessage(options, MessageType.error);
    },
    hide: function (context) {
        var instance = getInstance(context);
        if (!instance) {
            return;
        }
        instance.hide();
    },
};
exports.default = Message;
