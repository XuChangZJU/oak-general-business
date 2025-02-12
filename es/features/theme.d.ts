import { EntityDict } from '../oak-app-domain';
import { Feature } from 'oak-frontend-base/es/types/Feature';
import { CommonAspectDict } from 'oak-common-aspect';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { LocalStorage } from 'oak-frontend-base/es/features/localStorage';
import AspectDict from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { ETheme, IThemeState } from '../types/Theme';
export default class Theme<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>> extends Feature {
    private cache;
    private themeState;
    private storage;
    private loadSavedState;
    constructor(cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>, storage: LocalStorage);
    get(): IThemeState;
    set(themeState: IThemeState): void;
    toggleSetting(): void;
    switchThemeMode(finalThemeMode: ETheme): void;
    openSystemTheme(): void;
    getColor(): string;
    switchColor(color: string): void;
    insertThemeStylesheet(theme: string, color: string, mode: ETheme): void;
}
