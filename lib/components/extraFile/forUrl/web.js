"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const imgBox_1 = tslib_1.__importDefault(require("oak-frontend-base/src/components/imgBox"));
function render(props) {
    const { isModalOpen, isModalOpen1, renderImgs, src, bridgeUrl, selectedId, } = props.data;
    const { t, onModalConfirm, chooseMethod, closeModal1, closeModal, onModal1Confirm, setSelectedId } = props.methods;
    const methods = ['original', 'url', 'uploadLocalImg'];
    const [form] = antd_1.Form.useForm();
    const handleOk = () => {
        onModalConfirm(form.getFieldValue('url'));
        form.setFieldValue('url', '');
        closeModal();
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.imgBox, children: [(0, jsx_runtime_1.jsxs)(antd_1.Space, { direction: "vertical", size: 4, children: [(0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), (0, jsx_runtime_1.jsx)("div", { children: "\u9009\u62E9\u5C01\u9762" })] }), (0, jsx_runtime_1.jsx)("img", { id: "previewImg", src: src, alt: "previewImg", className: web_module_less_1.default.previewImg, style: { display: src ? 'inline-block' : 'none' } }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.methodList, children: methods && methods.map((ele) => ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.methodListItem, onClick: () => {
                        chooseMethod(ele);
                    }, children: t(ele) }))) }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { title: t('fillInImageLink'), open: isModalOpen, onOk: handleOk, onCancel: closeModal, children: (0, jsx_runtime_1.jsx)(antd_1.Form, { form: form, className: web_module_less_1.default.formMT, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "url", rules: [
                            {
                                required: true,
                                message: '外部链接不能为空',
                            },
                            {
                                pattern: /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
                                message: '请输入正确的外链',
                            }
                        ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: ({ target: { value } }) => {
                                form.setFieldValue('url', value);
                            }, placeholder: '\u5982\uFF1Ahttps://www.xxx.com' }) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { width: 800, title: t('chooseImage'), open: isModalOpen1, onOk: () => onModal1Confirm(selectedId), onCancel: closeModal1, children: (renderImgs && renderImgs.length) ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Row, { gutter: [4, 4], children: renderImgs.map((img) => (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 4, children: (0, jsx_runtime_1.jsx)(imgBox_1.default, { width: "100%", bordered: true, mode: "select", src: img.renderUrl, selected: selectedId === img.id, onClick: () => {
                                    if (selectedId === img.id) {
                                        setSelectedId(-1);
                                    }
                                    else {
                                        setSelectedId(img.id);
                                    }
                                } }, img.id) })) }) })) : ((0, jsx_runtime_1.jsx)(antd_1.Empty, { image: antd_1.Empty.PRESENTED_IMAGE_SIMPLE })) })] }));
}
exports.default = render;
