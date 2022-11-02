import assert from 'assert';
import { firstLetterUpperCase } from "oak-domain/lib/utils/string";
import { isMobile } from 'oak-domain/lib/utils/validator';

export default OakComponent({
    isList: false,
    async formData() {
        let legal = false;
        try {
            legal = await this.tryExecute();
        }
        catch(err) {
            legal = false;
        }
        return {
            legal,
        };
    },
    methods: {
        async onConfirm() {
            await this.execute();
            this.navigateBack();
        },
        async onReset() {
            await this.cleanOperation();
        }
    },
});
