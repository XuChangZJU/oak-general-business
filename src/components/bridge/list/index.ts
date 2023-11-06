import { QrCodeType } from '../../../types/Config';
export default OakComponent({
    isList: true,
    entity: 'bridge',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        $$createAt$$: 1,
        expired: 1,
        expiresAt: 1,
        qrCodeType: 1,
    },
    actions: [
        'cancel',
        'qrcode'
    ],
    properties: {
        entity: '',
        entityId: '',
        qrCodeType: '' as QrCodeType,
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
        return {
            list: data,
        };
    },
    data: {
        open: false,
    },
    methods: {
    },
});
