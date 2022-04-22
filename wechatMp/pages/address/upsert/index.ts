
OakPage({
    path: 'address-upsert',
    entity: 'address',
    projection: {
        id: 1,
        name: 1,
        phone: 1,        
        area: {
            id: 1,
            name: 1,
            parent: {
                id: 1,
                name: 1,
                parent: {
                    id: 1,
                    name: 1,
                },
            },
        },
    },
    isList: false,
    formData: ([address]) => ({
        name: address?.name!,
        phone: address?.phone!,
        // areaName: `${address?.area?.parent.parent.name}${address?.area?.parent.name}${address?.area?.name}`,
        // provinceName: address?.area?.parent.parent.name,
        districtName: address?.area?.name!,
        area: address?.area,
        areaText: address?.area && `${address?.area?.parent?.parent?.name}${address?.area?.parent?.name}${address?.area?.name}`,
        detail: address?.detail,
    }),
}, {
    methods: {
        afterUpsert() {
            if (this.data.oakFrom === 'address-list') {
                wx.navigateBack();
            }
        }
    }
});