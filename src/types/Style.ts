export type ColorType = 'primary' | 'success' | 'error' | 'warning' | 'info';

export type Color = {
    // primary: string;
    // success?: string;
    // error?: string;
    // warning?: string;
    // info?: string;
    [k in ColorType]?: string;
};


export type Style = {
    color?: Color;
};
