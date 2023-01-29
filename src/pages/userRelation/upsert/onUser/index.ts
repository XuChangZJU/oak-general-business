import { OakInputIllegalException } from 'oak-domain/lib/types';
import { firstLetterUpperCase } from "oak-domain/lib/utils/string";
import { EntityDict as BaseEntityDict } from '../../../../general-app-domain';

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
        const { name, nickname, password, extraFile$entity } = user || {};
        const avatar = this.features.extraFile.getUrl(
            extraFile$entity && extraFile$entity[0]
        );
        return {
            avatar,
            password,
            name,
            nickname,
        };
    },
    properties: {
        oakId: String,
        entity: String,
        entityId: String,
        relations: Array,
        mobile: String,
        isComponent: {
            type: Boolean,
            value: false
        },
    },
    data: {
        userRelationRelativePath: '',
    },
    lifetimes: {
        async ready() {
            const { entity, oakId } = this.props;
            if (!oakId) {
                const entityStr = firstLetterUpperCase(entity!);
                this.update(
                    {
                        password: '12345678',
                    },
                    undefined,
                    async () => {
                        const operations = this.getOperations();
                        const [{ operation }] = operations! as {
                            operation: BaseEntityDict['user']['CreateSingle'];
                        }[];
                        if (!operation.data.name) {
                            throw new OakInputIllegalException(
                                'user',
                                ['name'],
                                this.t('placeholder.name')
                            );
                        }
                        if (
                            (operation.data as any)[`user${entityStr}$user`]
                                ?.length > 0
                        ) {
                            return;
                        }
                        throw new OakInputIllegalException(
                            'user',
                            [`user${entityStr}$user`],
                            this.t('placeholder.relation')
                        );
                    }
                );
            }
            else {
                this.update({});
            }
            this.setState({
                userRelationRelativePath: `user${firstLetterUpperCase(
                    entity
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
