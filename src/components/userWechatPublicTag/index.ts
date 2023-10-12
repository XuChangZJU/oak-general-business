
export default OakComponent({
    isList: false,
    properties: {
        applicationId: '',
    },
    lifetimes: {
        async ready() {
            const { applicationId } = this.props;
        }
    },
    methods: {
    },
});