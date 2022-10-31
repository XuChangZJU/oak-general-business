import React from 'react';
import {
    LoadingOutlined,
    WarningOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import Style from './web.module.less';

export default function render(this: any) {
    const { oakLoading, isExist, expired } = this.state;

    let V;
    if (oakLoading) {
        V = (
            <div className="circle-view">
                <LoadingOutlined style={{ fontSize: 40 }} />
                <div className="text">加载中</div>
            </div>
        );
    } else if (!isExist) {
        V = (
            <div className="circle-view">
                <CloseCircleOutlined style={{ fontSize: 40 }} />
                <div className="text">二维码非法</div>
            </div>
        );
    } else if (expired) {
        V = (
            <div className="circle-view">
                <WarningOutlined style={{ fontSize: 40 }} />
                <div className="text">二维码已过期</div>
            </div>
        );
    } else {
        V = (
            <div className="circle-view">
                <LoadingOutlined style={{ fontSize: 40 }} />
                <div className="text">跳转中</div>
            </div>
        );
    }

    return <div className="page-body">{V}</div>;
}
