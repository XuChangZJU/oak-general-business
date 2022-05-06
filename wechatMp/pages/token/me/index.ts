import { ROOT_ROLE_ID } from '../../../../src/constants';
import { composeFileUrl } from '../../../../src/utils/extraFile';

OakPage({
    path: 'token:me',
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
                }
            },
        }
    },
    formData: async ([token]) => {
        const user = token?.user;
        const player = token?.player;
        const avatarFile = user && user.extraFile$entity && user.extraFile$entity[0];
        const avatar = avatarFile && composeFileUrl(avatarFile);
        const nickname = user && user.nickname;
        const mobileData = user && user.mobile$user && user.mobile$user[0];
        const { mobile } = mobileData || {};
        const mobileCount = user?.mobile$user?.length || 0;

        const isLoggedIn = !!token;
        const isPlayingAnother = token && token.userId !== token.playerId;
        const isRoot = player?.userRole$user && player.userRole$user[0].roleId === ROOT_ROLE_ID;
        return {
            avatar,
            nickname,
            mobile,
            mobileCount,
            isLoggedIn,
            isPlayingAnother,
            isRoot,
        };
    },
}, {
    methods: {
        async onRefresh() {
            this.setData({
                refreshing: true,
            });
            try {
                await this.features.token.syncUserInfoWechatMp('token:me');
            }
            catch (err) {
                console.error(err);
            }
            this.setData({
                refreshing: false,
            });
        },
        async doLogin() {
            this.setData({
                refreshing: true,
            });
            try {
                await this.features.token.loginWechatMp('token:me');
            }
            catch (err) {
                console.error(err);
            }
            this.setData({
                refreshing: false,
            });
        },
        goMyMobile() {
            this.navigateTo({
                url: '../../mobile/me/index',
            });
        },
        goUserManage() {
            this.navigateTo({
                url: '../../user/manage/index',
            });
        }
    }
});