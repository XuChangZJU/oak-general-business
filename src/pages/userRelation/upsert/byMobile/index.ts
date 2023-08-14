import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { isMobile } from 'oak-domain/lib/utils/validator';
import { EntityDict } from '../../../../general-app-domain';

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
        entity: '' as keyof EntityDict,
        entityId: '',
        relations: [] as string[],
    },
    data: {
        mobileValue: '',
        mobileValueReady: false,
        isNew: false,
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
                    this.setId(data[0].id!);
                    this.setState({
                        isNew: false,
                    })
                }
                else {
                    this.clean();
                    this.setState({
                        isNew: true,
                    })
                    this.create({
                        mobile: value,
                        user: {
                            id: generateNewId(),
                            action: 'create',
                            data: {
                                id: generateNewId(),
                            }
                        }
                    } as EntityDict['mobile']['CreateSingle']['data']);
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
            if (this.state.isNew) {
                const userValue = this.getFreshValue(
                    'user'
                ) as Partial<EntityDict['user']['Schema']>;
                if (!userValue.name) {
                    this.setMessage(
                        {
                            type: 'error',
                            content: '用户姓名未填写',
                        }
                    )
                    return;
                }
                if (!userValue.password) {
                    this.setMessage(
                        {
                            type: 'error',
                            content: '用户密码未设置',
                        }
                    )
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

        searchChangeMp(e: WechatMiniprogram.Input) {
            const { value } = e.detail;
            this.onMobileChange(value);
        },
        searchCancelMp() {
            this.onReset();
        }
    },
});
