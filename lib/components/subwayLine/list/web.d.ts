/// <reference types="react" />
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'area', true, {
    pagination: {
        pageSize: number;
        total: number;
        currentPage: number;
    };
    subways: EntityDict['subway']['Schema'][];
    areas: EntityDict['area']['Schema'][];
    stations: {
        label: string;
        value: string;
    }[];
    subwayId: string;
    areaId: string;
}, {
    getStations: (subwayId: string) => void;
    getSubways: (areaId: string) => void;
}>): JSX.Element;
