 
export default OakComponent({
    data: {
        visible: false,
        dialogVisible: false,
    },
    methods: {
        printDebugStore() {
            console.log(this.features.cache.getFullData());
        },
        printCachedStore() {
            console.log(this.features.cache.getCachedData());
        },
        printRunningTree() {
            console.log(this.features.runningTree.getRoot());
        },
        resetInitialData() {
            this.features.cache.resetInitialData();
        },
        setVisible(visible: boolean) {
            this.setState({
                visible,
            });
        },
        handlePopup() {
            this.setVisible(true);
        },
        onVisibleChange(e: any) {
            this.setVisible(e.detail.visible);
        },
        //小程序重置
        handleReset() {
            this.resetInitialData();
            const pages = getCurrentPages(); //获取加载的页面
            const currentPage = pages[pages.length - 1]; //获取当前页面的对象
            const url = currentPage.route; //当前页面url
            const options = currentPage.options; //如果要获取url中所带的参数可以查看options
            this.redirectTo(
                {
                    url: url
                        .replace('/pages', '')
                        .replace('pages', '')
                        .replace('/index', ''),
                },
                options
            );
            this.closeDialog();
        },
        showDialog() {
            this.setState({
                dialogVisible: true,
            });
        },
        closeDialog() {
            this.setState({
                dialogVisible: false,
            });
        },
    },
});
