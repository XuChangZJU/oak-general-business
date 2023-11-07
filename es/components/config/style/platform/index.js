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
        setValue(style) {
            const newStyle = cloneDeep(style || {});
            this.setState({
                currentStyle: newStyle,
                dirty: true,
            });
        },
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
            await this.features.config.updateStyle(entity, entityId, currentStyle);
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
