"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
function render(props) {
    const [messageApi, contextHolder] = antd_1.message.useMessage();
    const { data } = props.data;
    (0, react_1.useEffect)(() => {
        if (data) {
            messageApi[data.type](data);
        }
    }, [data]);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: contextHolder });
}
exports.default = render;
