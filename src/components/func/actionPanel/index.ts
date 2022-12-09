export default OakComponent({
    isList: false,
    properties: {
        actions: Array,
        actionDescriptions: Object,
        show: {
            type: Boolean,
            value: false,
        },
    },
    methods: {
        onClick(action: string) {
            const { onActionClick } = this.props;
            onActionClick(action);
        },
    },

    observers: {
        actions(actions) {
            const { actionDescriptions } = this.props;

            const actionss = actions.map(
                (action: string) => Object.assign({}, actionDescriptions[action], { action })
            );

            this.setState({ actionss });
        },
    },

    lifetimes: {
        ready() {
            const { actions, actionDescriptions } = this.props;

            if (actions) {
                const actionss = actions.map(
                    (action: string) => Object.assign({}, actionDescriptions[action], { action })
                );
                this.setState({ actionss });
            }
        }
    }
});
