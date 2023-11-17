import dayjs from 'dayjs';
export default OakComponent({
    isList: true,
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relationEntity: 1,
        relationEntityFilter: 1,
        relationIds: 1,
        type: 1,
        qrCodeType: 1,
        remark: 1,
        granterId: 1,
        granter: {
            id: 1,
            name: 1,
            nickname: 1,
        },
        $$createAt$$: 1,
        expired: 1,
        expiresAt: 1,
    },
    actions: [
        'disable',
    ],
    properties: {
        entity: '',
        entityId: '',
        relationEntity: '',
    },
    filters: [
        {
            filter() {
                return {
                    entity: this.props.entity,
                    entityId: this.props.entityId,
                    relationEntity: this.props.relationEntity,
                };
            },
        },
    ],
    sorters: [
        {
            sorter: () => ({
                $attr: {
                    $$createAt$$: 1,
                },
                $direction: 'desc',
            }),
            '#name': 'default',
        },
    ],
    formData({ data }) {
        const list = data?.map((ele) => {
            return {
                id: ele?.id,
                type: ele?.type,
                granter: ele?.granter,
                expired: ele?.expired,
                createAt: dayjs(ele?.$$createAt$$).format('YYYY-MM-DD HH:mm:ss'),
                expiresAt: dayjs(ele?.expiresAt).format('YYYY-MM-DD HH:mm:ss'),
                '#oakLegalActions': ele?.['#oakLegalActions']
            };
        });
        return {
            list,
        };
    },
    data: {
        open: false,
        userEntityGrantId: '',
    },
    methods: {
        async bindClicked(e) {
            const { id } = e.currentTarget.dataset;
            this.setState({
                userEntityGrantId: id,
                open: true,
            });
        },
        async bindClose() {
            this.setState({
                userEntityGrantId: '',
                open: false,
            });
        },
    },
});
