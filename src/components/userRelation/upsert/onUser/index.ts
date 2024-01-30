import { EntityDict } from '../../../../oak-app-domain';

export default OakComponent({
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
        userRelation$user: {
            $entity: 'userRelation',
            data: {
                id: 1,
                entity: 1,
                entityId: 1,
                userId: 1,
                relationId: 1,
                relation: {
                    id: 1,
                    name: 1,
                    display: 1,
                    relationAuth$destRelation: {
                        $entity: 'relationAuth',
                        data: {
                            id: 1,
                            sourceRelation: {
                                userRelation$relation: {
                                    $entity: 'userRelation',
                                    data: {
                                        id: 1,
                                        userId: 1,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    isList: false,
    formData({ data: user }) {
        const { name, nickname, password, extraFile$entity, $$createAt$$ } =
            user || {};
        const avatar = this.features.extraFile.getUrl(
            extraFile$entity && extraFile$entity[0]
        );
        return {
            avatar,
            password,
            name,
            nickname,
            // isNew: $$createAt$$ === 1,
        };
    },
    properties: {
        entity: '' as keyof EntityDict,
        entityId: '',
        relations: [] as EntityDict['relation']['OpSchema'][],
        mobile: '',
        setPasswordConfirm: (value: boolean) => { },
        passwordRequire: false,
        allowUpdateName: false,
        allowUpdateNickname: false,
        isNew: false,
    },
});
