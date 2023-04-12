import { EntityDict } from '../../../../general-app-domain';

export default OakComponent({
    isList: false,
    formData() {
        let legal = this.tryExecute();
        return {
            legal: !!legal,
        };
    },
    properties: {
        entity: '' as keyof EntityDict,
        entityId: '',
        relations: [] as string[],
    },
    methods: {
        async onConfirm() {
            await this.execute();
            this.navigateBack();
        },
    },
});
