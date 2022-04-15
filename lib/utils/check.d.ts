export declare function checkAttributesNotNull<T extends Record<string, any>>(data: T, attributes: Array<keyof T>, allowEmpty?: true): void;
export declare function checkAttributesScope<T extends Record<string, any>>(data: T, attributes: Array<keyof T>): void;
