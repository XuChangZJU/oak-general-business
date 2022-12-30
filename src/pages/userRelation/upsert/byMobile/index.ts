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
    formData({ data: mobile }) {
        return {
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
                    this.clean();
                    this.setId(data[0].id);
                }
                else {
                    this.clean();
                    this.unsetId();
                    // todo
                    this.update({
                        mobile: value,
                    });
                }
            }
            else {
                this.clean();
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
            this.clean();
            this.setState({
                mobileValue: '',
                mobileValueReady: false,
            });
            this.unsetId();
        },

        searchChangeMp(e: WechatMiniprogram.Input) {
            const { value } = e.detail;
            this.onMobileChange(value);
        },
        searchCancelMp() {
            this.onReset();
        }
    },
});
