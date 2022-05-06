// index.ts

OakPage({
    path: 'address:list',
    entity: 'address',
    projection: {
        id: 1,
        name: 1,
        phone: 1,
        detail: 1,
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
    isList: true,
    formData: async (addresses) => ({
        addresses: addresses.map(
            (address) => ({
                name: address?.name!,
                phone: address?.phone!,
                districtName: address?.area?.name!,
                areaText: address?.area && `${address?.area?.parent?.parent?.name}${address?.area?.parent?.name}${address?.area?.name}`,
                detail: address?.detail,
            })
        ),
    }),
}, {
    methods: {
        goNewAddress() {
            this.data.a
            this.navigateTo({
                url: '../upsert/index',
            });
        }
    }
});