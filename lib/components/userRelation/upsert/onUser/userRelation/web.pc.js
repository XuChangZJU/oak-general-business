"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
function Render(props) {
    const { entity, relations2 } = props.data;
    const { t, onRelationChange } = props.methods;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: relations2?.map(({ relation, isChecked }) => ((0, jsx_runtime_1.jsx)(antd_1.Checkbox, { checked: isChecked, value: relation, onChange: ({ target }) => {
                const { checked } = target;
                onRelationChange(relation, checked);
            }, children: relation.name ? t(`${entity}:r.${relation.name}`) : relation.display }))) }));
}
exports.default = Render;
