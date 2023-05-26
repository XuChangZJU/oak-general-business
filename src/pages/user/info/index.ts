import {
    OakUserUnpermittedException,
} from 'oak-domain/lib/types';
import {
    AppType,
    WechatPublicConfig,
} from '../../../general-app-domain/Application/Schema';
import dayjs from 'dayjs';
type Attr = 'nickname' | 'gender' | 'birth';
const SEND_KEY = 'captcha:sendAt';
const SEND_CAPTCHA_LATENCY = process.env.NODE_ENV === 'development' ? 10 : 60;

export default OakComponent({
    entity: 'user',
    projection: {
        id: 1,
        name: 1,
        nickname: 1,
        birth: 1,
        gender: 1,
        idState: 1,
        userState: 1,
        mobile$user: {
            $entity: 'mobile',
            data: {
                id: 1,
                mobile: 1,
                userId: 1,
                user: {
                    id: 1,
                    userState: 1,
                    refId: 1,
                },
            },
        },
        extraFile$entity: {
            $entity: 'extraFile',
            data: {
                id: 1,
                tag1: 1,
                origin: 1,
                bucket: 1,
                objectId: 1,
                filename: 1,
                extra1: 1,
                extension: 1,
                type: 1,
                entity: 1,
                entityId: 1,
            },
            filter: {
                tag1: 'avatar',
            },
            indexFrom: 0,
            count: 1,
        },
        wechatUser$user: {
            $entity: 'wechatUser',
            data: {
                id: 1,
                openId: 1,
                unionId: 1,
                userId: 1,
                origin: 1,
                nickname: 1,
                user: {
                    id: 1,
                    userState: 1,
                    refId: 1,
                },
            },
        },
    },
    isList: false,
    formData({ data: user, features }) {
        const application = features.application.getApplication();

        const avatar = user?.extraFile$entity && user?.extraFile$entity[0];
        const avatarUrl = features.extraFile.getUrl(avatar);
        const { mobile } = (user?.mobile$user && user?.mobile$user[0]) || {};

        const genderOption =
            user?.gender &&
            this.state.genderOptions.find((ele) => ele.value === user?.gender);
        const appType = application?.type as AppType;
        const config = application?.config;
        let appId;
        let isSupportSyncWeChat = false; //是否支持微信公众号授权登录
        if (appType === 'wechatPublic') {
            const config2 = config as WechatPublicConfig;
            const isService = config2?.isService; //是否服务号 服务号才能授权登录
            appId = config2?.appId;
            isSupportSyncWeChat = !!(isService && appId);
        }

        const lastSendAt = features.localStorage.load(SEND_KEY);
        const now = Date.now();
        let counter = 0;
        if (typeof lastSendAt === 'number') {
            counter = Math.max(
                SEND_CAPTCHA_LATENCY - Math.ceil((now - lastSendAt) / 1000),
                0
            );
            if (counter > 0) {
                (this as any).counterHandler = setTimeout(
                    () => this.reRender(),
                    1000
                );
            } else if ((this as any).counterHandler) {
                clearTimeout((this as any).counterHandler);
                (this as any).counterHandler = undefined;
            }
        }

        return {
            id: user?.id,
            name: user?.name,
            nickname: user?.nickname,
            gender: user?.gender,
            genderStr: genderOption?.label,
            birthText: user?.birth
                ? dayjs(user.birth).format('YYYY-MM-DD')
                : '',
            birth: user?.birth,
            avatarUrl,
            mobile,
            userState: user?.userState,
            idState: user?.idState,

            isSupportSyncWeChat,
            wechatUser: user?.wechatUser$user?.[0],
            counter,
        };
    },
    data: {
        stateColor: {
            shadow: 'primary',
            normal: 'success',
            disabled: 'danger',
        },
        idStateColor: {
            verifying: 'primary',
            verified: 'success',
            unverified: 'warning',
        },
        genderOptions: [
            {
                value: 'male',
                label: '男',
            },
            {
                value: 'female',
                label: '女',
            },
        ],
        visible: false,
        attr: '' as Attr | '',
        attrs: {
            nickname: '昵称',
            gender: '性别',
            birth: '出生日期',
        },
        birthEnd: '',
        refreshing: false,
    },
    lifetimes: {
        async ready() {
            const { oakId } = this.props;
            const userId = this.features.token.getUserId();
            if (userId !== oakId) {
                throw new OakUserUnpermittedException();
            }
            this.setState({ birthEnd: dayjs().format('YYYY-MM-DD') });
        },
    },
    methods: {
        async refreshWechatPublicUserInfo() {
            this.setState({
                refreshing: true,
            });
            try {
                await this.features.token.refreshWechatPublicUserInfo();
                this.setState({
                    refreshing: false,
                });
            } catch (err) {
                this.setState({
                    refreshing: false,
                });
                throw err;
            }
        },
        goAddMobile() {
            this.navigateTo(
                {
                    url: '/mobile/me',
                },
                {
                    showBack: true,
                }
            );
        },
        setVisibleMp(e: WechatMiniprogram.Touch) {
            const {
                target: { dataset },
            } = e;
            const { attr } = dataset!;
            this.setVisible(true, attr);
        },
        genderChangeMp(e: WechatMiniprogram.Touch) {
            const { detail } = e;
            const { checked, currentKey } = detail;
            const { attr } = this.state;
            this.setCustomData(attr as Attr, currentKey);
        },
        birthChangeMp(e: WechatMiniprogram.Input) {
            const {
                detail: { value },
            } = e;
            const birth = dayjs(dayjs(value).format('YYYY-MM-DD')).valueOf();
            const { attr } = this.state;
            this.setState({
                birthText2: dayjs(value).format('YYYY-MM-DD'),
            });
            this.setCustomData(attr as Attr, birth);
        },
        setVisible(visible: boolean, attr: Attr) {
            this.setState({
                visible,
                attr: visible ? attr : '',
                [`new_${attr}`]: '',
                birthText2: '',
            });
        },
        setCustomData(attr: Attr, value: string | number) {
            this.setState({
                [`new_${attr}`]: value,
            });
        },
        setCustomDataMp(e: WechatMiniprogram.Input) {
            const {
                detail,
                target: { dataset },
            } = e;
            const { value } = detail;
            const { attr } = this.state;

            this.setCustomData(attr as Attr, value);
        },
        updateData(attr: Attr, value: string | number) {
            this.update({
                [attr]: this.state[`new_${attr}` as Attr],
            });
        },
        async onConfirmMp() {
            const { attr } = this.state;
            await this.onConfirm(attr as Attr);
        },
        async onConfirm(attr: Attr) {
            const { oakId } = this.props;
            if (!this.state[`new_${attr}` as Attr]) {
                this.setMessage({
                    type: 'warning',
                    content: `${this.state.attrs[attr]}不能为空`,
                });
                return;
            }
            this.update({
                [attr]: this.state[`new_${attr}` as Attr],
            });
            await this.execute();
            this.setVisible(false, attr as Attr);
        },
        onPupopCloseMp() {
            const { attr } = this.state;
            this.clean();
            this.setVisible(false, attr as Attr);
        },
        async updateMyInfo() {
            if (!this.state.name) {
                this.setMessage({
                    type: 'error',
                    content: '请输入姓名',
                });
                return;
            }
            if (!this.state.nickname) {
                this.setMessage({
                    type: 'error',
                    content: '请输入昵称',
                });
                return;
            }
            // if (!this.state.gender) {
            //     this.setMessage({
            //         type: 'error',
            //         content: '请选择性别',
            //     });
            //     return;
            // }
            // if (!this.state.birth) {
            //     this.setMessage({
            //         type: 'error',
            //         content: '请选择生日',
            //     });
            //     return;
            // }
            await this.execute('update');
        },
        async sendCaptcha() {
            const { mobile } = this.state;
            try {
                const result = await this.features.token.sendCaptcha(mobile);
                // 显示返回消息
                this.setMessage({
                    type: 'success',
                    content: result,
                });
                this.save(SEND_KEY, Date.now());
                this.reRender();
            } catch (err) {
                this.setMessage({
                    type: 'error',
                    content: (err as Error).message,
                });
            }
        },
        async unbunding(captcha?: string) {
            const { mobile, wechatUser } = this.state;
            try {
                await this.features.cache.exec('unbindingWechat', {
                    wechatUserId: wechatUser.id,
                    mobile,
                    captcha,
                })
                this.refresh();
                this.setMessage({
                    content: '解绑成功',
                    type: 'success',
                })
            }
            catch (err) {
                this.setMessage({
                    content: '解绑失败',
                    type: 'warning'
                })
            }
        }
    },
});
