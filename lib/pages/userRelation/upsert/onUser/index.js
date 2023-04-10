"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var string_1 = require("oak-domain/lib/utils/string");
exports.default = OakComponent({
    entity: 'user',
    projection: {
        id: 1,
        name: 1,
        password: 1,
        nickname: 1,
        extraFile$entity: {
            $entity: 'extraFile',
            data: {
                id: 1,
                tag1: 1,
                origin: 1,
                bucket: 1,
                objectId: 1,
                filename: 1,
                extra1: 1,
                type: 1,
                entity: 1,
                extension: 1,
            },
            filter: {
                tag1: 'avatar',
            },
        },
    },
    isList: false,
    formData: function (_a) {
        var user = _a.data;
        var _b = user || {}, name = _b.name, nickname = _b.nickname, password = _b.password, extraFile$entity = _b.extraFile$entity, $$createAt$$ = _b.$$createAt$$;
        var avatar = this.features.extraFile.getUrl(extraFile$entity && extraFile$entity[0]);
        return {
            avatar: avatar,
            password: password,
            name: name,
            nickname: nickname,
            isNew: $$createAt$$ === 1,
        };
    },
    properties: {
        entity: '',
        entityId: '',
        relations: [],
        mobile: '',
        isComponent: false,
    },
    data: {
        userRelationRelativePath: '',
    },
    lifetimes: {
        ready: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var entity;
                return tslib_1.__generator(this, function (_a) {
                    entity = this.props.entity;
                    this.setState({
                        userRelationRelativePath: "user".concat((0, string_1.firstLetterUpperCase)(entity), "$user"),
                    });
                    return [2 /*return*/];
                });
            });
        },
    },
    methods: {
        onConfirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            this.navigateBack();
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
