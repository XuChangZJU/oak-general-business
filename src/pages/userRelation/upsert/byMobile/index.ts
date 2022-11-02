import assert from 'assert';
import { firstLetterUpperCase } from "oak-domain/lib/utils/string";
import { isMobile } from 'oak-domain/lib/utils/validator';

export default OakComponent({
    entity: 'mobile',
    projection: {
        id: 1,
        mobile: 1,
        ableState: 1,
        userId: 1,
    },
    isList: false,
    async formData({ data: mobile }) {
        let legal = false;
        try {
            legal = await this.tryExecute();
        }
        catch(err) {
            legal = false;
        }
        return {
            legal,
            userId: mobile?.userId,
        };
    },
    properties: {
        entity: String,
        entityId: String,
        relations: Array,
    },
    data: {
        mobileValue: '',
        mobileValueReady: false,
    },
    methods: {
        async onMobileChange(value: string) {
            const mobileValueReady = isMobile(value) as boolean;
            if (mobileValueReady) {
                const { data } = await this.features.cache.refresh('mobile', {
                    data: {
                        id: 1,
                        mobile: 1,
                        ableState: 1,
                        userId: 1,
                    },
                    filter: {
                        mobile: value,
                        ableState: 'enabled',
                    }
                });
                if (data.length > 0) {
                    await this.cleanOperation();
                    await this.setId(data[0].id);
                }
                else {
                    await this.cleanOperation();
                    await this.unsetId();
                    await this.addOperation({
                        action: 'create',
                        data: {
                            mobile: value,
                        }
                    })
                }
            }
            else {
                this.cleanOperation();
                this.unsetId();
            }
            this.setState({
                mobileValueReady,
                mobileValue: value,
            });
        },
        async onConfirm() {
            await this.execute();
            this.setState({
                mobileValue: '',
                mobileValueReady: false,
            });
            this.unsetId();
        },
        onReset() {
            this.cleanOperation();
            this.setState({
                mobileValue: '',
                mobileValueReady: false,
            });
            this.unsetId();
        }
    },
});
