import assert from 'assert';
import { EntityDict } from '../../../oak-app-domain';
import { FileState } from '../../../features/extraFile2';


export default OakComponent({
    formData({ features }) {
        const ids: string[] = this.getEfIds();
        const states = ids.map((id) => features.extraFile2.getFileState(id));
        let state: FileState = 'uploaded';
        states.forEach((ele) => {
            if (ele) {
                if (['failed', 'local'].includes(ele.state)) {
                    state = ele.state;
                } else if (ele.state === 'uploading' && state === 'uploaded') {
                    state = 'uploading';
                }
            }
        });
        return {
            state,
        };
    },
    properties: {
        action: '' as (string | undefined),
        efPaths: [] as string[],
        size: 'middle',
        block: false,
        type: 'primary',
        executeText: '',
        buttonProps: {},
        afterCommit: () => {},
        beforeCommit: (() => true) as () => boolean | undefined | Promise<boolean | undefined>,
    },
    methods: {
        getEfIds() {
            const { efPaths } = this.props;
            const { oakFullpath } = this.state;
            assert(efPaths && efPaths.length > 0);
            if (oakFullpath) {
                const ids = efPaths
                    .map((path) => {
                        const path2 = path
                            ? `${oakFullpath}.${path}`
                            : oakFullpath;
                        const data =
                            this.features.runningTree.getFreshValue(path2);
                        assert(
                            data,
                            `efPath为${path}的路径上取不到extraFile数据，请设置正确的相对路径`
                        );
                        return (
                            data as EntityDict['extraFile']['OpSchema'][]
                        ).map((ele) => ele.id);
                    })
                    .flat()
                    .filter((ele) => !!ele) as string[];
                return ids;
            }
            return [];
        },
        async upload() {
            const ids = this.getEfIds();
            assert(ids.length > 0);

            const promises: Promise<void>[] = [];
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
        },
    },
    features: ['extraFile2'],
});