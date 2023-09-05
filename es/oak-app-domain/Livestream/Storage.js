import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        title: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        streamTitle: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        liveonly: {
            notNull: true,
            type: "enum",
            enumeration: ["online", "offline"]
        },
        hub: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        streamKey: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        entity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        entityId: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        rtmpPushUrl: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        rtmpPlayUrl: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        pcPushUrl: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        expireAt: {
            notNull: true,
            type: "datetime"
        }
    },
    actionType: "crud",
    actions
};
