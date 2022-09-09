
export default OakPage({
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
        areaText:
            address?.area &&
            `${address?.area?.parent?.parent?.name}${address?.area?.parent?.name}${address?.area?.name}`,
        detail: address?.detail,
    }),
    methods: {
        setValue(input: any) {
            const { dataset, value } = this.resolveInput(input);
            this.setUpdateData(dataset!.attr, value);
        },
        callAreaPicker() {
            this.callPicker('area', {
                depth: 3,
            });
        },
        async confirm() {
            await this.execute(this.props.oakId ? 'update' : 'create');
            if (this.props.oakFrom === 'address:list') {
                this.navigateBack();
            }
        },
        reset() {
            this.resetUpdateData();
        },
    },
});