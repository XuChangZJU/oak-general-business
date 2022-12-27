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
            color?:
                | 'primary'
                | 'success'
                | 'error'
                | 'waring'
                | 'info'
                | string;
            size?: string;
            className?: string;
            style?: React.CSSProperties;
        },
        {}
    >
) {
    const { data } = props;

    const {
        name,
        color = '',
        size,
        className,
        style = {},
    } = data;

    const isColor = ['primary', 'info', 'success', 'error', 'warning'].includes(
        color
    );

     let class_name = 'oak-icon ' + 'oak-icon-' + name;
     if (className) {
         class_name += ' ' + className;
     }
     if (isColor || color === '') {
         class_name += ' ' + 'oak-icon__' + (color || 'primary');
     }
     return (
         <span
             className={class_name}
             style={
                 Object.assign(
                     style,
                     size && { fontSize: size },
                     color && !isColor && { color }
                 ) as React.CSSProperties
             }
         ></span>
     );
}