import { OakInputIllegalException, Checker, OakUserUnpermittedException } from "oak-domain/lib/types";
import { ROOT_ROLE_ID } from "../constants";
import { EntityDict } from '../general-app-domain';
import { RuntimeCxt } from "../types/RuntimeCxt";

const checkers: Checker<EntityDict, 'user', RuntimeCxt> [] = [
    {
        type: 'row',
        action: 'remove',
        entity: 'user',
        filter: {
            userState: 'shadow',
        }
    },
    {
        type: 'relation',
        action: ['remove', 'disable', 'enable'],
        entity: 'user',
        relationFilter: () => {
            // 只有root才能进行操作
            throw new OakUserUnpermittedException();
        },
        errMsg: '越权操作',
    },
    {
        type: 'data',
        action: 'grant',
        entity: 'user',
        checker: (data) => {
            if (Object.keys(data).filter(ele => !ele.includes('$')).length > 0) {
                throw new OakInputIllegalException('user', Object.keys(data), '授权不允许传入其它属性');
            }
        }
    }, 
    {
        type: 'row',
        action: 'disable',
        entity: 'user',
        filter: {
            id: {
                $nin: {
                    entity: 'userRole',
                    data: {
                        userId: 1,
                    },
                    filter: {
                        roleId: ROOT_ROLE_ID,
                    },
                },
            }
        },
        errMsg: '不能禁用root用户',
    },
    // {
    //     type: 'row',
    //     action: 'select',
    //     entity: 'user',
    //     filter: (operation, context) => {
    //         const systemId = context.getSystemId();
    //         // todo 查询用户 先不加systemId
    //         if (systemId) {
    //             return {
    //                 id: {
    //                     $in: {
    //                         entity: 'userSystem',
    //                         data: {
    //                             userId: 1,
    //                         },
    //                         filter: {
    //                             systemId,
    //                         },
    //                     },
    //                 },
    //             };
    //         }
    //     },
    // },
    {
        entity: 'user',
        action: 'update',
        type: 'relation',
        relationFilter: (operation, context) => {
            const userId = context.getCurrentUserId();
            return {
                id: userId,
            };
        },
        errMsg: '您不能更新他人信息',
    }
];

export default checkers;