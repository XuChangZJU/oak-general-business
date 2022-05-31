
OakPage({
    path: 'address:upsert',
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
    isList: false,
    formData: async ({ data: address }) => ({
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
        setValue(input: WechatMiniprogram.Input) {
            const { target, detail } = input;
            const { dataset: { attr } } = target;
            const { value } = detail;
            this.setUpdateData(attr, value);
        },
        callAreaPicker() {
            this.callPicker('area', {
                depth: 3,
            });
        },
        async confirm() {
            await this.execute(this.data.oakId ? 'update': 'create');                      
            if (this.data.oakFrom === 'address:list') {
                wx.navigateBack();
            }
        },
        reset() {
            this.resetUpdateData();
        }
    }
});