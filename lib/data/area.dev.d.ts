declare const area: ({
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
export { area, };
