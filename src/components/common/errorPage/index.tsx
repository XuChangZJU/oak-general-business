import React from 'react';

import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Light403Icon } from './assets/svg/assets-result-403.svg';
import { ReactComponent as Light404Icon } from './assets/svg/assets-result-404.svg';
import { ReactComponent as Light500Icon } from './assets/svg/assets-result-500.svg';
import './index.less';

enum ECode {
    forbidden = 403,
    notFount = 404,
    error = 500,
}

interface IErrorPageProps {
    code: ECode;
    title?: string;
    desc?: string;
}

const errorInfo = {
    [ECode.forbidden]: {
        title: '403 Forbidden',
        desc: '抱歉，您无权限访问此页面',
        icon: <Light403Icon />,
    },
    [ECode.notFount]: {
        title: '404 Not Found',
        desc: '抱歉，您访问的页面不存在。',
        icon: <Light404Icon />,
    },
    [ECode.error]: {
        title: '500 Internal Server Error',
        desc: '抱歉，服务器出错啦！',
        icon: <Light500Icon />,
    },
};


function ErrorPage(props: IErrorPageProps) {
    const navigate = useNavigate();
    const { code } = props;
    const info = errorInfo[code];
    const prefixCls = 'oak';


    return (
        <div className={`${prefixCls}-errorBox`}>
            {info?.icon}
            <div className={`${prefixCls}-errorBox__title`}>{info?.title}</div>
            <div className={`${prefixCls}-errorBox__description`}>
                {info?.desc}
            </div>
            <Button
                type="primary"
                onClick={() => {
                    navigate(-1);
                }}
            >
                返回
            </Button>
        </div>
    );
}

export default ErrorPage;
