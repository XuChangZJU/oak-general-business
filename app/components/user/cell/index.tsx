import React, { Component } from 'react';
import { Avatar, Tag, Cell } from 'tdesign-mobile-react';

export default function render() {
    const { t, click } = this.props;
    const { iState, name, mobile, nickname, avatar, stateColor, userState } =
        this.state;
    return (
        <Cell
            onClick={() => click()}
            image={<img className="avatar" src={avatar} />}
            title={name || '未设置'}
            description={
                <div>
                    <div className="mobile">
                        手机号：
                        {mobile || '未设置'}
                    </div>
                    <Tag theme={stateColor[userState]} content={userState} />
                </div>
            }
        />
    );
}
