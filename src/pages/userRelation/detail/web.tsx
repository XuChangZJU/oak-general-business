import React, { Component } from 'react';

import { List, Avatar, Checkbox, Button } from 'tdesign-react';
const { ListItem, ListItemMeta } = List;

import Style from './mobile.module.less';
import { getName } from '../../../utils/randomUser';


export default function render(this: any) {
    const {t} = this;
    const { entity } = this.props;
    const { avatar, nickname, name, mobile, relationArr } = this.state;
    return (
        <div className={Style.container}>
            <List>
                <ListItem>
                    <ListItemMeta
                        image={
                            avatar ? (
                                <Avatar
                                    className={Style.avatar}
                                    image={avatar}
                                />
                            ) : (
                                <Avatar className={Style.avatar}>
                                    <span className={Style.text}>
                                        {getName(name)}
                                    </span>
                                </Avatar>
                            )
                        }
                        title={<div>{name || '--'}</div>}
                        description={
                            <div className={Style.description}>
                                <div className={Style.row}>
                                    <span className={Style.label}>
                                        昵称:&nbsp;
                                    </span>
                                    <span className={Style.value}>
                                        {nickname || '--'}
                                    </span>
                                </div>
                                <div className={Style.row}>
                                    <span className={Style.label}>
                                        手机号:&nbsp;
                                    </span>
                                    <span className={Style.value}>
                                        {mobile || '--'}
                                    </span>
                                </div>
                            </div>
                        }
                    ></ListItemMeta>
                </ListItem>
            </List>
            <List className={Style.relationList}>
                {relationArr?.map((item: any, index: number) => (
                    <ListItem key={index}>
                        <Checkbox
                            checked={item.checked}
                            label={t(entity + ':r.' + item.value)}
                            onChange={(checked) => {
                                this.onChangeValue(item.value, checked);
                            }}
                        />
                    </ListItem>
                ))}
            </List>
            <div style={{ flex: 1 }}></div>
            <Button
                size="large"
                theme="primary"
                block
                onClick={() => this.onConfirm()}
            >
                保存
            </Button>
        </div>
    );
}
