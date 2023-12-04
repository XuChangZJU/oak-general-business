import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        messageId: {
            type: "ref",
            ref: "message"
        },
        jump_wxa: {
            type: "object"
        },
        openlink: {
            type: "varchar",
            params: {
                length: 256
            }
        },
        expireType: {
            type: "int",
            params: {
                width: 1,
                signed: true
            }
        },
        expireInterval: {
            type: "int",
            params: {
                width: 2,
                signed: true
            }
        },
        expiresAt: {
            type: "datetime"
        },
        expired: {
            type: "boolean"
        }
    },
    actionType: "crud",
    actions,
    indexes: [
        {
            name: 'index_uuid',
            attributes: [
                {
                    name: 'expired',
                },
                {
                    name: 'expiresAt',
                },
            ],
        }
    ]
};
