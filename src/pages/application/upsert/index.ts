import { AppType } from '../../../general-app-domain/Application/Schema';

type typeOption = {
    value: AppType
}

export default OakComponent({
    isList: false,
    entity: 'application',
    projection: {
        id: 1,
        name: 1,
        config: 1,
        description: 1,
        type: 1,
        systemId: 1,
    },
    formData({ data }) {
        return data || {};
    },
    data: {
        typeArr: [
            {
                value: 'web',
            },
            {
                value: "wechatMp",
            },
            {
                value: "wechatPublic",
            },
        ] as typeOption[],
    },
    lifetimes: {
        ready() {
            const { systemId, oakId } = this.props;

            if (!oakId) {
                if (systemId) {
                    this.update({
                        systemId,
                    });
                }
            }
        },
    },
    methods: {
        async confirm() {
            await this.execute();
            this.navigateBack();
        },
    },
});
