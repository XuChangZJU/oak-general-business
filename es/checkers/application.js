import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'application',
        checker: (data, context) => {
            const setData = (data) => {
                if (!data.config) {
                    Object.assign(data, {
                        config: {},
                    });
                }
            };
            if (data instanceof Array) {
                data.forEach((ele) => {
                    checkAttributesNotNull('application', ele, [
                        'name',
                        'type',
                        'systemId',
                    ]);
                    setData(ele);
                });
            }
            else {
                checkAttributesNotNull('application', data, [
                    'name',
                    'type',
                    'systemId',
                ]);
                setData(data);
            }
            return;
        },
    },
];
export default checkers;
