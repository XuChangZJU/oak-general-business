import { appendOnlyActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        action: {
            notNull: true,
            type: "varchar",
            params: {
                length: 24
            }
        },
        data: {
            notNull: true,
            type: "object"
        },
        filter: {
            type: "object"
        },
        extra: {
            type: "object"
        },
        operatorId: {
            type: "ref",
            ref: "user"
        },
        targetEntity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        bornAt: {
            type: "datetime"
        }
    },
    actionType: "appendOnly",
    actions,
    indexes: [
        {
            name: 'index_bornAt_operatorId',
            attributes: [
                {
                    name: 'bornAt',
                    direction: 'DESC',
                },
                {
                    name: "operatorId",
                },
            ]
        }
    ]
};
