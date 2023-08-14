import { OakInputIllegalException } from 'oak-domain/lib/types';
import { firstLetterUpperCase } from "oak-domain/lib/utils/string";
import { EntityDict } from '../../../../general-app-domain';
import { encryptPasswordSha1 } from '../../../../utils/password';

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
    },
    isList: false,
    formData({ data: user }) {
        const { name, nickname, password, extraFile$entity, $$createAt$$ } = user || {};
        const avatar = this.features.extraFile.getUrl(
            extraFile$entity && extraFile$entity[0]
        );
        return {
            avatar,
            password,
            name,
            nickname,
            isNew: $$createAt$$ === 1,
        };
    },
    properties: {
        entity: '' as keyof EntityDict,
        entityId: '',
        relations: [] as string[],
        mobile: '',
        isComponent: false,
        setPasswordConfirm: (value: boolean) => { }
    },
    data: {
        userRelationRelativePath: '',
    },
    lifetimes: {
        async ready() {
            const { entity } = this.props;
            this.setState({
                userRelationRelativePath: `user${firstLetterUpperCase(
                    entity!
                )}$user`,
            });
        },
    },
    methods: {
        async onConfirm() {
            await this.execute();
            this.navigateBack();
        },
    },
});
