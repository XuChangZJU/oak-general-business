import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'platform',
        checker: (data) => {
            const setData = (data) => {
                if (!data.config) {
                    Object.assign(data, {
                        config: {},
                    });
                }
            };
            if (data instanceof Array) {
                data.forEach((ele) => {
                    checkAttributesNotNull('platform', ele, ['name']);
                    setData(ele);
                });
            }
            else {
                checkAttributesNotNull('platform', data, ['name']);
                setData(data);
            }
            return;
        },
    },
];
export default checkers;
