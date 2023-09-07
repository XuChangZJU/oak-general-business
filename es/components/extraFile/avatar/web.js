import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Style from './web.module.less';
export default function render(props) {
    const { style, className, avatarUrl } = props.data;
    const { onPickByWeb } = props.methods;
    return (_jsxs(_Fragment, { children: [_jsx("input", { id: "input-for-upload", accept: "image/*", className: Style.input, onChange: (evt) => {
                    const { files } = evt.currentTarget;
                    onPickByWeb(Object.values(files));
                    //evt.target.value = null;
                }, type: "file" }), _jsx("label", { htmlFor: "input-for-upload", children: avatarUrl ? (_jsx(Avatar, { size: 64, src: avatarUrl })) : (_jsx(Avatar, { size: 64, icon: _jsx(UserOutlined, {}) })) })] }));
}
