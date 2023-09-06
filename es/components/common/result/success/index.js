import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import Style from './index.module.less';
const Success = (props) => (_jsxs("div", { className: Style.content, children: [props.icon || _jsx(CheckCircleOutlined, { className: Style.icon }), _jsx("div", { className: Style.title, children: props.title || '创建成功' }), _jsx("div", { className: Style.description, children: props.description || '恭喜，创建成功，可以在列表中查看。' }), props.children] }));
export default memo(Success);
