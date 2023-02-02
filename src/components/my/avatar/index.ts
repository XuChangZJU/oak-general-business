import { OpSchema as ExtraFile } from '../../../general-app-domain/ExtraFile/Schema';

export default OakComponent({
    isList: false,
    properties: {
        shape: {
            type: String,
            value: 'circle',
        },
        size: {
            type: Number,
            optionalTypes: [Number, String],
        },
        iconType: {
            type: String,
            value: 'fas',
        },
        iconColor: {
            type: String,
            value: 'primary',
        },
        iconName: {
            type: String,
            value: 'user',
        },
    },
    formData({ features }) {
        const userInfo = features.token.getUserInfo();
        if (userInfo) {
            const extraFile = userInfo?.extraFile$entity?.find(
                (ele: ExtraFile) => ele.tag1 === 'avatar'
            );

            const avatarUrl = extraFile && features.extraFile.getUrl(extraFile);
            return {
                avatarUrl,
            };
        }
        return {
            avatarUrl: '',
        };
    },
    lifetimes: {
        attached() {
            this.subscribed.push(
                this.features.token.subscribe(
                    () => this.reRender()
                )
            );
        }
    }
})