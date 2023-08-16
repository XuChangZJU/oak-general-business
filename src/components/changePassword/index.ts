import { encryptPasswordSha1 } from '../../utils/password';
import dayjs from 'dayjs';
const SEND_KEY = 'captcha:sendAt';
const SEND_CAPTCHA_LATENCY = process.env.NODE_ENV === 'development' ? 10 : 60;

export default OakComponent({
    isList: false,
    entity: 'user',
    projection: {
        id: 1,
        name: 1,
        nickname: 1,
        mobile$user: {
            $entity: 'mobile',
            data: {
                id: 1,
                mobile: 1,
            },
            filter: {
                ableState: 'enabled'
            }
        }
    },
    formData: function ({ data: user, features, props }) {
        return {
            user,
        };
    },
    data: {
        channels: [] as string[],
    },
    lifetimes: {
        async attached() {
            const userId = this.props.oakId as string;
            const { result } = await this.features.cache.exec('getChangePasswordChannels', {
                userId,
            });
            console.log(result);
            this.setState({
                channels: result
            });
        },
    },
    methods: {
        goToMobile() {
            this.navigateTo(
                {
                    url: '/mobile/me',
                }
            )
        },
    },
});
