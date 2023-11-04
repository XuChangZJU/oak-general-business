"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function Render(props) {
    const { userEntityGrant } = props.data;
    if (userEntityGrant) {
        return ((0, jsx_runtime_1.jsx)("div", { children: userEntityGrant.id }));
    }
    return null;
}
exports.default = Render;
