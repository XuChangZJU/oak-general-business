
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { judgeRelation } from 'oak-domain/lib/store/relation';
import { EntityDict } from '../oak-app-domain';
import { EXPRESSION_PREFIX, StorageSchema } from 'oak-domain/lib/types';
import { assert } from 'oak-domain/lib/utils/assert';

/**
 * 这个修改是不可反复做的，会产生无穷递归
 * 因此只能产生新的filter结构
 * @param schema 
 * @param entity 
 * @param filter2 
 */
function rewriteFilter<ED extends EntityDict & BaseEntityDict, T extends keyof ED>(
    schema: StorageSchema<ED>, entity: T, filter: NonNullable<ED[T]['Selection']['filter']>) {

    const filter2 = {} as NonNullable<ED[T]['Selection']['filter']>;
    const addOrLogic = (orLogic: ED[T]['Selection']['filter'][]) => {
        if (!filter2.$or) {
            Object.assign(filter2, {
                $or: orLogic,
            });
        }
        else if (filter2.$and) {
            filter2.$and.push({
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

    for (const attr in filter) {
        if (attr.startsWith('#') || attr === '$text' || attr.toLowerCase().startsWith(EXPRESSION_PREFIX)) {
            filter2[attr] = filter[attr];
        }
        else if (['$and', '$or'].includes(attr)) {
            filter2[attr] = filter[attr].map(
                (ele: NonNullable<ED[T]['Selection']['filter']>) => rewriteFilter(schema, entity, ele)
            );
        }
        else if (attr === '$not') {
            Object.assign(filter2, {
                $not: rewriteFilter(schema, entity, filter[attr]!),
            });
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
                    addOrLogic([
                        {
                            [attr]: filter[attr],
                        }, {
                            [attr.slice(0, attr.length - 2)]: {
                                userState: 'merged',
                                refId: filter[attr],
                            }
                        }
                    ]);
                }
                else {
                    filter2[attr] = filter[attr];
                }
            }
            else if (attr === 'entity' && filter[attr] === 'user') {
                assert(filter.entityId);
                addOrLogic([
                    {
                        entityId: filter.entityId,
                    },
                    {
                        user: {
                            userState: 'merged',
                            refId: filter.entityId,
                        }
                    }
                ]);
            }
            else {
                const rel = judgeRelation(schema, entity, attr);
                if (rel === 2) {
                    const filter3 = rewriteFilter(schema, attr, filter[attr]);
                    if (attr === 'user') {
                        Object.assign(filter2, {
                            [attr]: {
                                $or: [
                                    filter3,
                                    {
                                        userState: 'merged',
                                        ref: filter3
                                    }
                                ]
                            }
                        });
                    }
                    else {
                        Object.assign(filter2, {
                            [attr]: filter3,
                        });
                    }
                }
                else if (typeof rel === 'string') {
                    const filter3 = rewriteFilter(schema, rel, filter[attr]);
                    if (rel === 'user') {
                        Object.assign(filter2, {
                            [attr]: {
                                $or: [
                                    filter3,
                                    {
                                        userState: 'merged',
                                        ref: filter3
                                    }
                                ]
                            }
                        });
                    }
                    else {
                        Object.assign(filter2, {
                            [attr]: filter3,
                        });
                    }
                }
                else if (rel instanceof Array) {
                    const [e] = rel;
                    assert(e !== 'user', '会出现一对多user的情况么');
                    Object.assign(filter2, {
                        [attr]: rewriteFilter(schema, e, filter[attr]),
                    })
                }
                else {
                    assert(rel === 1);
                    filter2[attr] = filter[attr];
                }
            }
        }
    }

    return filter2;
}

export function rewriteSelection<ED extends EntityDict & BaseEntityDict, T extends keyof ED>(
    schema: StorageSchema<ED>, 
    entity: T, 
    selection: ED[T]['Selection'] | ED[T]['Aggregation']
    ) {
    const { filter, data } = selection;
    if (filter && !filter['#oak-general-business--rewrited']) {
        const filter2 = rewriteFilter(schema, entity, filter as NonNullable<ED[T]['Selection']['filter']>);
        // 避免被重写多次
        Object.assign(filter2, {
            ['#oak-general-business--rewrited']: true,
        });
        selection.filter = filter2;
    }
    // RewriteSelection只在入口处调用一次，因此需要在这里处理一对多的projection
    const rewriteProjection = (e: keyof ED, d: ED[keyof ED]['Selection']['data'] | ED[keyof ED]['Aggregation']['data']) => {
        for (const attr in d) {
            const rel = judgeRelation(schema, e, attr);
            if (rel === 2) {
                rewriteProjection(attr, (d as ED[keyof ED]['Selection']['data'])[attr]);
            }
            else if (typeof rel === 'string') {
                rewriteProjection(rel, (d as ED[keyof ED]['Selection']['data'])[attr]);
            }
            else if (typeof rel === 'object' && rel instanceof Array) {
                rewriteSelection(schema, rel[0], (d as ED[keyof ED]['Selection']['data'])[attr]);
            }
        }
    }

    rewriteProjection(entity, data);
    return;
}


export function rewriteOperation<ED extends EntityDict & BaseEntityDict, T extends keyof ED>(schema: StorageSchema<ED>, entity: T, operation: ED[T]['Operation']) {
    const { filter } = operation;
    if (filter && !filter['#oak-general-business--rewrited']) {
        const filter2 = rewriteFilter(schema, entity, filter as NonNullable<ED[T]['Selection']['filter']>);
        // 避免被重写多次
        Object.assign(filter2, {
            ['#oak-general-business--rewrited']: true,
        });
        operation.filter = filter2;
    }
    return;
}