"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var imgBox_1 = tslib_1.__importDefault(require("oak-frontend-base/src/components/imgBox"));
function render(props) {
    var _a = props.data, isModalOpen = _a.isModalOpen, isModalOpen1 = _a.isModalOpen1, renderImgs = _a.renderImgs, src = _a.src, bridgeUrl = _a.bridgeUrl, originImgLoading = _a.originImgLoading;
    var _b = props.methods, t = _b.t, onModalConfirm = _b.onModalConfirm, chooseMethod = _b.chooseMethod, closeModal1 = _b.closeModal1, closeModal = _b.closeModal, onModal1Confirm = _b.onModal1Confirm;
    var methods = ['original', 'url', 'uploadLocalImg'];
    var _c = tslib_1.__read((0, react_1.useState)(-1), 2), selectedId = _c[0], setSelectedId = _c[1];
    var _d = tslib_1.__read(antd_1.Form.useForm(), 1), form = _d[0];
    var renderUrl = bridgeUrl || src; // 用户选图预览
    var handleOk = function () {
        onModalConfirm(form.getFieldValue('url'));
        form.setFieldValue('url', '');
        closeModal();
    };
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.imgBox }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ direction: "vertical", size: 4 }, { children: [(0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), (0, jsx_runtime_1.jsx)("div", { children: "\u9009\u62E9\u5C01\u9762" })] })), (0, jsx_runtime_1.jsx)("img", { id: "previewImg", src: renderUrl, alt: "previewImg", className: web_module_less_1.default.previewImg, style: { display: renderUrl ? 'inline-block' : 'none' } }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.methodList }, { children: methods && methods.map(function (ele) { return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.methodListItem, onClick: function () {
                        chooseMethod(ele);
                    } }, { children: t(ele) }))); }) })), (0, jsx_runtime_1.jsx)(antd_1.Modal, tslib_1.__assign({ title: t('fillInImageLink'), open: isModalOpen, onOk: handleOk, onCancel: closeModal }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form, tslib_1.__assign({ form: form, className: web_module_less_1.default.formMT }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ name: "url", rules: [
                            {
                                required: true,
                                message: '外部链接不能为空',
                            },
                            {
                                pattern: /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
                                message: '请输入正确的外链',
                            }
                        ] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: function (_a) {
                                var value = _a.target.value;
                                form.setFieldValue('url', value);
                            }, placeholder: '\u5982\uFF1Ahttps://www.xxx.com' }) })) })) })), (0, jsx_runtime_1.jsx)(antd_1.Modal, tslib_1.__assign({ width: 800, title: t('chooseImage'), open: isModalOpen1, onOk: function () { return onModal1Confirm(selectedId); }, onCancel: closeModal1 }, { children: (0, jsx_runtime_1.jsx)(antd_1.Spin, tslib_1.__assign({ spinning: originImgLoading }, { children: (renderImgs && renderImgs.length) ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Row, tslib_1.__assign({ gutter: [4, 4] }, { children: renderImgs.map(function (img) {
                                return (0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ span: 4 }, { children: (0, jsx_runtime_1.jsx)(imgBox_1.default, { width: "100%", bordered: true, mode: "select", src: img.renderUrl, selected: selectedId === img.id, onClick: function () {
                                            if (selectedId === img.id) {
                                                setSelectedId(-1);
                                            }
                                            else {
                                                setSelectedId(img.id);
                                            }
                                        } }, img.id) }));
                            }) })) })) : ((0, jsx_runtime_1.jsx)(antd_1.Empty, { image: antd_1.Empty.PRESENTED_IMAGE_SIMPLE })) })) }))] })));
}
exports.default = render;
