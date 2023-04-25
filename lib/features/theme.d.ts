import { EntityDict } from '../general-app-domain';
import { Cache } from 'oak-frontend-base/lib/features/cache';
import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { CommonAspectDict } from 'oak-common-aspect';
import { LocalStorage } from 'oak-frontend-base/lib/features/localStorage';
import { AspectDict } from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { ETheme, IThemeState } from '../types/themeState';
export default class Theme<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>> extends Feature {
    private cache;
    private themeState;
    private storage;
    constructor(cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>, storage: LocalStorage);
    get(): IThemeState;
    set(themeState: IThemeState): void;
    toggleMenu(collapsed?: boolean | undefined): void;
    toggleSetting(): void;
    switchTheme(finalTheme: ETheme): void;
    openSystemTheme(): void;
    getColor(): string;
    switchColor(color: string): void;
    insertThemeStylesheet(theme: string, color: string, mode: 'light' | 'dark'): void;
}
