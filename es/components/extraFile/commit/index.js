import assert from 'assert';
export default OakComponent({
    formData({ features }) {
        const ids = this.getEfIds();
        const states = ids.map(id => features.extraFile2.getFileState(id));
        let state = 'uploaded';
        states.forEach((ele) => {
            if (ele) {
                if (['failed', 'local'].includes(ele.state)) {
                    state = ele.state;
                }
                else if (ele.state === 'uploading' && state === 'uploaded') {
                    state = 'uploading';
                }
            }
        });
        return {
            state,
        };
    },
    properties: {
        efPaths: [],
        size: 'middle',
        block: false,
        type: 'primary',
        executeText: '',
        buttonProps: {},
        afterCommit: () => { },
    },
    methods: {
        getEfIds() {
            const { efPaths } = this.props;
            const { oakFullpath } = this.state;
            assert(efPaths);
            if (oakFullpath) {
                const ids = efPaths.map((path) => {
                    const path2 = path ? `${oakFullpath}.${path}` : oakFullpath;
                    const data = this.features.runningTree.getFreshValue(path2);
                    if (data) {
                        return data.map(ele => ele.id);
                    }
                }).flat().filter(ele => !!ele);
                return ids;
            }
            return [];
        },
        async upload() {
            const ids = this.getEfIds();
            const promises = [];
            ids.forEach((id) => {
                const fileState = this.features.extraFile2.getFileState(id);
                if (fileState) {
                    const { state } = fileState;
                    if (['local', 'failed'].includes(state)) {
                        promises.push(this.features.extraFile2.upload(id));
                    }
                }
            });
            if (promises.length > 0) {
                await Promise.all(promises);
            }
        }
    },
    features: ['extraFile2'],
});
