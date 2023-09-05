import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        stationId: {
            notNull: true,
            type: "ref",
            ref: "station"
        },
        subwayId: {
            notNull: true,
            type: "ref",
            ref: "subway"
        }
    },
    actionType: "crud",
    actions
};
