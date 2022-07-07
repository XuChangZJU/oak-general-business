// index.ts

import { composeFileUrl } from "../../../../../src/utils/extraFile";

export default OakPage({
    path: 'user:manage:detail',
    entity: 'user',
    projection: {
        id: 1,
        nickname: 1,
        name: 1,
        userState: 1,
        idState: 1,
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
    formData: async ({ data: user }) => {
        const {
            id,
            nickname,
            idState,
            userState,
            name,
            mobile$user,
            extraFile$entity,
        } = user || {};
        const mobile = mobile$user && mobile$user[0]?.mobile;
        const avatar =
            extraFile$entity &&
            extraFile$entity[0] &&
            composeFileUrl(extraFile$entity[0]);
        return {
            id,
            nickname,
            name,
            mobile,
            avatar,
            userState,
            idState,
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
        'play',
    ],
    data: {
        show: false,
        actionDescriptions: {
            accept: {
                icon: {
                    name: 'pan_tool',
                },
                label: '通过',
            },
            activate: {
                icon: {
                    name: 'check',
                },
                label: '激活',
            },
            disable: {
                icon: {
                    name: 'flash_off',
                },
                label: '禁用',
            },
            enable: {
                icon: {
                    name: 'flash_on',
                },
                label: '启用',
            },
            remove: {
                icon: {
                    name: 'clear',
                },
                label: '删除',
            },
            update: {
                icon: {
                    name: 'edit',
                },
                label: '更新',
            },
            verify: {
                icon: {
                    name: 'how_to_reg',
                },
                label: '验证',
            },
            play: {
                icon: {
                    name: 'play_circle',
                },
                label: '切换',
            },
        },
    },
    methods: {
        openDrawer() {
            this.setState({
                show: true,
            });
        },
        closeDrawer() {
            this.setState({
                show: false,
            });
        },
        async onActionClick({ detail }: WechatMiniprogram.CustomEvent) {
            const { action } = detail;
            switch (action) {
                case 'update': {
                    this.navigateTo({
                        url: '/user/upsert',
                        oakId: this.props.oakId,
                    });
                    return;
                }
                case 'enable':
                case 'disable':
                case 'accept':
                case 'verify':
                case 'activate':
                case 'play': {
                    await this.execute(action);
                    break;
                }
                default: {
                    console.error(`尚未实现的action: ${action}`);
                }
            }
            if (action === 'play') {
                this.navigateBack({
                    delta: 2,
                });
            }
        },
    },
});