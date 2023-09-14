export type ColorType = 'primary' | 'success' | 'error' | 'warning' | 'info';
export type Color = {
    [k in ColorType]?: string;
};
export type Style = {
    color?: Color;
};
