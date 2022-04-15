import { AttrIllegalError } from "oak-domain/lib/types";

export function checkAttributesNotNull<T extends Record<string, any>>(data: T, attributes: Array<keyof T>, allowEmpty?: true) {
    const attrs = attributes.filter(
        (attr) => {
            if (data[attr] === null || data[attr] === '') {
                return true;
            }
            if (!allowEmpty && !data.hasOwnProperty(attr)) {
                return true;
            }
        }
    ) as string[];

    if (attrs.length > 0) {
        throw new AttrIllegalError(attrs, '属性不能为空');
    }
};

export function checkAttributesScope<T extends Record<string, any>>(data: T, attributes: Array<keyof T>) {
    const attrs = attributes.filter(
        attr => !data.hasOwnProperty(attr)
    ) as string[];    

    if (attrs.length > 0) {
        throw new AttrIllegalError(attrs, '多余的属性');
    }
}
