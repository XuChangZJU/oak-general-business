"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
var string_1 = require("oak-domain/lib/utils/string");
exports.default = OakComponent({
    entity: function () {
        var entity = this.props.entity;
        return "user".concat((0, string_1.firstLetterUpperCase)(entity));
    },
    projection: function () {
        var _a;
        var entity = this.props.entity;
        return _a = {
                id: 1,
                userId: 1,
                relation: 1
            },
            _a["".concat(entity, "Id")] = 1,
            _a;
    },
    properties: {
        entity: String,
        entityId: String,
    },
    isList: true,
    filters: [{
            filter: function (_a) {
                var _b;
                var props = _a.props;
                var entity = props.entity, entityId = props.entityId;
                return _b = {},
                    _b["".concat(entity, "Id")] = entityId,
                    _b;
            }
        }],
    formData: function (_a) {
        var data = _a.data;
        return {
            userRelations: data,
        };
    },
    methods: {
        onRelationChange: function (relation, checked) {
            var _a;
            var _b = this.props, entity = _b.entity, entityId = _b.entityId;
            var userRelations = this.state.userRelations;
            if (checked) {
                var userRelation = userRelations.find(function (ele) { return ele.relation === relation; });
                if (userRelation) {
                    (0, assert_1.default)(userRelation.$$deleteAt$$);
                    this.recoverItem(userRelation.id);
                }
                else {
                    this.addItem((_a = {
                            relation: relation
                        },
                        _a["".concat(entity, "Id")] = entityId,
                        _a));
                }
            }
            else {
                var userRelation = userRelations.find(function (ele) { return ele.relation === relation; });
                (0, assert_1.default)(userRelation);
                this.removeItem(userRelation.id);
            }
        },
        isChecked: function (relation) {
            var userRelations = this.state.userRelations;
            var userRelation = userRelations === null || userRelations === void 0 ? void 0 : userRelations.find(function (ele) { return ele.relation === relation && !ele.$$deleteAt$$; });
            return !!userRelation;
        }
    }
});
