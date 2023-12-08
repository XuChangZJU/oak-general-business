"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../config/constants");
const assert_1 = require("oak-domain/lib/utils/assert");
const triggers = [
    {
        name: '当创建session时，通知订阅了sessionList变化的事件',
        entity: 'session',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context) => {
            const { data, id } = operation;
            (0, assert_1.assert)(!(data instanceof Array));
            const { userId } = data;
            (0, assert_1.assert)(userId);
            context.saveOperationToEvent(id, `${constants_1.DATA_SUBSCRIBER_KEYS.sessionList}-u-${userId}`);
            return 1;
        }
    }
];
