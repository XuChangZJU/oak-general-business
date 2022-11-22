import { OakInputIllegalException, Checker, OakUserUnpermittedException } from "oak-domain/lib/types";
import { ROOT_ROLE_ID } from "../constants";
import { EntityDict } from '../general-app-domain';
import { RuntimeCxt } from "./RuntimeCxt";

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
        action: ['play', 'remove', 'disable', 'enable'],
        entity: 'user',
        relationFilter: (userId) => {
            // 只有root才能进行操作
            throw new OakUserUnpermittedException();
        },
        errMsg: '越权操作',
    },    
    {
        type: 'data',
        action: 'play',
        entity: 'user',
        checker: (data) => {
            // 不记得什么意思了
            /* const token = context.getToken();
            const { userId } = token!;
            if (userId === operation.filter!.id) {
                throw new OakRowInconsistencyException();
            } */
        },
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
    }
];

export default checkers;