import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'area', true, {
    subways: EntityDict['subway']['Schema'][];
    areas: EntityDict['area']['Schema'][];
    stations: {
        label: string;
        value: string;
    }[];
    areaId: string;
    stationIds: string[];
    selectIds: string[];
}, {
    getStations: (subwayId: string) => void;
    getSubways: (areaId: string) => void;
    setCheckedList: (station: string, flag: boolean) => void;
    cancel: () => void;
    confirm: () => void;
}>): import("react/jsx-runtime").JSX.Element;
