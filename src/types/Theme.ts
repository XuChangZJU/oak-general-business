
export enum ETheme {
    light = 'light',
    dark = 'dark',
}

export interface IThemeState {
    setting: boolean;
    color: string;
    /**
     * 主题：深色 浅色
     */
    themeMode: ETheme;
    /**
     * 是否开启跟随系统主题
     */
    systemTheme: boolean;
    isFullPage: boolean;
    showHeader: boolean;
    showBreadcrumbs: boolean;
    showFooter: boolean;
}

