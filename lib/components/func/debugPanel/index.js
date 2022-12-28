"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: true,
    data: {
        visible: false,
        dialogVisible: false,
    },
    methods: {
        printDebugStore: function (e) {
            console.log(this.features.cache.getFullData());
        },
        printCachedStore: function () {
            console.log(this.features.cache.getCachedData());
        },
        printRunningTree: function () {
            console.log(this.features.runningTree.getRoot());
        },
        resetInitialData: function () {
            this.features.localStorage.clear();
            this.features.token.logout();
        },
        setVisible: function (visible) {
            this.setState({
                visible: visible,
            });
        },
        handlePopup: function () {
            this.setVisible(true);
        },
        handlePopupClose: function () {
            // this.setVisible(false);
        },
        //小程序重置
        handleReset: function () {
            this.resetInitialData();
            var pages = getCurrentPages(); //获取加载的页面
            var currentPage = pages[pages.length - 1]; //获取当前页面的对象
            var url = currentPage.route; //当前页面url
            var options = currentPage.options; //如果要获取url中所带的参数可以查看options
            this.redirectTo({
                url: url
                    .replace('/pages', '')
                    .replace('pages', '')
                    .replace('/index', ''),
            }, options);
            this.closeDialog();
        },
        showDialog: function () {
            this.setState({
                dialogVisible: true,
            });
        },
        closeDialog: function () {
            this.setState({
                dialogVisible: false,
            });
        },
        downloadEnv: function () {
            var data = this.features.localStorage.loadAll();
            return data;
        },
        resetEnv: function (data) {
            this.features.localStorage.resetAll(data);
        },
    },
});
