import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';
import { EntityDict } from '../../../oak-app-domain';

export default OakComponent({
    isList: false,
    data: {
        loading: false,
        illegal: false,
        expired: false,
    },
    lifetimes: {
        async attached() {
            const { oakId } = this.props;
            this.setState({
                loading: true,
            });
            try {
                const {
                    data: [parasite],
                } = await this.features.cache.refresh('parasite', {
                    data: {
                        id: 1,
                        expired: 1,
                        expiresAt: 1,
                        entity: 1,
                        entityId: 1,
                        redirectTo: 1,
                        userId: 1,
                        user: {
                            id: 1,
                            nickname: 1,
                        }
                    },
                    filter: {
                        id: oakId || 'illegal',
                    },
                });
                if (!parasite) {
                    this.setState({
                        loading: false,
                        illegal: true,
                    });
                    return;
                }
                if (parasite.expired) {
                    this.setState({
                        loading: false,
                        expired: true,
                    });
                    return;
                }

                // 登录之后
                this.features.token.removeToken();
                await this.features.token.wakeupParasite(parasite.id!);
                this.redirectPage(
                    parasite.redirectTo,
                    parasite?.user?.nickname === 'shadow_user' ? undefined : parasite?.user?.nickname
                );
            } catch (err) {
                this.setState({
                    loading: false,
                    illegal: false,
                    expired: false,
                });
            }
        },
    },
    methods: {
        redirectPage(
            redirectTo?: EntityDict['parasite']['Schema']['redirectTo'],
            nickname?: string | null
        ) {
            if (!redirectTo) {
                this.setMessage({
                    type: 'error',
                    content: '未配置跳转页面',
                });
                return;
            }
            const { pathname, props, state } = redirectTo;
            const url =
                pathname.substring(0, 1) === '/' ? pathname : `/${pathname}`;

            // if (isTabBar) {
            //     this.switchTab(
            //         {
            //             url,
            //             ...(props || {}),
            //         },
            //         state
            //     );
            //     return;
            // }
            this.redirectTo(
                {
                    url,
                    ...(props || {}),
                    name: nickname,
                },
                state
            );
        },
    },
});
