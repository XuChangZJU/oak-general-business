"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("oak-domain/lib/utils/lodash");
exports.default = OakComponent({
    isList: false,
    properties: {
        config: {},
        entity: '',
        name: '',
        entityId: '',
    },
    data: {
        initialConfig: {},
        dirty: false,
        currentConfig: {},
    },
    listeners: {
        config(prev, next) {
            if (prev.config !== next.config) {
                const config2 = next.config || {};
                this.setState({
                    initialConfig: config2,
                    dirty: false,
                    currentConfig: (0, lodash_1.cloneDeep)(config2),
                });
            }
        },
    },
    methods: {
        setValue(path, value) {
            const { currentConfig } = this.state;
            const newConfig = (0, lodash_1.cloneDeep)(currentConfig || {});
            (0, lodash_1.set)(newConfig, path, value);
            this.setState({
                currentConfig: newConfig,
                dirty: true,
            });
        },
        cleanKey(path, key) {
            const { currentConfig } = this.state;
            const obj = (0, lodash_1.get)(currentConfig, path);
            const obj2 = (0, lodash_1.omit)(obj, [key]);
            (0, lodash_1.set)(currentConfig, path, obj2);
            const newConfig = (0, lodash_1.cloneDeep)(currentConfig);
            this.setState({
                currentConfig: newConfig,
                dirty: true,
            });
        },
        removeItem(path, index) {
            const { currentConfig } = this.state;
            const array = (0, lodash_1.get)(currentConfig, path);
            array.splice(index, 1);
            const newConfig = (0, lodash_1.cloneDeep)(currentConfig || {});
            this.setState({
                currentConfig: newConfig,
                dirty: true,
            });
        },
        resetConfig() {
            const { initialConfig } = this.state;
            this.setState({
                dirty: false,
                currentConfig: (0, lodash_1.cloneDeep)(initialConfig),
            });
        },
        async updateConfig() {
            const { currentConfig } = this.state;
            const { entity, entityId } = this.props;
            await this.features.config.updateConfig(entity, entityId, currentConfig);
            this.setMessage({
                content: '操作成功',
                type: 'success',
            });
        },
    },
});
