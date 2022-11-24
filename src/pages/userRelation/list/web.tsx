import React from 'react';

import { List, Avatar, Tag, Button, Space } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import Style from './mobile.module.less';
import { getName } from '../../../utils/randomUser';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';


export default function Render(props: WebComponentProps<EntityDict, 'user', true, {
    users: any[];
    searchValue?: string;
    pagination: {
        pageSize: number;
        total: number;
        currentPage: number;
    },
    entity: string;
    entityId: string;
}, {
    goUpsert: () => void;
    goDetail: (id: string) => void;
    confirmDelete: (id: string) => Promise<void>;
}>) {
    const { t, goUpsert, goDetail } = props.methods;
    const { entity, users } = props.data;
    return (
        <div className={Style.container}>
            <List>
                {users?.map((ele: any, index: number) => {
                    return (
                        <div onClick={(e) => goDetail(ele.id)} key={index}>
                            <List.Item>
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
                                            <Space>
                                                {ele.relations?.map(
                                                    (
                                                        relation: string,
                                                        index: number
                                                    ) => (
                                                        <Tag
                                                            key={index}
                                                            color="processing"
                                                        >
                                                            {t(
                                                                `${entity}:r.${relation}`
                                                            )}
                                                        </Tag>
                                                    )
                                                )}
                                            </Space>
                                        </div>
                                    }
                                ></List.Item.Meta>
                            </List.Item>
                        </div>
                    );
                })}
            </List>

            <div className={Style.fab}>
                <Button
                    size="large"
                    shape="circle"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        goUpsert();
                    }}
                />
            </div>
        </div>
    );
}
