import { cloneDeep, set, get } from 'oak-domain/lib/utils/lodash';
import { Config } from '../../../types/Config';

export default OakComponent({
    isList: false,
    properties: {
        config: Object,
        entity: String,
        name: String,
        entityId: String,
    },
    data: {
        initialConfig: {} as Config,
        dirty: false,
        currentConfig: {} as Config,
    },
    observers: {
        config(config: Config) {
            this.setState({
                initialConfig: config,
                dirty: false,
                currentConfig: cloneDeep(config),
            });
        },
    },
    methods: {
        setValue(path: string, value: any) {
            const { currentConfig } = this.state;
            const newConfig = cloneDeep(currentConfig || {});
            set(newConfig, path, value);
            this.setState({
                currentConfig: newConfig,
                dirty: true,
            });
        },

        removeItem(path: string, index: number) {
            const { currentConfig } = this.state;
            const array = get(currentConfig, path);
            (array as any[]).splice(index, 1);
            const newConfig = cloneDeep(currentConfig || {});
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

            await this.features.config.updateConfig(
                entity,
                entityId,
                currentConfig
            );
            this.setMessage({
                content: '操作成功',
                type: 'success',
            });
        },
    },
});
