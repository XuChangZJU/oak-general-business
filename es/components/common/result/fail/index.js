import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Style from './index.module.less';
const Fail = (props) => (_jsxs("div", { className: Style.content, children: [props.icon || _jsx(ExclamationCircleOutlined, { className: Style.icon }), _jsx("div", { className: Style.title, children: props.title || '创建失败' }), _jsx("div", { className: Style.description, children: props.description || '抱歉，创建失败，请联系管理员进行排查！' }), props.children] }));
export default memo(Fail);
