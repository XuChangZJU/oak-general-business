import * as React from 'react';
import { Button, List, Tag, Avatar } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Style from './mobile.module.less';
import { getName } from '../../../utils/randomUser'

export default function render(this: any) {
    const {
        event
    } = this.props;
    const { stateColor, userArr } = this.state;
    return (
        <div className={Style.container}>
            <List split={true}>
                {userArr?.map((ele: any, index: number) => {
                    return (
                        <List.Item
                            key={index}
                            onClick={() => this.onCellClicked(ele.id, event)}
                        >
                            <List.Item.Meta
                                avatar={
                                    ele.avatar ? (
                                        <Avatar
                                            className={Style.avatar}
                                            src={ele.avatar}
                                        />
                                    ) : (
                                        <Avatar className={Style.avatar}>
                                            <span className={Style.text}>
                                                {getName(ele.name)}
                                            </span>
                                        </Avatar>
                                    )
                                }
                                title={<div>{ele.name || '--'}</div>}
                                description={
                                    <div className={Style.description}>
                                        <div className={Style.row}>
                                            <span className={Style.label}>
                                                昵称:&nbsp;
                                            </span>
                                            <span className={Style.value}>
                                                {ele.nickname || '--'}
                                            </span>
                                        </div>
                                        <div className={Style.row}>
                                            <span className={Style.label}>
                                                手机号:&nbsp;
                                            </span>
                                            <span className={Style.value}>
                                                {ele.mobile || '--'}
                                            </span>
                                        </div>
                                        <Tag color={stateColor[ele.userState]}>
                                            {ele.userState
                                                ? this.t(
                                                      `user:v.userState.${ele.userState}`
                                                  )
                                                : '未知'}
                                        </Tag>
                                    </div>
                                }
                            />
                        </List.Item>
                    );
                })}
            </List>

            <div className={Style.fab}>
                <Button
                    size="large"
                    shape="circle"
                    onClick={(event) => {
                        this.goNewUser();
                    }}
                    icon={<PlusOutlined />}
                ></Button>
            </div>
        </div>
    );
}
