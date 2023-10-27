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
                const { data: [bridge], } = await this.features.cache.refresh('bridge', {
                    data: {
                        id: 1,
                        expired: 1,
                        expiresAt: 1,
                        entity: 1,
                        entityId: 1,
                        redirectTo: 1,
                    },
                    filter: {
                        id: oakId || 'illegal',
                    },
                });
                if (!bridge) {
                    this.setState({
                        loading: false,
                        illegal: true,
                    });
                    return;
                }
                if (bridge.expired) {
                    this.setState({
                        loading: false,
                        expired: true,
                    });
                    return;
                }
                // 登录之后
                this.features.token.removeToken();
                this.redirectPage(bridge.redirectTo);
            }
            catch (err) {
                this.setState({
                    loading: false,
                    illegal: false,
                    expired: false,
                });
            }
        },
    },
    methods: {
        redirectPage(redirectTo, nickname) {
            if (!redirectTo) {
                this.setMessage({
                    type: 'error',
                    content: '未配置跳转页面',
                });
                return;
            }
            const { pathname, props, state } = redirectTo;
            const url = pathname.substring(0, 1) === '/' ? pathname : `/${pathname}`;
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
            this.redirectTo({
                url,
                ...(props || {}),
                name: nickname,
            }, state);
        },
    },
});
