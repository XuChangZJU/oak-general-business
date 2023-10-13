"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    const { methods, data } = props;
    const { nickname, avatarUrl, name } = data;
    const defaultUrl = 'data:image/png;base64,UklGRoICAABXRUJQVlA4IHYCAADwKACdASosASwBPrVarU8nJiUiJJjIEOAWiWlu4XShG/NX+q91/WYL37Uns/lNhNG6y8oBCkjJGSMkZIyRkjJGSMkZIyRkjJGSMkZIyRkjJGR8IMX6z+YtjIoxEY3KVOOQSyXEuJcR/ZAAHyQcUpZRWfL4lxLiXBnkSU0B4NcCHWSK4CBdk6WS4PC/jULN2pAeRlwRqF2xCZ400cTnW2ogZi8OtcthRiMouvr2dYEgJARhbEb+09k94h/a5mFkC7J2To60i1IWmYHR5OLiXEuJcSAK9Xk4C8ve/Uq7iBoiHvSAkBH4KrcZKm3UErOOpxquA3X2PWjC2wI/Dz57QAZ5J2Tsl6p+Eiy4BhYvDwpoChtMjLgEdPjq37JfS+Rm/7niuhE0jzkyk7jDjACsogklFiMtpkZfbolR4QRN7J2TsnZOydk7J2TsnZOydk7J0YAA/v67qQMAOmxdZAbD1n8UzeBoApiFopfRVxPpEh3G4wAp0EwQD6kJbi6xm8OOhiuS4WeYZ8hxC45E4PZfT56WVnzaLLWW1i9XLyz05YJhxQ6iT5aOk5J1rNnENlAzf+i/0WpEd/edFMYu+q2U4pBjLEoLPE0DGVeHtS7zt4vTVCiXBfibW0mgqhbRQhDrr5ctACqSBsx+8f/HDobGN621bjYch19yGQegV6eUMGNu9bVQi+vQdZvTK4d7MtISka7dqmVYfuI3Z6nUBA/Nzg0ApEhQ+CAmDvSRrKCjxbJBYdc+MsQpTv0DdUkoDVa18rZrKyIeUT4pYRFJcnsT+OoAJGGIdRGn6A4NtB3woJnI/x3d+Rgibkn5GcX4oAfaVqkvAAAAAAA=';
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.header, children: [(0, jsx_runtime_1.jsx)(antd_1.Avatar, { shape: "square", className: web_module_less_1.default.avatar, src: avatarUrl || defaultUrl }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.nickname, children: nickname || name })] }));
}
exports.default = render;
