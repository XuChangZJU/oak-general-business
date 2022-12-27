import { WebComponentProps } from 'oak-frontend-base';
import React from 'react';
import { EntityDict } from '../../general-app-domain';
import './web.less';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'user',
        false,
        {
            name: string;
            type: 'far' | 'fas';
            color?: 'primary' | 'success' | 'error' | 'waring' | 'info' | string;
            className?: string;
            size?: string;
            larger?:
                | '1x'
                | '2x'
                | '3x'
                | '4x'
                | '5x'
                | '6x'
                | '7x'
                | '8x'
                | '9x'
                | '10x'
                | 'xs'
                | '2xs'
                | 'sm'
                | 'lg'
                | 'xl'
                | '2xl';
        },
        {}
    >
) {
    const { data } = props;

    const { name, type, color = 'primary', size, className, larger = '1x' } = data;

    const isColor = ['primary', 'info', 'success', 'error', 'warning'].includes(
        color
    );

    if (['far', 'fas'].includes(type)) {
        let class_name = type + ' ' + 'fa-' + name;
        if (className) {
            class_name += ' ' + className;
        }
        if (larger) {
            class_name += ' ' + 'fa-' + larger;
        }
        if (isColor) {
             class_name += ' ' + 'oak-icon__' + color;
        }
        return (
            <span
                className={class_name}
                style={
                    Object.assign(
                        {},
                        size && { fontSize: size },
                        !isColor && { color }
                    ) as React.CSSProperties
                }
            ></span>
        );
    }
    return <span>不支持的icon类型{type}</span>;
}