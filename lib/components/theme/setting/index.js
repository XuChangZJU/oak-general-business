"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Theme_1 = require("../../../types/Theme");
const useFeatures_1 = tslib_1.__importDefault(require("../../../hooks/useFeatures"));
const RadioColor_1 = tslib_1.__importDefault(require("./RadioColor"));
const RadioRect_1 = tslib_1.__importDefault(require("./RadioRect"));
const assets_setting_light_svg_1 = require("./assets/svg/assets-setting-light.svg");
const assets_setting_dark_svg_1 = require("./assets/svg/assets-setting-dark.svg");
const assets_setting_auto_svg_1 = require("./assets/svg/assets-setting-auto.svg");
const index_module_less_1 = tslib_1.__importDefault(require("./index.module.less"));
var ESettingTheme;
(function (ESettingTheme) {
    ESettingTheme[ESettingTheme["system"] = 0] = "system";
})(ESettingTheme || (ESettingTheme = {}));
const themeList = [
    {
        value: Theme_1.ETheme.light,
        image: (0, jsx_runtime_1.jsx)(assets_setting_light_svg_1.ReactComponent, {}),
        name: '明亮',
    },
    {
        value: Theme_1.ETheme.dark,
        image: (0, jsx_runtime_1.jsx)(assets_setting_dark_svg_1.ReactComponent, {}),
        name: '黑暗',
    },
    {
        value: ESettingTheme.system,
        image: (0, jsx_runtime_1.jsx)(assets_setting_auto_svg_1.ReactComponent, {}),
        name: '跟随系统',
    },
];
function Render() {
    const features = (0, useFeatures_1.default)();
    const themeState = features.theme.get();
    const [systemTheme, setSystemTheme] = (0, react_1.useState)(themeState?.systemTheme);
    const [theme, setTheme] = (0, react_1.useState)(themeState?.theme);
    const [color, setColor] = (0, react_1.useState)(themeState?.color);
    const handleThemeSwitch = (value) => {
        if (value === ESettingTheme.system) {
            features.theme.openSystemTheme();
        }
        else {
            features.theme.switchTheme(value);
        }
    };
    (0, react_1.useEffect)(() => {
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
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: index_module_less_1.default.settingTitle, children: "\u4E3B\u9898\u6A21\u5F0F" }), (0, jsx_runtime_1.jsx)(RadioRect_1.default, { defaultValue: systemTheme ? ESettingTheme.system : theme, onChange: handleThemeSwitch, options: themeList }), (0, jsx_runtime_1.jsx)("div", { className: index_module_less_1.default.settingTitle, children: "\u4E3B\u9898\u8272" }), (0, jsx_runtime_1.jsx)(RadioColor_1.default, { defaultValue: color, onChange: (value) => features.theme.switchColor(value) })] }));
}
exports.default = Render;
