export default OakComponent({
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
    },
});
