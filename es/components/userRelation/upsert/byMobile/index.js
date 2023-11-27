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
        const { oakFullpath } = this.state;
        const userRelations = oakFullpath && this.features.runningTree.getOperations(`${oakFullpath}.user.userRelation$user`);
        return {
            userId: mobile?.userId,
            legal: userRelations && userRelations.length > 0,
        };
    },
    properties: {
        entity: '',
        entityId: '',
        relations: [],
    },
    data: {
        mobileValue: '',
        mobileValueReady: false,
        isNew: false,
    },
    methods: {
        async onMobileChange(value) {
            const mobileValueReady = isMobile(value);
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
                    this.unsetId();
                    this.setId(data[0].id);
                    this.setState({
                        isNew: false,
                    });
                }
                else {
                    this.clean();
                    this.unsetId();
                    this.setState({
                        isNew: true,
                    });
                    this.create({
                        mobile: value,
                    });
                }
            }
            else {
                this.clean();
                // this.unsetId();
            }
            this.setState({
                mobileValueReady,
                mobileValue: value,
            });
        },
        async onConfirm() {
            if (this.state.isNew) {
                const userValue = this.getFreshValue('user');
                if (!userValue.name) {
                    this.setMessage({
                        type: 'error',
                        content: '用户姓名未填写',
                    });
                    return;
                }
            }
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
        searchChangeMp(e) {
            const { value } = e.detail;
            this.onMobileChange(value);
        },
        searchCancelMp() {
            this.onReset();
        }
    },
});
