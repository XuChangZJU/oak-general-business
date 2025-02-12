import { EntityDict } from '../oak-app-domain';
import { LOCAL_STORAGE_KEYS } from '../config/constants';
import { Feature } from 'oak-frontend-base/es/types/Feature';
import { CommonAspectDict } from 'oak-common-aspect';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { LocalStorage } from 'oak-frontend-base/es/features/localStorage';
import AspectDict from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { ETheme, IThemeState } from '../types/Theme';

const defaultTheme = ETheme.light;

const initialThemeState: IThemeState = {
    setting: false,
    themeMode: defaultTheme,
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

    private async loadSavedState() {        
        const themeState = await this.storage.load(LOCAL_STORAGE_KEYS.themeState);
        this.themeState = themeState;
    }

    constructor(
        cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>,
        storage: LocalStorage
    ) {
        super();
        this.cache = cache;
        this.storage = storage;
        this.themeState = initialThemeState;
        this.switchThemeMode(this.themeState.themeMode);
        this.switchColor(this.themeState.color);
    }

    get() {
        return this.themeState;
    }

    set(themeState: IThemeState) {
        this.themeState = themeState;
        this.storage.save(LOCAL_STORAGE_KEYS.themeState, themeState);
        this.publish();
    }

    toggleSetting() {
        const state = this.themeState;
        state.setting = !state.setting;
        this.set(state);
    }

    switchThemeMode(finalThemeMode: ETheme) {
        const state = this.themeState;
        // 切换主题颜色
        state.themeMode = finalThemeMode;
        // 关闭跟随系统
        state.systemTheme = false;
        switch (process.env.OAK_PLATFORM) {
            case 'web': {
                document.documentElement.setAttribute(
                    'theme-mode',
                    finalThemeMode
                );
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
            const finalThemeMode = media.matches ? ETheme.dark : ETheme.light;
            // 切换黑暗主题
            state.themeMode = finalThemeMode;
            state.systemTheme = true;
            switch (process.env.OAK_PLATFORM) {
                case 'web': {
                    document.documentElement.setAttribute(
                        'theme-mode',
                        finalThemeMode
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
            state.color = color; // 某主题 主题色
            const themeColor = 'blue'; // 主题颜色类型
            switch (process.env.OAK_PLATFORM) {
                case 'web': {
                    this.insertThemeStylesheet(
                        themeColor,
                        color,
                        state.themeMode
                    );
                    document.documentElement.setAttribute(
                        'theme-color',
                        themeColor
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

    insertThemeStylesheet(theme: string, color: string, mode: ETheme) {
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
