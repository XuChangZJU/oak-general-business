import { getOrigin } from '../../../utils/sms/index';
export default OakComponent({
    isList: false,
    properties: {
        systemId: '',
    },
    data: {
        originList: [],
    },
    lifetimes: {
        ready() {
            const originList = getOrigin();
            this.setState({
                originList
            });
        },
    },
});
