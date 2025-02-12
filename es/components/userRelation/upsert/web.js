import React from 'react';
import { Tabs } from 'antd-mobile';
import Style from './mobile.module.less';
import ByMobile from './byMobile/index';
import ByUserEntityGrant from './byUserEntityGrant';
import { assert } from 'oak-domain/lib/utils/assert';
export default function Render(props) {
    const { entity, entityId, relations, grantByUserEntityGrant, grantByEmail, grantByMobile, grantMethodCount, oakFullpath, redirectToAfterConfirm, qrCodeType, claimUrl, rule, ruleOnRow, passwordRequire, allowUpdateName, allowUpdateNickname, } = props.data;
    let SubPart = <></>;
    if (grantMethodCount === 0) {
        SubPart = (<div className={Style.container}>
                应用没有定义授权方式，请管理员在控制台中定义
            </div>);
    }
    else if (grantMethodCount === 1) {
        if (grantByEmail) {
            SubPart = <div className={Style.container}>尚未实现</div>;
        }
        else if (grantByMobile) {
            SubPart = (<ByMobile passwordRequire={passwordRequire} entity={entity} entityId={entityId} relations={relations} oakPath="$userRelation-upsert-by-mobile" oakAutoUnmount={true}/>);
        }
        else {
            assert(grantByUserEntityGrant === true);
            SubPart = (<ByUserEntityGrant qrCodeType={qrCodeType} entity={entity} entityId={entityId} relations={relations} oakPath="$userRelation-upsert-by-userEntityGrant" oakAutoUnmount={true} redirectToAfterConfirm={redirectToAfterConfirm} claimUrl={claimUrl}/>);
        }
    }
    else {
        const items = [
            {
                label: 'Email',
                key: 'item-1',
                children: <div className={Style.container}>尚未实现</div>,
            },
            {
                label: '二维码',
                key: 'item-2',
                children: (<ByUserEntityGrant entity={entity} entityId={entityId} relations={relations} qrCodeType={qrCodeType} oakPath="$userRelation-upsert-by-userEntityGrant" oakAutoUnmount={true} redirectToAfterConfirm={redirectToAfterConfirm} claimUrl={claimUrl} rule={rule} ruleOnRow={ruleOnRow}/>),
            },
            {
                label: '手机号',
                key: 'item-3',
                children: (<ByMobile entity={entity} entityId={entityId} relations={relations} oakPath="$userRelation-upsert-by-mobile" oakAutoUnmount={true}/>),
            },
        ];
        const items2 = [];
        if (grantByEmail) {
            items2.push(items[0]);
        }
        if (grantByUserEntityGrant) {
            items2.push(items[1]);
        }
        if (grantByMobile) {
            items2.push(items[2]);
        }
        SubPart = (<Tabs className={Style.tab}>
                {items2.map((ele) => (<Tabs.Tab title={ele.label} key={ele.key}>
                        {ele.children}
                    </Tabs.Tab>))}
            </Tabs>);
    }
    return SubPart;
}
