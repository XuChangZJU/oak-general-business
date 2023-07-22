declare const _default: {
    user: import("../general-app-domain/User/Schema").CreateOperationData[];
    mobile: import("../general-app-domain/Mobile/Schema").CreateOperationData[];
    token: import("../general-app-domain/Token/Schema").CreateOperationData[];
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
    subway: import("../general-app-domain/Subway/Schema").CreateOperationData[];
    station: import("../general-app-domain/Station/Schema").CreateOperationData[];
    subwayStation: import("../general-app-domain/SubwayStation/Schema").CreateOperationData[];
    actionAuth: import("../general-app-domain/ActionAuth/Schema").CreateOperationData[];
};
export default _default;
