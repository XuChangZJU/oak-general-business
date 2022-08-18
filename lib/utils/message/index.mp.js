"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var MessageType = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
};
function getInstance(context, selector) {
    if (selector === void 0) { selector = '#t-message'; }
    var instance = context.selectComponent(selector);
    if (!instance) {
        return Promise.reject(new Error('未找到Message组件, 请检查selector是否正确'));
    }
    return instance;
}
function showMessage(options, theme) {
    if (theme === void 0) { theme = MessageType.info; }
    var options2 = __assign({}, options);
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
