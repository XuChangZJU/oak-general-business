import React from 'react';
import { Tabs } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';
import ByMobile from './byMobile/index';
import ByUserEntityGrant from './byUserEntityGrant';
import assert from 'assert';

export default function render(this: any) {
    const { entity, entityId, relations } = this.props;
    const { grantByUserEntityGrant, grantByEmail, grantByMobile, grantMethodCount } = this.state;
    let SubPart: JSX.Element = (<></>);
    if (grantMethodCount === 0) {
        SubPart = (
            <div className={Style.container}>
                应用没有定义授权方式，请管理员在控制台中定义
            </div>
        );
    }
    else if (grantMethodCount === 1) {
        if (grantByEmail) {
            SubPart = (
                <div className={Style.container}>
                    尚未实现
                </div>
            );
        }
        else if (grantByMobile) {
            SubPart = (
                <ByMobile
                    entity={entity}
                    entityId={entityId}
                    relations={relations}
                    oakPath="$userRelationUpsert/upsert-byMobile"
                    oakAutoUnmount={true}
                />
            );
        }
        else {
            assert(grantByUserEntityGrant === true);
            SubPart = (
                <ByUserEntityGrant
                    entity={entity}
                    entityId={entityId}
                    relations={relations}
                    oakPath="$userRelationUpsert/upsert-byUserEntityGrant"
                    oakAutoUnmount={true}
                />
            );
        }
    }
    else {
        const items = [
            {
                label: 'Email', key: 'item-1', children: (
                    <div className={Style.container}>
                        尚未实现
                    </div>
                )
            },
            {
                label: '手机号', key: 'item-2', children: (
                    <ByMobile
                        entity={entity}
                        entityId={entityId}
                        relations={relations}
                        oakPath="$userRelationUpsert/upsert-byMobile"
                        oakAutoUnmount={true}
                    />
                )
            },
            {
                label: '二维码', key: 'item-3', children: (
                    <ByUserEntityGrant
                        entity={entity}
                        entityId={entityId}
                        relations={relations}
                        oakPath="$userRelationUpsert/upsert-byUserEntityGrant"
                        oakAutoUnmount={true}
                    />
                )
            },
        ];
        const items2: typeof items = [];
        if (grantByEmail) {
            items2.push(items[0]);
        }
        if (grantByMobile) {
            items2.push(items[1]);
        }
        if (grantByUserEntityGrant) {
            items2.push(items[2]);
        }
        SubPart = (
            <Tabs items={items2} /> 
        );
    }
    return (
        <PageHeader showBack={true} title="添加权限">
            {SubPart}
        </PageHeader>
    );
}
