export default OakComponent({
    isList: true,
    entity: 'parasite',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        $$createAt$$: 1,
        expired: 1,
        expiresAt: 1,
        userId: 1,
        user: {
            id: 1,
            nickname: 1,
        }
    },
    properties: {
        entity: '',
        entityId: '',
    },
    filters: [
        {
            filter() {
                return {
                    entity: this.props.entity,
                    entityId: this.props.entityId || 'illegal',
                };
            },
        },
    ],
    sorters: [
        {
            sorter: {
                $attr: {
                    $$createAt$$: 1,
                },
                $direction: 'desc',
            },
            '#name': 'default',
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
    methods: {},
});
