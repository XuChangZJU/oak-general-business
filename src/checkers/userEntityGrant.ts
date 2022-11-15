import {
    Checker,
    CreateChecker,
    UpdateChecker,
    OakInputIllegalException,
    OakUserUnpermittedException,
} from 'oak-domain/lib/types';
import { EntityDict } from '../general-app-domain';
import { RuntimeContext } from '../context/RuntimeContext';
import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';

const checkers: Checker<
    EntityDict,
    'userEntityGrant',
    RuntimeContext<EntityDict>
>[] = [
    {
        type: 'data',
        action: 'create',
        entity: 'userEntityGrant',
        checker: async ({ operation }, context) => {
            const { data } = operation;
            if (data instanceof Array) {
                data.forEach((ele) => {
                    checkAttributesNotNull('userEntityGrant', ele, [
                        'type',
                        'entity',
                        'entityId',
                        'relation',
                    ]);
                    if (ele.type === 'grant') {
                        checkAttributesNotNull('userEntityGrant', ele, [
                            'number',
                        ]);
                        if (ele.number <= 0) {
                            throw new OakInputIllegalException(
                                'userEntityGrant',
                                ['number', '分享的权限数量必须大于0']
                            );
                        }
                    }
                    Object.assign(ele, {
                        confirmed: 0,
                    });
                });
            } else {
                checkAttributesNotNull('userEntityGrant', data, [
                    'type',
                    'entity',
                    'entityId',
                    'relation',
                ]);
                if (data.type === 'grant') {
                    checkAttributesNotNull('userEntityGrant', data, ['number']);
                    if (data.number <= 0) {
                        throw new OakInputIllegalException('userEntityGrant', [
                            'number',
                            '分享的权限数量必须大于0',
                        ]);
                    }
                }
                Object.assign(data, {
                    confirmed: 0,
                });
            }
            return 0;
        },
    } as CreateChecker<
        EntityDict,
        'userEntityGrant',
        RuntimeContext<EntityDict>
    >,
    {
        type: 'row',
        entity: 'userEntityGrant',
        action: ['disable'],
        checker: async (event, context, params) => {
            const {
                operation: { filter },
            } = event;
            const { rowStore } = context;
            const {
                result: [userEntityGrant],
            } = await rowStore.select(
                'userEntityGrant',
                {
                    data: {
                        id: 1,
                        expired: 1,
                    },
                    filter: {
                        id: filter?.id!,
                    },
                    indexFrom: 0,
                    count: 1,
                },
                context,
                params
            );
            if (!userEntityGrant?.expired) {
                return 1;
            } else {
                throw new OakUserUnpermittedException();
            }
        },
    } as UpdateChecker<
        EntityDict,
        'userEntityGrant',
        RuntimeContext<EntityDict>
    >,
];

export default checkers;
