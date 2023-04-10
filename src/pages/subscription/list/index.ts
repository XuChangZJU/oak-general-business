import { EntityDict } from '../../../general-app-domain/EntityDict';
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
});
