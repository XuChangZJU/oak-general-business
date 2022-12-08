export default Component({
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
            this.onActionClick(action);
        },
    },

    observers: {
        actions(actions) {
            const { actionDescriptions } = this.data;

            const actionss = actions.map(
                (action: string) => Object.assign({}, actionDescriptions[action], { action })
            );

            this.setData({ actionss });
        },
    },

    lifetimes: {
        ready() {
            const { actions, actionDescriptions } = this.data;

            if (actions) {
                const actionss = actions.map(
                    (action: string) => Object.assign({}, actionDescriptions[action], { action })
                );
                this.setData({ actionss });
            }
        }
    }
});
