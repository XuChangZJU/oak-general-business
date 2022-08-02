export default OakComponent({
    data: {
        visible: false,
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
        setVisible(visible) {
            this.setState({
                visible,
            });
        },
    },
});
