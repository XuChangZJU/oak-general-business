import { OakInputIllegalException } from 'oak-domain/lib/types';
import { firstLetterUpperCase } from "oak-domain/lib/utils/string";
import { EntityDict as BaseEntityDict, EntityDict } from '../../../../general-app-domain';

export default OakComponent({
    entity: 'user',
    projection: {
        id: 1,
        name: 1,
        password: 1,
        nickname: 1,
    },
    isList: false,
    formData({ data: user }) {
        const { name, nickname, password } = user || {};
        return {
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
    },
    lifetimes: {
        async ready() {
            const { entity, oakId } = this.props;
            if (!oakId) {
                const entityStr = firstLetterUpperCase(entity!);
                this.update({
                    password: '12345678',
                }, undefined, async () => {
                    const operations = this.getOperations();
                    const [ {operation} ] = operations! as { operation: BaseEntityDict['user']['CreateSingle']}[];
                    if (!operation.data.name) {
                        throw new OakInputIllegalException('user', ['name'], this.t('placeholder.name'));
                    }
                    if ((operation.data as any)[`user${entityStr}$user`]?.length > 0) {
                        return;
                    }
                    throw new OakInputIllegalException('user', [`user${entityStr}$user`], this.t('placeholder.relation'));
                });
            }
        },
    },
    methods: {
        async onConfirm() {
            await this.execute();
        },
    },
});
