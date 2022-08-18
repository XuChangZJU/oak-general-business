import React, { Component } from 'react';
import { Icon } from 'tdesign-icons-react';

export default function render(this: any) {
    const { oakLoading, isExist, expired } = this.state;

    let V;
    if (oakLoading) {
        V = (
            <div className="circle-view">
                <Icon name="loading" size="40" className="icon" />
                <div className="text">加载中</div>
            </div>
        );
    } else if (!isExist) {
        V = (
            <div className="circle-view">
                <Icon name="error" size="40" className="icon" />
                <div className="text">二维码非法</div>
            </div>
        );
    } else if (expired) {
        V = (
            <div className="circle-view">
                <Icon name="warning" size="40" className="icon" />
                <div className="text">二维码已过期</div>
            </div>
        );
    } else {
        V = (
            <div className="circle-view">
                <Icon name="loading" size="40" className="icon" />
                <div className="text">跳转中</div>
            </div>
        );
    }

    return <div className="page-body">{V}</div>;
}
