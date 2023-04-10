"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    properties: {
        // 背景色
        bgColor: String,
        // 背景图
        bgImg: String,
        // 当前选中索引
        selectedIndex: {
            type: Number,
            value: 0
        },
        // tab 项
        list: [],
        color: {
            type: String,
            value: '#666'
        },
        selectedColor: {
            type: String,
            value: ''
        }
    },
    lifetimes: {
        show: function () {
            // 切换 tab 选中项
            this.parseCurrentPage();
        }
    },
    data: {
        showTabBar: true,
    },
    methods: {
        /**
         * 根据当前页 path，切换 tab 选中项
         */
        parseCurrentPage: function () {
            var list = this.props.list;
            var currentPagePath = '/' + getCurrentPages()[0].route;
            var index;
            for (var i = 0; i < list.length; i++) {
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
                selectedIndex: index
            });
            // 触发事件
            var item = list[index];
            this.triggerEvent('linchange', { index: index, item: item });
        },
        /**
         * 事件：点击 tab 项
         */
        onTapItem: function (e) {
            var index = e.currentTarget.dataset.index;
            var url = this.props.list[index].pagePath;
            this.triggerEvent('lintap', { index: index, item: this.props.list[index] });
            if (!url) {
                return;
            }
            // 切换路由
            wx.switchTab({
                url: url,
                fail: function () {
                    wx.navigateTo({
                        url: url,
                        fail: function (error) {
                            console.warn('路由跳转错误，错误信息为：', error);
                        }
                    });
                }
            });
        }
    }
});
