import React, { Component } from 'react';
import { Cell, Image, Tag, Checkbox } from 'tdesign-mobile-react';
import { Button } from 'tdesign-react';


export default function render() {
    const {t} = this;
    const { entity } = this.props;
    const { avatar, nickname, name, mobile, relationArr } = this.state;
    return (
        <div>
            <Cell
                title={nickname || '未设置'}
                image={
                    <Image
                        src={avatar}
                        alt="头像"
                        style={{ width: 80, height: 80 }}
                    />
                }
                description={
                    <div className="description">
                        <div className="name">姓名: {name || '未设置'}</div>
                        <div className="mobile">手机: {mobile || '未设置'}</div>
                    </div>
                }
            />
            {relationArr?.map((item) => (
                <Checkbox
                    checked={item.checked}
                    label={t(entity + ':r.' + item.value)}
                    onChange={(checked) => {
                        this.onChangeValue(item.value, checked);
                    }}
                />
            ))}
            <Button theme="primary" block onClick={() => this.onConfirm()}>
                保存
            </Button>
        </div>
    );
}
