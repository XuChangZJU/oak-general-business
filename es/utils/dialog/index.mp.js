const DialogType = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
    confirm: 'confirm',
};
function getInstance(context, selector = '#oak-dialog') {
    const instance = context.selectComponent(selector);
    if (!instance) {
        return Promise.reject(new Error('未找到Dialog组件, 请检查selector是否正确'));
    }
    return instance;
}
function showDialog(options, type = DialogType.info) {
    const options2 = { ...options };
    const { context } = options2;
    delete options.context;
    const instance = getInstance(context);
    instance.resetData(() => {
        instance.setData(Object.assign({ type }, options), instance.show);
    });
    return instance;
}
const Message = {
    info(options) {
        return showDialog(options, DialogType.info);
    },
    success(options) {
        return showDialog(options, DialogType.success);
    },
    warning(options) {
        return showDialog(options, DialogType.warning);
    },
    error(options) {
        return showDialog(options, DialogType.error);
    },
    confirm(options) {
        return showDialog(options, DialogType.confirm);
    },
    hide(context) {
        const instance = getInstance(context);
        if (!instance) {
            return;
        }
        instance.linHide();
    },
};
export default Message;
