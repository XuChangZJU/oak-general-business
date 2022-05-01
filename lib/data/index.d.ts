declare const _default: {
    user: import("oak-app-domain/User/Schema").CreateOperationData[];
    role: import("oak-app-domain/Role/Schema").CreateOperationData[];
    area: ({
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
    } | {
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
        code: number;
        level: string;
        parentId: string;
        name: string;
        depth: number;
        id: number;
        center: {
            type: string;
            coordinate: number[];
        };
    })[];
};
export default _default;
