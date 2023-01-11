export default OakComponent({
    isList: false,
    properties: {
        actions: Array,
        actionDescriptions: Object,
        iconSize: String,
        rowNum: {
            type: Number,
            value: 4,
        },
    },
    methods: {
        onClickMp(e: WechatMiniprogram.TouchEvent) {
            const { index } = e.detail;
            const action = this.props.actions[index];
            this.triggerEvent('action', { action });
        },
    },

    observers: {
        actions(actions) {
            const { actionDescriptions } = this.props;

            const actionss = actions.map((action: string) =>
                Object.assign({}, actionDescriptions[action], { action })
            );

            this.setState({ actionss });
        },
    },

    lifetimes: {
        ready() {
            const { actions, actionDescriptions } = this.props;

            if (actions) {
                const actionss = actions.map((action: string) =>
                    Object.assign({}, actionDescriptions[action], { action })
                );
                this.setState({ actionss });
            }
        },
    },
});
