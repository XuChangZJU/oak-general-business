"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
exports.default = OakComponent({
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
    },
    methods: {
        getEfIds() {
            const { efPaths } = this.props;
            const { oakFullpath } = this.state;
            (0, assert_1.default)(efPaths);
            if (oakFullpath) {
                const ids = efPaths.map((path) => {
                    const path2 = path ? `${oakFullpath}.path` : oakFullpath;
                    const data = this.features.runningTree.getFreshValue(path2);
                    if (data) {
                        return data.map(ele => ele.id);
                    }
                }).flat().filter(ele => !!ele);
                return ids;
            }
            return [];
        },
        upload() {
        }
    }
});
