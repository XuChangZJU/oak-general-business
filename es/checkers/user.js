import { judgeRelation } from "oak-domain/lib/store/relation";
import { OakInputIllegalException, OakUserUnpermittedException } from "oak-domain/lib/types";
const checkers = [
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
            isRoot: false,
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
            const { data } = operation;
            for (const attr in data) {
                const rel = judgeRelation(context.getSchema(), 'user', attr);
                if (rel === 1) {
                    return {
                        id: userId,
                    };
                }
            }
            return undefined;
        },
        errMsg: '您不能更新他人信息',
    }
];
export default checkers;
