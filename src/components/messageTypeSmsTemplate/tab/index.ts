import { EntityDict } from '../../../oak-app-domain';
import { getOrigin } from '../../../utils/sms/index';
export default OakComponent({
    isList: false,
    properties: {
        systemId: '' as string,
    },
    data: {
        originList: [] as string[],
    },
    lifetimes: {
        ready() {
            const originList = getOrigin();
            this.setState(
                {
                    originList
                }
            )
        },
    },
});
