"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IActionDef = {
    stm: {
        confirm: ['init', 'expire'],
    },
    is: 'init'
};
const indexes = [
    {
        name: 'index_entity_entityId',
        attributes: [
            {
                name: 'entity',
            },
            {
                name: 'entityId',
            },
        ],
    },
    {
        name: 'index_uuid',
        attributes: [
            {
                name: 'uuid',
            },
        ],
    },
];
