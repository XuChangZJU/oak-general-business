import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Input, Modal } from 'antd';
export default function Render(props) {
    const { methods, data, } = props;
    const { t, } = methods;
    const { oakFullpath, oakId, name, openSubway, onClose, } = data;
    return (_jsx(Modal, { title: oakId ? '编辑地铁' : '新增地铁', open: openSubway, destroyOnClose: true, okText: "\u786E\u5B9A", cancelText: "\u53D6\u6D88", onOk: async () => {
            methods.execute();
            onClose();
        }, onCancel: () => {
            onClose();
        }, children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165\u7EBF\u8DEF\u540D\u79F0", value: name, onChange: ({ target: { value } }) => {
                    methods.update({ name: value });
                } }) }) }));
}
