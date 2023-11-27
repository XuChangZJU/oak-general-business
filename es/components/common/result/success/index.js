import React, { memo } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import Style from './index.module.less';
const Success = (props) => (<div className={Style.content}>
        {props.icon || <CheckCircleOutlined className={Style.icon}/>}
        <div className={Style.title}>{props.title || '创建成功'}</div>
        <div className={Style.description}>
            {props.description || '恭喜，创建成功，可以在列表中查看。'}
        </div>
        {props.children}
    </div>);
export default memo(Success);
