import { judgeRelation } from 'oak-domain/lib/store/relation';
import { EXPRESSION_PREFIX } from 'oak-domain/lib/types';
import { assert } from 'oak-domain/lib/utils/assert';
/**
 * 这个修改是不可反复做的，会产生无穷递归
 * 因此只能产生新的filter结构
 * @param schema
 * @param entity
 * @param filter2
 */
function rewriteFilter(schema, entity, filter) {
    const filter2 = {};
    const addOrLogic = (orLogic) => {
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
            filter2[attr] = filter[attr].map((ele) => rewriteFilter(schema, entity, ele));
        }
        else if (attr === '$not') {
            Object.assign(filter2, {
                $not: rewriteFilter(schema, entity, filter[attr]),
            });
        }
        else {
            /**
             * 这里要处理的就是把userId受到的约束扩展到存在merge的case
             * 大部分这类约束都来自relation类型的checker（auth）。来自auth的由系统创建的checker一定是{ userId: xxx }的形式，但用户手写的有可能是{ user: { id: xxxx }}的形式
             */
            if (attr.endsWith('Id') && attr !== 'entityId' && schema[entity].attributes[attr]?.type === 'ref') {
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
                    });
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
export function rewriteSelection(schema, entity, selection, context, option, isAggr) {
    const { filter, data } = selection;
    if (filter && !filter['#oak-general-business--rewrited']) {
        const filter2 = rewriteFilter(schema, entity, filter);
        // 避免被重写多次
        Object.assign(filter2, {
            ['#oak-general-business--rewrited']: true,
        });
        selection.filter = filter2;
    }
    // RewriteSelection只在入口处调用一次，因此需要在这里处理一对多的projection
    const rewriteProjection = (e, d) => {
        for (const attr in d) {
            const rel = judgeRelation(schema, e, attr);
            if (rel === 2) {
                rewriteProjection(attr, d[attr]);
            }
            else if (typeof rel === 'string') {
                rewriteProjection(rel, d[attr]);
            }
            else if (typeof rel === 'object' && rel instanceof Array) {
                rewriteSelection(schema, rel[0], d[attr], context, option, isAggr);
            }
        }
    };
    if (!isAggr) {
        rewriteProjection(entity, data);
    }
    return;
}
export function rewriteOperation(schema, entity, operation) {
    const { filter } = operation;
    if (filter && !filter['#oak-general-business--rewrited']) {
        const filter2 = rewriteFilter(schema, entity, filter);
        // 避免被重写多次
        Object.assign(filter2, {
            ['#oak-general-business--rewrited']: true,
        });
        operation.filter = filter2;
    }
    return;
}
