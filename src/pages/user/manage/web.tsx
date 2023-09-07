import React from 'react';
import { Button, List, Tag, Avatar, FloatingBubble } from 'antd-mobile';
import { PlusOutlined } from '@ant-design/icons';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import Style from './mobile.module.less';

export default function render(
    props: WebComponentProps<
        EntityDict,
        'user',
        true,
        {
            userArr: Array<
                EntityDict['user']['OpSchema'] & {
                    avatar: string;
                    mobile: string;
                }
            >;
            stateColor: Record<string, string>;
            isRoot: boolean;
        },
        {
            onCellClicked: (id: string) => Promise<void>;
            goNewUser: () => Promise<void>;
        }
    >
) {
    const { stateColor, userArr, isRoot } = props.data;
    const { onCellClicked, t, goNewUser } = props.methods;
    return (
        <div className={Style.container}>
            <List>
                {userArr?.map((ele, index) => {
                    return (
                        <List.Item
                            key={index}
                            onClick={() => onCellClicked(ele.id)}
                            prefix={
                                <Avatar
                                    className={Style.avatar}
                                    src={ele.avatar}
                                />
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
                        ></List.Item>
                    );
                })}
            </List>

            {isRoot && (
                <FloatingBubble
                    axis="x"
                    magnetic="x"
                    style={{
                        '--initial-position-bottom': '24px',
                        '--initial-position-right': '24px',
                        '--edge-distance': '24px',
                    }}
                    onClick={() => {
                        goNewUser();
                    }}
                >
                    <PlusOutlined />
                </FloatingBubble>
            )}
        </div>
    );
}
