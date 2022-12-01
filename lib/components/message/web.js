"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
function render(props) {
    var _a = tslib_1.__read(antd_1.message.useMessage(), 2), messageApi = _a[0], contextHolder = _a[1];
    var data = props.data.data;
    (0, react_1.useEffect)(function () {
        if (data) {
            messageApi[data.type](data);
        }
    }, [data]);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: contextHolder });
}
exports.default = render;
