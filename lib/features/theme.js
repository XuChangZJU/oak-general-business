"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constants_1 = require("../config/constants");
var oak_frontend_base_1 = require("oak-frontend-base");
var Theme_1 = require("../types/Theme");
var defaultTheme = Theme_1.ETheme.light;
var initialThemeState = {
    setting: false,
    theme: defaultTheme,
    systemTheme: false,
    isFullPage: false,
    color: '#0052d9',
    showHeader: true,
    showBreadcrumbs: true,
    showFooter: true,
};
var Theme = /** @class */ (function (_super) {
    tslib_1.__extends(Theme, _super);
    function Theme(cache, storage) {
        var _this = _super.call(this) || this;
        _this.cache = cache;
        _this.storage = storage;
        var themeState = storage.load(constants_1.LOCAL_STORAGE_KEYS.themeState);
        _this.themeState = themeState || initialThemeState;
        _this.switchTheme(_this.themeState.theme);
        _this.switchColor(_this.themeState.color);
        return _this;
    }
    Theme.prototype.get = function () {
        return this.themeState;
    };
    Theme.prototype.set = function (themeState) {
        this.themeState = themeState;
        this.storage.save(constants_1.LOCAL_STORAGE_KEYS.themeState, themeState);
        this.publish();
    };
    Theme.prototype.toggleSetting = function () {
        var state = this.themeState;
        state.setting = !state.setting;
        this.set(state);
    };
    Theme.prototype.switchTheme = function (finalTheme) {
        var state = this.themeState;
        // 切换主题颜色
        state.theme = finalTheme;
        // 关闭跟随系统
        state.systemTheme = false;
        switch (process.env.OAK_PLATFORM) {
            case 'web': {
                document.documentElement.setAttribute('theme-mode', finalTheme);
                break;
            }
            default: {
                break;
            }
        }
        this.set(state);
    };
    Theme.prototype.openSystemTheme = function () {
        var state = this.themeState;
        var media = window.matchMedia('(prefers-color-scheme:dark)');
        if (media.matches) {
            var finalTheme = media.matches ? Theme_1.ETheme.dark : Theme_1.ETheme.light;
            // 切换主题颜色
            state.theme = finalTheme;
            state.systemTheme = true;
            switch (process.env.OAK_PLATFORM) {
                case 'web': {
                    document.documentElement.setAttribute('theme-mode', finalTheme);
                    break;
                }
                default: {
                    break;
                }
            }
            this.set(state);
        }
    };
    Theme.prototype.getColor = function () {
        var state = this.themeState;
        return state.color;
    };
    Theme.prototype.switchColor = function (color) {
        var state = this.themeState;
        if (color) {
            state.color = color;
            var colorType = 'blue';
            switch (process.env.OAK_PLATFORM) {
                case 'web': {
                    this.insertThemeStylesheet('blue', color, state.theme);
                    document.documentElement.setAttribute('theme-color', colorType || '');
                    break;
                }
                default: {
                    break;
                }
            }
            this.set(state);
        }
    };
    Theme.prototype.insertThemeStylesheet = function (theme, color, mode) {
        var isDarkMode = mode === 'dark';
        var root = !isDarkMode
            ? ":root[theme-color='".concat(theme, "']")
            : ":root[theme-color='".concat(theme, "'][theme-mode='dark']");
        var styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = "".concat(root, "{\n            --oak-color-primary: ").concat(color, ";\n        }");
        document.head.appendChild(styleSheet);
    };
    return Theme;
}(oak_frontend_base_1.Feature));
exports.default = Theme;
