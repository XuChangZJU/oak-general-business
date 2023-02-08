import { Routine } from 'oak-domain/lib/types/Timer';
import { registerOperationRewriter, registerSelectionRewriter } from 'oak-domain/lib/store/selection';
import { EntityDict } from 'oak-domain/lib/types/Entity';
import { judgeRelation } from 'oak-domain/lib/store/relation';
import { EntityDict as BaseEntityDict } from '../general-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { EXPRESSION_PREFIX, StorageSchema } from 'oak-domain/lib/types';
import assert from 'assert';

function rewriteFilter<ED extends EntityDict & BaseEntityDict, T extends keyof ED>(
    schema: StorageSchema<ED>, entity: T, filter: ED[T]['Selection']['filter']) {
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
            if (attr.endsWith('Id') && attr !== 'entityId') {
                // 只要是指向user的ref都要处理
                const rel = judgeRelation(schema, entity, attr.slice(0, attr.length - 2));
                if (rel === 'user') {
                    const f = filter[attr];
                    delete filter[attr];
                    if (filter.$or) {
                        filter.$or.push({
                            [attr]: f,
                        }, {
                            [attr.slice(0, attr.length - 2)]: {
                                userState: 'merged',
                                refId: f,
                            }
                        });
                    }
                    else {
                        filter.$or = [
                            {
                                [attr]: f,
                            },
                            {
                                [attr.slice(0, attr.length - 2)]: {
                                    userState: 'merged',
                                    refId: f,
                                }
                            }
                        ];
                    }
                }
            }
            else if (attr === 'entity' && filter[attr] === 'user') {
                assert(filter.entityId);
                const f = filter.entityId;
                delete filter.entityId;
                if (filter.$or) {
                    filter.$or.push({
                        entityId: f,
                    }, {
                        user: {
                            userState: 'merged',
                            refId: f,
                        }
                    });
                }
                else {
                    filter.$or = [
                        {
                            entityId: f,
                        },
                        {
                            user: {
                                userState: 'merged',
                                refId: f,
                            }
                        }
                    ];
                }
            }
            else {
                const rel = judgeRelation(schema, entity, attr);
                if (rel === 2) {
                    if (attr === 'user' && filter[attr].id) {
                        throw new Error('不应该出现{user: {id:}}格式的查询');
                    }
                    rewriteFilter(schema, attr, filter[attr]);
                }
                else if (typeof rel === 'string') {
                    if (rel === 'user' && filter[attr].id) {
                        throw new Error('不应该出现{user: {id:}}格式的查询');
                    }
                    rewriteFilter(schema, rel, filter[attr]);
                }
                else if (rel instanceof Array) {
                    const [e] = rel;
                    const { filter: f } = filter[attr];
                    if (f) {
                        rewriteFilter(schema, e, f);
                    }
                }
                else {
                    //  还要处理子查询
                    const { $in, $nin } = filter[attr];
                    if ($in && !($in instanceof Array)) {
                        const { entity: e, filter: f } = $in;
                        rewriteFilter(schema, e, f);
                    }
                    if ($nin && !($nin instanceof Array)) {
                        const { entity: e, filter: f } = $nin;
                        rewriteFilter(schema, e, f);
                    }
                }
            }
        }
    }

    // { user: { id: xxxxx }} 的查询大都来自cascade查询，只能先不处理
    if (entity === 'user' && filter!.id) {
        // throw new Error('不应该出现{user: {id:}}格式的查询');
    }
}

function rewriteSelection<ED extends EntityDict & BaseEntityDict, T extends keyof ED>(schema: StorageSchema<ED>, entity: T, selection: ED[T]['Selection']) {
    const { filter } = selection;
    if (filter) {
        rewriteFilter(schema, entity, filter);
    }
    return;
}


function rewriteOperation<ED extends EntityDict & BaseEntityDict, T extends keyof ED>(schema: StorageSchema<ED>, entity: T, operation: ED[T]['Operation']) {
    const { filter } = operation;
    if (filter) {
        rewriteFilter(schema, entity, filter);
    }
    return;
}

const startRoutines: Array<Routine<EntityDict & BaseEntityDict, BackendRuntimeContext<EntityDict & BaseEntityDict>>> = [
    {
        name: '注入对合并的user的selection的改写',
        fn: async (context) => {
            registerSelectionRewriter<EntityDict & BaseEntityDict>(rewriteSelection);
            registerOperationRewriter<EntityDict & BaseEntityDict>(rewriteOperation);
            return '注入成功';
        },
    }
];

export default startRoutines;