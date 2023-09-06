import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { Tabs } from 'antd';
import Style from './web.module.less';
import ByMobile from './byMobile/index';
import ByUserEntityGrant from './byUserEntityGrant';
import { assert } from 'oak-domain/lib/utils/assert';
export default function Render(props) {
    const { entity, entityId, relations, grantByUserEntityGrant, grantByEmail, grantByMobile, grantMethodCount, oakFullpath, redirectToAfterConfirm, qrCodeType, } = props.data;
    let SubPart = _jsx(_Fragment, {});
    if (grantMethodCount === 0) {
        SubPart = (_jsx("div", { className: Style.container, children: "\u5E94\u7528\u6CA1\u6709\u5B9A\u4E49\u6388\u6743\u65B9\u5F0F\uFF0C\u8BF7\u7BA1\u7406\u5458\u5728\u63A7\u5236\u53F0\u4E2D\u5B9A\u4E49" }));
    }
    else if (grantMethodCount === 1) {
        if (grantByEmail) {
            SubPart = _jsx("div", { className: Style.container, children: "\u5C1A\u672A\u5B9E\u73B0" });
        }
        else if (grantByMobile) {
            SubPart = (_jsx(ByMobile, { entity: entity, entityId: entityId, relations: relations, oakPath: oakFullpath ? `$userRelation-upsert-by-mobile` : undefined, oakAutoUnmount: true }));
        }
        else {
            assert(grantByUserEntityGrant === true);
            SubPart = (_jsx(ByUserEntityGrant, { qrCodeType: qrCodeType, entity: entity, entityId: entityId, relations: relations, oakPath: oakFullpath
                    ? `$userRelation-upsert-by-userEntityGrant`
                    : undefined, oakAutoUnmount: true, redirectToAfterConfirm: redirectToAfterConfirm }));
        }
    }
    else {
        const items = [
            {
                label: 'Email',
                key: 'item-1',
                children: _jsx("div", { className: Style.container, children: "\u5C1A\u672A\u5B9E\u73B0" }),
            },
            {
                label: '手机号',
                key: 'item-2',
                children: (_jsx(ByMobile, { entity: entity, entityId: entityId, relations: relations, oakPath: oakFullpath ? `$userRelation-upsert-by-mobile` : undefined, oakAutoUnmount: true })),
            },
            {
                label: '二维码',
                key: 'item-3',
                children: (_jsx(ByUserEntityGrant, { entity: entity, entityId: entityId, relations: relations, qrCodeType: qrCodeType, oakPath: oakFullpath
                        ? `$userRelation-upsert-by-userEntityGrant`
                        : undefined, oakAutoUnmount: true, redirectToAfterConfirm: redirectToAfterConfirm })),
            },
        ];
        const items2 = [];
        if (grantByEmail) {
            items2.push(items[0]);
        }
        if (grantByMobile) {
            items2.push(items[1]);
        }
        if (grantByUserEntityGrant) {
            items2.push(items[2]);
        }
        SubPart = _jsx(Tabs, { items: items2 });
    }
    return (_jsx(_Fragment, { children: SubPart }));
}
