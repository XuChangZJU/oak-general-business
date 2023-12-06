
export default OakComponent({
    isList: false,
    properties: {
        // 背景色
        backgroundColor: '',
        // 背景图
        backgroundUrl: '',
        // 当前选中索引
        selectedIndex: 0,
        // tab 项
        list: [] as {
            redDot: boolean;
            text: string;
            pagePath: string;
            iconName?: string; //使用oakIcon
            selectedIconName?: string; //使用oakIcon
            iconPath?: string;
            selectedIconPath?: string;
            iconSize?: string;
        }[],
        color: '#666',
        selectedColor: '',
        border: false,
        selectedIconPath: '', //一般在list设置
        iconPath: '',
    },
    lifetimes: {
        show() {
            // 切换 tab 选中项
            this.parseCurrentPage();
        },
    },
    data: {
        showTabBar: true,
    },
    methods: {
        /**
         * 根据当前页 path，切换 tab 选中项
         */
        parseCurrentPage() {
            const { list } = this.props;
            const currentPagePath = '/' + getCurrentPages()[0].route;
            const namespace = this.features.navigator.getNamespace();

            let index;
            for (let i = 0; i < list!.length; i++) {
                const pagePath = list![i].pagePath;
                const pathname = this.features.navigator.getPathname(
                    pagePath,
                    namespace
                );
                if (pathname === currentPagePath) {
                    index = i;
                    break;
                }
            }

            if (index === undefined) {
                this.setState({
                    showTabBar: false,
                });
                return;
            }

            this.setState({
                selectedIndex: index,
            });

            // 触发事件
            const item = list![index];
            this.triggerEvent('oakchange', { index, item });
        },

        /**
         * 事件：点击 tab 项
         */
        onTapItem(e: { currentTarget: { dataset: { index: any } } }) {
            const index = e.currentTarget.dataset.index;
            const url = this.props.list![index].pagePath;

            this.triggerEvent('oaktap', {
                index,
                item: this.props.list![index],
            });

            if (!url) {
                return;
            }
            // 切换路由
            this.switchTab({
                url,
                fail: () => {
                    this.redirectTo({
                        url,
                        fail(error: any) {
                            console.warn('路由跳转错误，错误信息为：', error);
                        },
                    });
                },
            });
        },
    },
});
