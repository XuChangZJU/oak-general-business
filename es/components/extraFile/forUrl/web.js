import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Space, Modal, Form, Input, Empty, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Style from "./web.module.less";
import ImgBox from "oak-frontend-base/es/components/imgBox";
export default function render(props) {
    const { isModalOpen, isModalOpen1, renderImgs, src, bridgeUrl, selectedId, } = props.data;
    const { t, onModalConfirm, chooseMethod, closeModal1, closeModal, onModal1Confirm, setSelectedId } = props.methods;
    const methods = ['original', 'url', 'uploadLocalImg'];
    const [form] = Form.useForm();
    const handleOk = () => {
        onModalConfirm(form.getFieldValue('url'));
        form.setFieldValue('url', '');
        closeModal();
    };
    return (_jsxs("div", { className: Style.imgBox, children: [_jsxs(Space, { direction: "vertical", size: 4, children: [_jsx(PlusOutlined, {}), _jsx("div", { children: "\u9009\u62E9\u5C01\u9762" })] }), _jsx("img", { id: "previewImg", src: src, alt: "previewImg", className: Style.previewImg, style: { display: src ? 'inline-block' : 'none' } }), _jsx("div", { className: Style.methodList, children: methods && methods.map((ele) => (_jsx("div", { className: Style.methodListItem, onClick: () => {
                        chooseMethod(ele);
                    }, children: t(ele) }))) }), _jsx(Modal, { title: t('fillInImageLink'), open: isModalOpen, onOk: handleOk, onCancel: closeModal, children: _jsx(Form, { form: form, className: Style.formMT, children: _jsx(Form.Item, { name: "url", rules: [
                            {
                                required: true,
                                message: '外部链接不能为空',
                            },
                            {
                                pattern: /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
                                message: '请输入正确的外链',
                            }
                        ], children: _jsx(Input, { onChange: ({ target: { value } }) => {
                                form.setFieldValue('url', value);
                            }, placeholder: '\u5982\uFF1Ahttps://www.xxx.com' }) }) }) }), _jsx(Modal, { width: 800, title: t('chooseImage'), open: isModalOpen1, onOk: () => onModal1Confirm(selectedId), onCancel: closeModal1, children: (renderImgs && renderImgs.length) ? (_jsx(_Fragment, { children: _jsx(Row, { gutter: [4, 4], children: renderImgs.map((img) => _jsx(Col, { span: 4, children: _jsx(ImgBox, { width: "100%", bordered: true, mode: "select", src: img.renderUrl, selected: selectedId === img.id, onClick: () => {
                                    if (selectedId === img.id) {
                                        setSelectedId(-1);
                                    }
                                    else {
                                        setSelectedId(img.id);
                                    }
                                } }, img.id) })) }) })) : (_jsx(Empty, { image: Empty.PRESENTED_IMAGE_SIMPLE })) })] }));
}
