import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { ETheme } from '../../../types/themeState';
import useFeatures from '../../../hooks/useFeatures';
import RadioColor from './RadioColor';
import RadioRect from './RadioRect';
import { ReactComponent as Light } from './assets/svg/assets-setting-light.svg';
import { ReactComponent as Dark } from './assets/svg/assets-setting-dark.svg';
import { ReactComponent as System } from './assets/svg/assets-setting-auto.svg';
import Style from './index.module.less';
var ESettingTheme;
(function (ESettingTheme) {
    ESettingTheme[ESettingTheme["system"] = 0] = "system";
})(ESettingTheme || (ESettingTheme = {}));
const themeList = [
    {
        value: ETheme.light,
        image: _jsx(Light, {}),
        name: '明亮',
    },
    {
        value: ETheme.dark,
        image: _jsx(Dark, {}),
        name: '黑暗',
    },
    {
        value: ESettingTheme.system,
        image: _jsx(System, {}),
        name: '跟随系统',
    },
];
export default function Render() {
    const features = useFeatures();
    const themeState = features.theme.get();
    const [systemTheme, setSystemTheme] = useState(themeState?.systemTheme);
    const [theme, setTheme] = useState(themeState?.theme);
    const [color, setColor] = useState(themeState?.color);
    const handleThemeSwitch = (value) => {
        if (value === ESettingTheme.system) {
            features.theme.openSystemTheme();
        }
        else {
            features.theme.switchTheme(value);
        }
    };
    useEffect(() => {
        const themeUnsub = features.theme.subscribe(() => {
            const themeState = features.theme.get();
            setSystemTheme(themeState.systemTheme);
            setTheme(themeState.theme);
            setColor(themeState.color);
        });
        return () => {
            themeUnsub();
        };
    }, []);
    return (_jsxs("div", { children: [_jsx("div", { className: Style.settingTitle, children: "\u4E3B\u9898\u6A21\u5F0F" }), _jsx(RadioRect, { defaultValue: systemTheme ? ESettingTheme.system : theme, onChange: handleThemeSwitch, options: themeList }), _jsx("div", { className: Style.settingTitle, children: "\u4E3B\u9898\u8272" }), _jsx(RadioColor, { defaultValue: color, onChange: (value) => features.theme.switchColor(value) })] }));
}
