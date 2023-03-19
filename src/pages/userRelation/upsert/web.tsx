import React from 'react';
import { Tabs } from 'antd';
import Style from './mobile.module.less';
import ByMobile from './byMobile/index';
import ByUserEntityGrant from './byUserEntityGrant';
import assert from 'assert';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import { QrCodeType } from '../../../types/Config';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'user',
        false,
        {
            grantByUserEntityGrant: boolean;
            grantByEmail: boolean;
            grantByMobile: boolean;
            grantMethodCount: number;
            redirectToAfterConfirm: object;
            entity: string;
            entityId: string;
            relations: string[];
            qrCodeType?: QrCodeType;
        },
        {}
    >
) {
    const {
        entity,
        entityId,
        relations,
        grantByUserEntityGrant,
        grantByEmail,
        grantByMobile,
        grantMethodCount,
        oakFullpath,
        redirectToAfterConfirm,
        qrCodeType,
    } = props.data;
    let SubPart: JSX.Element = <></>;
    if (grantMethodCount === 0) {
        SubPart = (
            <div className={Style.container}>
                应用没有定义授权方式，请管理员在控制台中定义
            </div>
        );
    } else if (grantMethodCount === 1) {
        if (grantByEmail) {
            SubPart = <div className={Style.container}>尚未实现</div>;
        } else if (grantByMobile) {
            SubPart = (
                <ByMobile
                    entity={entity}
                    entityId={entityId}
                    relations={relations}
                    oakPath={oakFullpath ? `${oakFullpath}.mobile` : undefined}
                    oakAutoUnmount={true}
                />
            );
        } else {
            assert(grantByUserEntityGrant === true);
            SubPart = (
                <ByUserEntityGrant
                    qrCodeType={qrCodeType}
                    entity={entity}
                    entityId={entityId}
                    relations={relations}
                    oakPath={
                        oakFullpath
                            ? `${oakFullpath}.userEntityGrant`
                            : undefined
                    }
                    oakAutoUnmount={true}
                    redirectToAfterConfirm={redirectToAfterConfirm}
                />
            );
        }
    } else {
        const items = [
            {
                label: 'Email',
                key: 'item-1',
                children: <div className={Style.container}>尚未实现</div>,
            },
            {
                label: '手机号',
                key: 'item-2',
                children: (
                    <ByMobile
                        entity={entity}
                        entityId={entityId}
                        relations={relations}
                        oakPath={
                            oakFullpath ? `${oakFullpath}.mobile` : undefined
                        }
                        oakAutoUnmount={true}
                    />
                ),
            },
            {
                label: '二维码',
                key: 'item-3',
                children: (
                    <ByUserEntityGrant
                        entity={entity}
                        entityId={entityId}
                        relations={relations}
                        qrCodeType={qrCodeType}
                        oakPath={
                            oakFullpath
                                ? `${oakFullpath}.userEntityGrant`
                                : undefined
                        }
                        oakAutoUnmount={true}
                        redirectToAfterConfirm={redirectToAfterConfirm}
                    />
                ),
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
        SubPart = <Tabs items={items2} />;
    }
    return SubPart;
}
