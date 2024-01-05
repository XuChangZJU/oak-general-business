import { EntityDict } from '../../../oak-app-domain';

type Origin = 'ali' | 'tencent' | 'ctyun';

export default OakComponent({
    isList: false,
    properties: {
        systemId: '' as string,
    },
    data: {
        originList: ['ali', 'tencent', 'ctyun'] as Origin[],
    },
});
