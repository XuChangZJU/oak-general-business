import { EntityDict } from '../../../general-app-domain';

export default OakComponent({
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
    async formData({ data: address }) {
        return {
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
        };
    },
    methods: {
        setValue(input: any) {
            const { dataset, value } = this.resolveInput(input);
            const { attr } = dataset!
            this.update({
                [attr]: value,
            });
        },
        callAreaPicker() {
            const event = 'address:upsert:selectArea';
            this.sub(event, async ({ id }: {id: string}) => {
                await this.update({
                    areaId: id,
                });
                this.navigateBack();
            });
            this.navigateTo({
                url: '/pickers/area',
            }, {
                itemSelectedEvent: event,
                depth: 3,
            });
        },
        async confirm(data: EntityDict['address']['Update']['data']) {
            await this.execute(data);
            this.navigateBack();
        },
        reset() {
            this.clean();
        },
    },
});