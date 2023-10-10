import { cloneDeep } from 'oak-domain/lib/utils/lodash';
export default OakComponent({
    isList: false,
    properties: {
        style: {},
        entity: '',
        entityId: '',
        name: '',
    },
    data: {
        initialStyle: {},
        dirty: false,
        currentStyle: {},
    },
    // listeners: {
    //     config(prev, next) {
    //         if (prev.config !== next.config) {
    //             const config2 = next.config || {};
    //             this.setState({
    //                 initialConfig: config2,
    //                 dirty: false,
    //                 currentConfig: cloneDeep(config2),
    //             });
    //         }
    //     },
    // },
    lifetimes: {
        ready() {
            const { style } = this.props;
            this.setState({
                initialStyle: style,
                dirty: false,
                currentStyle: cloneDeep(style),
            });
        }
    },
    methods: {
        setValue(newStyle) {
            const newStyle2 = cloneDeep(newStyle || {});
            this.setState({
                currentStyle: newStyle2,
                dirty: true,
            });
        },
        // cleanKey(path: string, key: string) {   
        //     const { currentConfig } = this.state;
        //     const obj = get(currentConfig, path);
        //     const obj2 = omit(obj, [key]);
        //     set(currentConfig, path, obj2);
        //     const newConfig = cloneDeep(currentConfig);
        //     this.setState({
        //         currentConfig: newConfig,
        //         dirty: true,
        //     });
        // },
        // removeItem(path: string, index: number) {
        //     const { currentConfig } = this.state;
        //     const array = get(currentConfig, path);
        //     (array as any[]).splice(index, 1);
        //     const newConfig = cloneDeep(currentConfig || {});
        //     this.setState({
        //         currentConfig: newConfig,
        //         dirty: true,
        //     });
        // },
        resetStyle() {
            const { initialStyle } = this.state;
            this.setState({
                dirty: false,
                currentStyle: cloneDeep(initialStyle),
            });
        },
        async updateStyle() {
            const { currentStyle } = this.state;
            const { entity, entityId } = this.props;
            await this.features.style2.updateStyle(entity, entityId, currentStyle);
            this.setMessage({
                content: '操作成功',
                type: 'success',
            });
            this.setState({
                dirty: false,
            });
        },
    },
});
