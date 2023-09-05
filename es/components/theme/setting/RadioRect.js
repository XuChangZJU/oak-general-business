import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useState } from 'react';
import classNames from 'classnames';
import Style from './radioRect.module.less';
export default memo((props) => {
    const [selectValue, setSelectValue] = useState(props.defaultValue);
    const handleClick = (option) => {
        setSelectValue(option.value);
        props?.onChange(option.value);
    };
    return (_jsx("div", { className: Style.radioRectPanel, children: props.options.map((item, index) => {
            let ImageItem = item.image;
            if (typeof item.image === 'string') {
                ImageItem = (_jsx("div", { className: Style.rectImg, style: { backgroundImage: `url(${item.image})` } }));
            }
            return (_jsxs("div", { children: [_jsx("div", { className: classNames(Style.rectItem, {
                            [Style.rectItemSelected]: selectValue === item.value,
                        }), onClick: () => handleClick(item), children: ImageItem }), item.name && (_jsx("div", { className: Style.rectText, children: item.name }))] }, index));
        }) }));
});
