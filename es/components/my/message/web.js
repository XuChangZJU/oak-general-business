import React from 'react';
import { Badge } from 'antd-mobile';
import classNames from 'classnames';
import { BellOutlined } from '@ant-design/icons';
import Style from './mobile.module.less';
export default function Render(props) {
    const { data, methods } = props;
    const { count, className, onClick, style } = data;
    const { goMessageList } = methods;
    return (<Badge content={count || ''}>
            <BellOutlined className={classNames(Style.icon, className)} style={style} onClick={(e) => {
            if (typeof onClick === 'function') {
                onClick(e);
                return;
            }
            goMessageList();
        }}/>
        </Badge>);
}
