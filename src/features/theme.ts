import { EntityDict } from '../general-app-domain';
import { BasicFeatures } from 'oak-frontend-base/lib/features';
import { Cache } from 'oak-frontend-base/lib/features/cache';
import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { CommonAspectDict } from 'oak-common-aspect';
import { LocalStorage } from 'oak-frontend-base/lib/features/localStorage';
import AspectDict from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { ETheme, IThemeState } from '../types/themeState';

const defaultTheme = ETheme.light;

const initialThemeState: IThemeState = {
    setting: false,
    theme: defaultTheme,
    systemTheme: false,
    isFullPage: false,
    color: '#0052d9',
    showHeader: true,
    showBreadcrumbs: true,
    showFooter: true,
};

export default class Theme<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>
> extends Feature {
    private cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>;
    private themeState: IThemeState;
    private storage: LocalStorage;

    constructor(
        cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>,
        storage: LocalStorage
    ) {
        super();
        this.cache = cache;
        this.storage = storage;
        const themeState = storage.load('theme:themeState');
        this.themeState = themeState || initialThemeState;
        this.switchTheme(this.themeState.theme);
        this.switchColor(this.themeState.color);
    }

    get() {
        return this.themeState;
    }

    set(themeState: IThemeState) {
        this.themeState = themeState;
        this.storage.save('theme:themeState', themeState);
        this.publish();
    }

    toggleSetting() {
        const state = this.themeState;
        state.setting = !state.setting;
        this.set(state);
    }

    switchTheme(finalTheme: ETheme) {
        const state = this.themeState;
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
    }

    openSystemTheme() {
        const state = this.themeState;
        const media = window.matchMedia('(prefers-color-scheme:dark)');
        if (media.matches) {
            const finalTheme = media.matches ? ETheme.dark : ETheme.light;
            // 切换主题颜色
            state.theme = finalTheme;
            state.systemTheme = true;
            switch (process.env.OAK_PLATFORM) {
                case 'web': {
                    document.documentElement.setAttribute(
                        'theme-mode',
                        finalTheme
                    );
                    break;
                }
                default: {
                    break;
                }
            }     
            this.set(state);
        }
    }

    getColor() {
        const state = this.themeState;
        return state.color;
    }

    switchColor(color: string) {
        const state = this.themeState;
        if (color) {
            state.color = color;
            const colorType = 'blue';
            switch (process.env.OAK_PLATFORM) {
                case 'web': {
                    this.insertThemeStylesheet('blue', color, state.theme);
                    document.documentElement.setAttribute(
                        'theme-color',
                        colorType || ''
                    );
                    break;
                }
                default: {
                    break;
                }
            }
            this.set(state);
        }
    }

    insertThemeStylesheet(
        theme: string,
        color: string,
        mode: 'light' | 'dark'
    ) {
        const isDarkMode = mode === 'dark';
        const root = !isDarkMode
            ? `:root[theme-color='${theme}']`
            : `:root[theme-color='${theme}'][theme-mode='dark']`;

        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = `${root}{
            --oak-color-primary: ${color};
        }`;
        document.head.appendChild(styleSheet);
    }
}
