import React, { Component } from 'react';
import { Card, Avatar, Tag, Space } from 'antd';
import {
    PictureFilled,
} from '@ant-design/icons';
const { Meta } = Card;


export default function render() {
    const { t } = this.props;
    const { iState, name, mobile, nickname, avatar, stateColor, userState } = this.state;
    return (
        <div className="cell" onClick={(e) => this.onCellClicked(e)}>
            {avatar ? (
                <img className="avatar" src="{{item.avatar}}" />
            ) : (
                <div className="img-view">
                    <PictureFilled />   
                </div>
            )}
                <div className="user-info">
                    <div className="row">
                        <div className="nickname">{nickname || '未设置'}</div>
                        <Tag color={stateColor[userState]}>
                            {userState}
                        </Tag>
                    </div>
                    <div className="name">姓名：
                        {name || '未设置'}</div>
                    <div className="mobile">
                        手机号：
                        {mobile || '未设置'}
                    </div>
                </div>
            </div>
    );
}
