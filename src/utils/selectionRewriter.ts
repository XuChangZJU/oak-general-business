
import { EntityDict } from 'oak-domain/lib/types/Entity';
import { judgeRelation } from 'oak-domain/lib/store/relation';
import { EntityDict as BaseEntityDict } from '../general-app-domain';
import { EXPRESSION_PREFIX, StorageSchema } from 'oak-domain/lib/types';
import assert from 'assert';

function rewriteFilter<ED extends EntityDict & BaseEntityDict, T extends keyof ED>(
    schema: StorageSchema<ED>, entity: T, filter: NonNullable<ED[T]['Selection']['filter']>) {

    const addOrLogic = (orLogic: ED[T]['Selection']['filter'][]) => {
        if (!filter.$or) {
            Object.assign(filter, {
                $or: orLogic,
            });
        }
        else if (filter.$and) {
            filter.$and.push({
                $or: orLogic,
            });
        }
        else {
            Object.assign({
                $and: [
                    {
                        $or: orLogic,
                    }
                ]
            });
        }
    };

    const userIdPointers: string[] = [];
    const userPointers: string[] = [];

    for (const attr in filter) {
        if (attr === '#id' || attr === '$text' || attr.toLowerCase().startsWith(EXPRESSION_PREFIX)) {
        }
        else if (['$and', '$or'].includes(attr)) {
            for (const node of filter[attr]!) {
                rewriteFilter(schema, entity, node);
            }
        }
        else if (attr === '$not') {
            rewriteFilter(schema, entity, filter[attr]!);
        }
        else {
            /**
             * 这里要处理的就是把userId受到的约束扩展到存在merge的case
             * 大部分这类约束都来自relation类型的checker（auth）。来自auth的由系统创建的checker一定是{ userId: xxx }的形式，但用户手写的有可能是{ user: { id: xxxx }}的形式
             */
            if (attr.endsWith('Id') && attr !== 'entityId' && schema[entity].attributes[attr as string]?.type === 'ref') {
                // 只要是指向user的ref都要处理
                const rel = judgeRelation(schema, entity, attr.slice(0, attr.length - 2));
                if (rel === 'user') {
                    userIdPointers.push(attr);
                }
            }
            else if (attr === 'entity' && filter[attr] === 'user') {
                assert(filter.entityId);
                userIdPointers.push('entityId');                
            }
            else {
                const rel = judgeRelation(schema, entity, attr);
                if (rel === 2) {
                    rewriteFilter(schema, attr, filter[attr]);
                    if (attr === 'user') {
                        userPointers.push(attr);
                    }
                }
                else if (typeof rel === 'string') {
                    rewriteFilter(schema, rel, filter[attr]);
                    if (rel === 'user') {
                        userPointers.push(attr);
                    }
                }
                else if (rel instanceof Array) {
                    const [e] = rel;
                    assert(e !== 'user', '会出现一对多user的情况么');
                    rewriteFilter(schema, e, filter[attr]);
                }
            }
        }
    }

    userIdPointers.forEach(
        (attr) => {
            if (attr === 'entityId') {
                const f = filter.entityId;
                delete filter.entityId;
                addOrLogic([
                    {
                        entityId: f,
                    }, {
                        user: {
                            userState: 'merged',
                            refId: f,
                        }
                    }
                ]);
            }
            else {
                const f = filter[attr];
                delete filter[attr];
                addOrLogic([
                    {
                        [attr]: f,
                    }, {
                        [attr.slice(0, attr.length - 2)]: {
                            userState: 'merged',
                            refId: f,
                        }
                    }
                ]);
            }
        }
    );

    userPointers.forEach(
        (attr) => {
            const f = filter[attr];
            delete filter[attr];
            Object.assign(filter, {
                [attr]: {
                    $or: [
                        f,
                        {
                            userState: 'merged',
                            ref: f
                        }
                    ]
                }
            });
        }
    )

    // { user: { id: xxxxx }} 的查询大都来自cascade查询，只能先不处理
    if (entity === 'user' && filter!.id) {
        // throw new Error('不应该出现{user: {id:}}格式的查询');
    }
}

export function rewriteSelection<ED extends EntityDict & BaseEntityDict, T extends keyof ED>(schema: StorageSchema<ED>, entity: T, selection: ED[T]['Selection']) {
    const { filter } = selection;
    if (filter && !filter['#oak-general-business--rewrited']) {
        rewriteFilter(schema, entity, filter as NonNullable<ED[T]['Selection']['filter']>);
        // 避免被重写多次
        Object.assign(filter, {
            ['#oak-general-business--rewrited']: true,
        });
    }
    return;
}


export function rewriteOperation<ED extends EntityDict & BaseEntityDict, T extends keyof ED>(schema: StorageSchema<ED>, entity: T, operation: ED[T]['Operation']) {
    const { filter } = operation;
    if (filter && !filter['#oak-general-business--rewrited']) {
        rewriteFilter(schema, entity, filter as NonNullable<ED[T]['Selection']['filter']>);
        // 避免被重写多次
        Object.assign(filter, {
            ['#oak-general-business--rewrited']: true,
        });
    }
    return;
}