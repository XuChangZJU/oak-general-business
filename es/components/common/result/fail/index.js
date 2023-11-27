import React, { memo } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Style from './index.module.less';
const Fail = (props) => (<div className={Style.content}>
        {props.icon || <ExclamationCircleOutlined className={Style.icon}/>}
        <div className={Style.title}>{props.title || '创建失败'}</div>
        <div className={Style.description}>
            {props.description || '抱歉，创建失败，请联系管理员进行排查！'}
        </div>
        {props.children}
    </div>);
export default memo(Fail);
