import React from 'react';
import { List, Avatar, Tag, Button, Input } from 'antd-mobile';
import { UserCircleOutline } from 'antd-mobile-icons';
import Style from './mobile.module.less';
export default function Render(props) {
    const { t, goUpsert, goUpdate, addNamedFilter, refresh, removeNamedFilterByName, } = props.methods;
    const { entity, users, searchValue } = props.data;
    return (<div className={Style.container}>
            <span className={Style.header}>
                <div style={{ flex: 1 }}>
                    <Input placeholder={t('search')} value={searchValue} onChange={(value) => {
            addNamedFilter({
                '#name': 'name',
                filter: {
                    $text: {
                        $search: value,
                    },
                },
            }, false);
        }} onEnterPress={() => refresh()} clearable onClear={() => removeNamedFilterByName('name')}/>
                </div>
                <Button size="small" color="primary" onClick={() => goUpsert()}>
                    {t('common::action.create')}
                </Button>
            </span>
            <List>
                {users?.map((ele, index) => {
            return (<List.Item prefix={ele.avatar ? (<Avatar className={Style.avatar} src={ele.avatar}/>) : (<UserCircleOutline className={Style.avatar}/>)} extra={ele.mobile || '--'} description={<div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                    }}>
                                    {ele.userRelation$user?.map((ele2, index2) => (<Tag key={index} fill="outline">
                                                {ele2.relation?.name
                            ? t(entity +
                                ':r.' +
                                ele2.relation
                                    .name)
                            : ele2.relation?.display}
                                            </Tag>))}
                                </div>} onClick={() => goUpdate(ele.id)}>
                            {ele.name || ele.nickname || '--'}
                        </List.Item>);
        })}
            </List>
        </div>);
}
