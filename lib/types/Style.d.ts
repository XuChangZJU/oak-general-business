export declare type ColorType = 'primary' | 'success' | 'error' | 'warning' | 'info';
export declare type Color = {
    [k in ColorType]?: string;
};
export declare type Style = {
    color?: Color;
};
