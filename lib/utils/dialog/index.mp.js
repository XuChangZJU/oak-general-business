"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var DialogType = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
    confirm: 'confirm',
};
function getInstance(context, selector) {
    if (selector === void 0) { selector = '#oak-dialog'; }
    var instance = context.selectComponent(selector);
    if (!instance) {
        return Promise.reject(new Error('未找到Dialog组件, 请检查selector是否正确'));
    }
    return instance;
}
function showDialog(options, type) {
    if (type === void 0) { type = DialogType.info; }
    var options2 = tslib_1.__assign({}, options);
    var context = options2.context;
    delete options.context;
    var instance = getInstance(context);
    instance.resetData(function () {
        instance.setData(Object.assign({ type: type }, options), instance.show);
    });
    return instance;
}
var Message = {
    info: function (options) {
        return showDialog(options, DialogType.info);
    },
    success: function (options) {
        return showDialog(options, DialogType.success);
    },
    warning: function (options) {
        return showDialog(options, DialogType.warning);
    },
    error: function (options) {
        return showDialog(options, DialogType.error);
    },
    confirm: function (options) {
        return showDialog(options, DialogType.confirm);
    },
    hide: function (context) {
        var instance = getInstance(context);
        if (!instance) {
            return;
        }
        instance.linHide();
    },
};
exports.default = Message;
