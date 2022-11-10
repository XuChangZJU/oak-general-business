import * as React from 'react';
import { Button, List, Tag, Avatar } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Style from './mobile.module.less';
import { getName } from '../../../utils/randomUser';
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

export default function render(props: WebComponentProps<EntityDict, 'user', true, {
    userArr: Array<EntityDict['user']['OpSchema'] & { avatar: string; mobile: string }>;
    stateColor: Record<string, string>;
}, {
    onCellClicked: (id: string) => Promise<void>;
    goNewUser: () => Promise<void>;
}>) {
    const { stateColor, userArr } = props.data;
    const { onCellClicked, t, goNewUser } = props.methods;
    return (
        <div className={Style.container}>
            <List split={true}>
                {userArr?.map((ele, index) => {
                    return (
                        <List.Item
                            key={index}
                            onClick={() => onCellClicked(ele.id)}
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
                                                {getName(ele.name!)}
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
                                        <Tag color={stateColor[ele.userState!]}>
                                            {ele.userState
                                                ? t(
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
                    onClick={() => {
                        goNewUser();
                    }}
                    icon={<PlusOutlined />}
                ></Button>
            </div>
        </div>
    );
}
