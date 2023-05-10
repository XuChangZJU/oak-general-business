"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
});
