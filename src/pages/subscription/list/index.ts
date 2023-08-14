import { EntityDict } from '../../../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base/lib/types/Page';

export default OakComponent({
    isList: true,
    entity: 'subscription',
    projection: {
        id: 1,
        name: 1,
        description: 1,
        config: 1,
        entity: 1,
        entityId: 1,
    },
    properties: {
        entityId: '',
        entity: '' as keyof EntityDict,
        variant: 'inline' as 'inline' | 'alone' | 'dialog',
    },
    filters: [
        {
            filter() {
                return {
                    entityId: this.props.entityId,
                    entity: this.props.entity,
                };
            },
        },
    ],
    formData({ data }) {
        return {
            list: data,
        };
    },
    data: {
        open: false,
    },
    methods: {
        goDetail(id: string) {
            this.navigateTo({
                url: '/subscription/detail',
                oakId: id,
            });
        },
        goUpdate(id: string) {
            this.navigateTo({
                url: '/subscription/upsert',
                oakId: id,
            });
        },
        goSetConfig(id: string) {
            this.navigateTo({
                url: '/subscription/config/upsert',
                oakId: id,
            });
        },
        goCreate() {
            const { entityId, entity } = this.props;
            this.navigateTo({
                url: '/subscription/upsert',
                entityId,
                entity,
            });
        },
        remove(id: string) {
            this.removeItem(id);
            this.execute();
        },
    },
}) as <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(
    props: ReactComponentProps<
        ED2,
        T2,
        true,
        {
            entityId: string,
            entity: keyof ED2,
            variant?: 'inline' | 'alone' | 'dialog',
        }
    >
) => React.ReactElement;
