import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'system',
        checker: (data) => {
            const setData = (data) => {
                if (!data.config) {
                    Object.assign(data, {
                        config: {},
                    });
                }
                if (!data.super) {
                    Object.assign(data, {
                        super: false,
                    });
                }
            };
            if (data instanceof Array) {
                data.forEach((ele) => {
                    checkAttributesNotNull('system', ele, ['name', 'platformId']);
                    setData(ele);
                });
            }
            else {
                checkAttributesNotNull('system', data, ['name', 'platformId']);
                setData(data);
            }
            return;
        },
    },
];
export default checkers;
