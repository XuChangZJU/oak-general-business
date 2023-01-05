// index.ts


export default OakComponent({
    entity: 'user',
    projection: {
        id: 1,
        nickname: 1,
        name: 1,
        userState: 1,
        birth: 1,
        idState: 1,
        gender: 1,
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
    isList: false,

    formData: ({ data: user, features, legalActions }) => {
        const {
            id,
            nickname,
            idState,
            userState,
            name,
            gender,
            mobile$user,
            birth,
            extraFile$entity,
        } = user || {};
        const mobile = mobile$user && mobile$user[0]?.mobile;
        const mobileCount = mobile$user ? mobile$user.length : 0;
        const mobileText =
            mobileCount && mobileCount > 1
                ? `${mobileCount}条手机号`
                : mobile || '未设置';
        const avatar = features.extraFile.getUrl(extraFile$entity && extraFile$entity[0]);
        const reallyRoot = features.token.isReallyRoot();
        const currentUserId = features.token.getUserId();
        const executableActions = (reallyRoot && currentUserId !== id) ? legalActions.concat('play') : legalActions;
        return {
            id,
            nickname,
            name,
            mobile,
            gender,
            avatar,
            birth: birth ? new Date(birth).toLocaleDateString() : '',
            userState,
            idState,
            mobileCount,
            mobileText,
            executableActions,
        };
    },
    actions: [
        'accept',
        'activate',
        'disable',
        'enable',
        'remove',
        'update',
        'verify',
    ],
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
        show: false,
        actionDescriptions: {
            accept: {
                icon: {
                    name: 'success',
                },
                label: '通过',
            },
            activate: {
                icon: {
                    name: 'playon',
                },
                label: '激活',
            },
            disable: {
                icon: {
                    name: 'shielding',
                },
                label: '禁用',
            },
            enable: {
                icon: {
                    name: 'barrage',
                },
                label: '启用',
            },
            remove: {
                icon: {
                    name: 'trash',
                },
                label: '删除',
            },
            update: {
                icon: {
                    name: 'editor',
                },
                label: '更新',
            },
            verify: {
                icon: {
                    name: 'businesscard',
                },
                label: '验证',
            },
            play: {
                icon: {
                    name: 'refresh',
                },
                label: '切换',
            },
        },
    },
    methods: {
        async onActionClick(action: string) {
            switch (action) {
                case 'update': {
                    this.navigateTo({
                        url: '/user/manage/upsert',
                        oakId: this.props.oakId,
                    });
                    return;
                }
                case 'enable':
                case 'disable':
                case 'accept':
                case 'verify':
                case 'activate':{
                    await this.execute(action);
                    break;
                }
                case 'play': {
                    const { id } = this.state;
                    await this.features.token.switchTo(id);
                    break;
                }
                default: {
                    console.error(`尚未实现的action: ${action}`);
                }
            }
            if (action === 'play') {
                this.navigateBack(2);
            }
        },
        onActionClickMp(e: WechatMiniprogram.TouchEvent) {
            const { action } = e.detail;
            return this.onActionClick(action);
        },
    },
});
