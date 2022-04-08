declare const _default: {
    userRole: import("../base-ed/UserRole/Schema").CreateOperationData[];
    user: import("../base-ed/User/Schema").CreateOperationData[];
    role: import("../base-ed/Role/Schema").CreateOperationData[];
    area: ({
        code: string;
        level: string;
        parentId: null;
        name: string;
        id: string;
        center: {
            type: string;
            coordinate: number[];
        };
    } | {
        code: string;
        level: string;
        parentId: string;
        name: string;
        id: string;
        center: {
            type: string;
            coordinate: number[];
        };
    } | {
        code: number;
        level: string;
        parentId: string;
        name: string;
        id: number;
        center: {
            type: string;
            coordinate: number[];
        };
    })[];
};
export default _default;
