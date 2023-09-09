"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Theme_1 = require("../../../types/Theme");
var useFeatures_1 = tslib_1.__importDefault(require("../../../hooks/useFeatures"));
var RadioColor_1 = tslib_1.__importDefault(require("./RadioColor"));
var RadioRect_1 = tslib_1.__importDefault(require("./RadioRect"));
var assets_setting_light_svg_1 = require("./assets/svg/assets-setting-light.svg");
var assets_setting_dark_svg_1 = require("./assets/svg/assets-setting-dark.svg");
var assets_setting_auto_svg_1 = require("./assets/svg/assets-setting-auto.svg");
var index_module_less_1 = tslib_1.__importDefault(require("./index.module.less"));
var ESettingTheme;
(function (ESettingTheme) {
    ESettingTheme[ESettingTheme["system"] = 0] = "system";
})(ESettingTheme || (ESettingTheme = {}));
var themeList = [
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
    var features = (0, useFeatures_1.default)();
    var themeState = features.theme.get();
    var _a = tslib_1.__read((0, react_1.useState)(themeState === null || themeState === void 0 ? void 0 : themeState.systemTheme), 2), systemTheme = _a[0], setSystemTheme = _a[1];
    var _b = tslib_1.__read((0, react_1.useState)(themeState === null || themeState === void 0 ? void 0 : themeState.theme), 2), theme = _b[0], setTheme = _b[1];
    var _c = tslib_1.__read((0, react_1.useState)(themeState === null || themeState === void 0 ? void 0 : themeState.color), 2), color = _c[0], setColor = _c[1];
    var handleThemeSwitch = function (value) {
        if (value === ESettingTheme.system) {
            features.theme.openSystemTheme();
        }
        else {
            features.theme.switchTheme(value);
        }
    };
    (0, react_1.useEffect)(function () {
        var themeUnsub = features.theme.subscribe(function () {
            var themeState = features.theme.get();
            setSystemTheme(themeState.systemTheme);
            setTheme(themeState.theme);
            setColor(themeState.color);
        });
        return function () {
            themeUnsub();
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: index_module_less_1.default.settingTitle }, { children: "\u4E3B\u9898\u6A21\u5F0F" })), (0, jsx_runtime_1.jsx)(RadioRect_1.default, { defaultValue: systemTheme ? ESettingTheme.system : theme, onChange: handleThemeSwitch, options: themeList }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: index_module_less_1.default.settingTitle }, { children: "\u4E3B\u9898\u8272" })), (0, jsx_runtime_1.jsx)(RadioColor_1.default, { defaultValue: color, onChange: function (value) { return features.theme.switchColor(value); } })] }));
}
exports.default = Render;
