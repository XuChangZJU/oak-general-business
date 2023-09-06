import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { defaultColor } from './color';
import Style from './radioColor.module.less';
const RadioColor = (props) => (_jsx("div", { className: Style.panel, children: defaultColor.map((color, index) => (_jsx("div", { onClick: () => props?.onChange(color), className: Style.box, style: {
            borderColor: props.defaultValue === color ? color : 'transparent',
        }, children: _jsx("div", { className: Style.item, style: { backgroundColor: color } }) }, index))) }));
export default React.memo(RadioColor);
