import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import { DataNode } from 'antd/es/tree';
export default function Render(props: WebComponentProps<EntityDict, 'subway', true, {
    treeData: DataNode[];
    areaId: string;
    areaOptions: {
        label: string;
        value: string;
    }[];
}, {
    setAreaId: (areaId: string) => void;
    setFilterByAreaId: (areaId: string) => void;
}>): JSX.Element;
