import { ROOT_ROLE_ID } from '../../../constants';

export default OakComponent({
    entity: 'token',
    isList: true,
    projection: {
        id: 1,
        userId: 1,
        playerId: 1,
        user: {
            id: 1,
            nickname: 1,
            name: 1,
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
                    type: 1,
                    entity: 1,
                    extension: 1,
                },
                filter: {
                    tag1: 'avatar',
                },
                indexFrom: 0,
                count: 1,
            },
            mobile$user: {
                $entity: 'mobile',
                data: {
                    id: 1,
                    mobile: 1,
                },
            },
        },
        player: {
            id: 1,
            userRole$user: {
                $entity: 'userRole',
                data: {
                    id: 1,
                    userId: 1,
                    roleId: 1,
                },
            },
        },
    },
    filters: [{
        filter: ({ features }) => {
            const tokenId = features.token.getTokenValue();
            if (tokenId) {
                return {
                    id: tokenId,
                };
            }
            return {
                id: 'none',
            };
        },
    }],
    formData: ({ data, features }) => {
        const [token] = data || [];
        const user = token?.user;
        const player = token?.player;
        const avatarFile =
            user && user.extraFile$entity && user.extraFile$entity[0];
        const avatar = features.extraFile.getUrl(avatarFile);
        const nickname = user && user.nickname;
        const mobileData = user && user.mobile$user && user.mobile$user[0];
        const { mobile } = mobileData || {};
        const mobileCount = user?.mobile$user?.length || 0;

        const isLoggedIn = !!token;
        const isPlayingAnother = token && token.userId !== token.playerId;
        const isRoot =
            player?.userRole$user &&
            player.userRole$user[0]?.roleId === ROOT_ROLE_ID;
            
        const mobileText = mobileCount && mobileCount > 1 ? `${mobileCount}条手机号` : (mobile || '未设置');
        return {
            tokenId: token?.id,
            userId: user?.id,
            avatar,
            nickname,
            mobile,
            mobileCount,
            mobileText,
            isLoggedIn,
            isPlayingAnother,
            isRoot,
        };
    },
    data: {
        refreshing: false,
        showDrawer: false,
    },
    methods: {
        async onRefresh() {
            this.setState({
                refreshing: true,
            });
            try {
                await this.features.token.syncUserInfoWechatMp();
            } catch (err) {
                console.error(err);
            }
            this.setState({
                refreshing: false,
            });
        },
        async doLogin() {
            this.setState({
                refreshing: true,
            });
            try {
                switch (process.env.OAK_PLATFORM) {
                    case 'wechatMp': {
                        await this.features.token.loginWechatMp();
                        this.setState({
                            refreshing: false,
                        });
                        break;
                    }
                    case 'web': {
                        const eventLoggedIn = `token:me:login:${Date.now()}`;
                        this.sub(eventLoggedIn, () => {
                            this.navigateBack();
                        })
                        this.navigateTo({
                            url: '/login',
                            eventLoggedIn,
                        });
                        break;
                    }
                }
            } catch (err) {
                console.error(err);
            }
        },
        goMyMobile() {
            this.navigateTo({
                url: '/mobile/me',
            });
        },
        goUserManage() {
            this.navigateTo({
                url: '/user/manage',
            });
        },
    },
});