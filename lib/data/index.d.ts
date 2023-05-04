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
    freeActionAuth: import("../general-app-domain/FreeActionAuth/Schema").CreateOperationData[];
};
export default _default;
