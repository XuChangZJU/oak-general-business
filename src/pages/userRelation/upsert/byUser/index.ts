import assert from 'assert';
import { firstLetterUpperCase } from "oak-domain/lib/utils/string";
import { isMobile } from 'oak-domain/lib/utils/validator';

export default OakComponent({
    isList: false,
    async formData() {
        let legal = this.tryExecute();
        return {
            legal: !!legal,
        };
    },
    methods: {
        async onConfirm() {
            await this.execute();
            this.navigateBack();
        },
        onReset() {
            this.clean();
        }
    },
});
