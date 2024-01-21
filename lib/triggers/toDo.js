"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeToDo = exports.createToDo = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("oak-domain/lib/utils/lodash");
const RelationAuth_1 = require("oak-domain/lib/store/RelationAuth");
const filter_1 = require("oak-domain/lib/store/filter");
const oak_domain_1 = require("oak-domain");
const assert_1 = tslib_1.__importDefault(require("assert"));
/**
 * 创建todo例程，为entity对象上满足filter条件的，需要以action进行处理的行创建一个todo
 * @param entity
 * @param filter
 * @param action
 * @param userIds
 */
async function createToDo(entity, filter, action, context, data, userIds) {
    (0, assert_1.default)(filter);
    const count = await context.count('toDo', {
        filter: {
            targetEntity: entity,
            targetFilter: (0, filter_1.translateFilterToObjectPredicate)(filter),
            action,
            iState: 'active',
            entity: data.entity,
            entityId: data.entityId,
        },
        count: 1
    }, {});
    // 已有则无需创建
    if (count > 0) {
        return 0;
    }
    let userIds2 = userIds;
    if (!userIds2) {
        // 为对此对象有此action的用户创建userRelation
        const { userRelations, userEntities } = await (0, RelationAuth_1.getUserRelationsByActions)({
            entity,
            filter,
            actions: [action],
        }, context);
        userIds2 = (0, lodash_1.uniq)(userRelations.map(ele => ele.userId).concat(userEntities.map(ele => ele.userId)));
    }
    const [relation] = await context.select('relation', {
        data: {
            id: 1,
        },
        filter: {
            entity: 'toDo',
            name: 'collaborator',
        }
    }, { dontCollect: true });
    await context.operate('toDo', {
        id: await (0, oak_domain_1.generateNewIdAsync)(),
        action: 'create',
        data: {
            id: await (0, oak_domain_1.generateNewIdAsync)(),
            targetEntity: entity,
            targetFilter: filter,
            action,
            iState: 'active',
            ...data,
            userRelation$entity: await Promise.all(userIds2.map(async (userId) => ({
                id: await (0, oak_domain_1.generateNewIdAsync)(),
                action: 'create',
                data: {
                    id: await (0, oak_domain_1.generateNewIdAsync)(),
                    userId,
                    relationId: relation.id,
                }
            })))
        },
    }, { dontCollect: true });
    return 1;
}
exports.createToDo = createToDo;
/**
 * 完成todo例程，当在entity对象上进行action操作时（操作条件是filter），将对应的todo完成
 * 必须在entity的action的后trigger中调用
 * @param entity
 * @param filter    传入的filter限定查询todo的范围，在todo中的targetFilter查找相同限制下的行，和创建toDo要保持一致（但要考虑action可能造成的数据变化）
 * @param action
 * @param context
 */
async function completeToDo(entity, filter, action, context) {
    const toDos = await context.select('toDo', {
        data: {
            id: 1,
            iState: 1,
            targetEntity: 1,
            targetFilter: 1,
            action: 1,
        },
        filter: {
            targetEntity: entity,
            targetFilter: filter,
            action,
            iState: 'active',
        }
    }, {});
    (0, assert_1.default)(toDos.length > 0, `对${entity}相关的todo进行完成操作时，找不到对应的数据。filter是${JSON.stringify(filter)}`);
    let completed = 0;
    for (const toDo of toDos) {
        const { id, targetEntity, targetFilter, action } = toDo;
        const count = await context.count(targetEntity, {
            filter: targetFilter,
            count: 1,
        }, {});
        if (count === 0) {
            await context.operate('toDo', {
                id: await (0, oak_domain_1.generateNewIdAsync)(),
                action: 'complete',
                data: {},
                filter: {
                    id: id,
                }
            }, {});
            completed++;
        }
    }
    return completed;
}
exports.completeToDo = completeToDo;
