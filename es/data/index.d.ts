declare const _default: {
    user: import("../oak-app-domain/User/Schema").CreateOperationData[];
    mobile: import("../oak-app-domain/Mobile/Schema").CreateOperationData[];
    token: import("../oak-app-domain/Token/Schema").CreateOperationData[];
    area: ({
        code: string;
        level: string;
        parentId: string;
        name: string;
        depth: number;
        id: string;
        center: {
            type: string;
            coordinate: number[];
        };
    } | {
        code: string;
        level: string;
        parentId: null;
        name: string;
        depth: number;
        id: string;
        center: {
            type: string;
            coordinate: number[];
        };
    })[];
    subway: import("../oak-app-domain/Subway/Schema").CreateOperationData[];
    station: import("../oak-app-domain/Station/Schema").CreateOperationData[];
    subwayStation: import("../oak-app-domain/SubwayStation/Schema").CreateOperationData[];
    actionAuth: import("../oak-app-domain/ActionAuth/Schema").CreateOperationData[];
    path: import("../oak-app-domain/Path/Schema").CreateOperationData[];
    i18n: import("../oak-app-domain/I18n/Schema").CreateOperationData[];
};
export default _default;
