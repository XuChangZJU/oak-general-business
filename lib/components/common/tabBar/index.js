"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    properties: {
        // 背景色
        bgColor: '',
        // 背景图
        bgImgUrl: '',
        // 当前选中索引
        selectedIndex: 0,
        // tab 项
        list: [],
        color: '#666',
        selectedColor: '',
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
            let index;
            for (let i = 0; i < list.length; i++) {
                if (list[i].pagePath === currentPagePath) {
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
            const item = list[index];
            this.triggerEvent('linchange', { index, item });
        },
        /**
         * 事件：点击 tab 项
         */
        onTapItem(e) {
            const index = e.currentTarget.dataset.index;
            const url = this.props.list[index].pagePath;
            this.triggerEvent('lintap', {
                index,
                item: this.props.list[index],
            });
            if (!url) {
                return;
            }
            // 切换路由
            wx.switchTab({
                url,
                fail() {
                    wx.navigateTo({
                        url,
                        fail(error) {
                            console.warn('路由跳转错误，错误信息为：', error);
                        },
                    });
                },
            });
        },
    },
});
