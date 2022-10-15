declare const _default: {
    user: import("../general-app-domain/User/Schema").CreateOperationData[];
    role: import("../general-app-domain/Role/Schema").CreateOperationData[];
    mobile: import("../general-app-domain/Mobile/Schema").CreateOperationData[];
    token: import("../general-app-domain/Token/Schema").CreateOperationData[];
    application: import("../general-app-domain/Application/Schema").CreateOperationData[];
    system: import("../general-app-domain/System/Schema").CreateOperationData[];
    platform: import("../general-app-domain/Platform/Schema").CreateOperationData[];
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
};
export default _default;
