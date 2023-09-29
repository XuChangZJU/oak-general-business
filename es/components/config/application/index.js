import { cloneDeep, set, get, omit } from 'oak-domain/lib/utils/lodash';
export default OakComponent({
    isList: false,
    properties: {
        config: {},
        entity: '',
        name: '',
        entityId: '',
        type: '',
        isService: true,
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
                if (!next.config || !next.config?.type) {
                    Object.assign(config2, {
                        type: this.props.type,
                    });
                }
                this.setState({
                    initialConfig: config2,
                    dirty: false,
                    currentConfig: cloneDeep(config2),
                });
            }
        },
    },
    lifetimes: {
        ready() {
            const { config } = this.props;
            this.setState({
                initialConfig: config,
                dirty: false,
                currentConfig: cloneDeep(config),
            });
        }
    },
    methods: {
        setValue(path, value) {
            const { currentConfig } = this.state;
            const newConfig = cloneDeep(currentConfig);
            set(newConfig, path, value);
            this.setState({
                currentConfig: newConfig,
                dirty: true,
            });
        },
        cleanKey(path, key) {
            const { currentConfig } = this.state;
            const obj = get(currentConfig, path);
            const obj2 = omit(obj, [key]);
            set(currentConfig, path, obj2);
            const newConfig = cloneDeep(currentConfig);
            this.setState({
                currentConfig: newConfig,
                dirty: true,
            });
        },
        removeItem(path, index) {
            const { currentConfig } = this.state;
            const array = get(currentConfig, path);
            array.splice(index, 1);
            const newConfig = cloneDeep(currentConfig);
            this.setState({
                currentConfig: newConfig,
                dirty: true,
            });
        },
        resetConfig() {
            const { initialConfig } = this.state;
            this.setState({
                dirty: false,
                currentConfig: cloneDeep(initialConfig),
            });
        },
        async updateConfig() {
            const { currentConfig } = this.state;
            const { entity, entityId } = this.props;
            await this.features.config.updateApplicationConfig(entity, entityId, currentConfig);
            this.setMessage({
                content: '操作成功',
                type: 'success',
            });
        },
    },
});
