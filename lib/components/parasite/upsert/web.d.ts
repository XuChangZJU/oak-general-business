import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'parasite', false, {
    entity: keyof EntityDict;
    entityId: string;
    relation: string;
    period: number;
    parasiteId: string;
    options: {
        value: string;
    }[];
    nameLabel: string;
}, {
    search: (value: string) => void;
    setPeriod: (period: number) => void;
    confirm: () => void;
    setInit: () => void;
    onSearch: (value: string) => void;
    onSelect: (value: string) => void;
    setSearchValue: (value: string) => void;
}>): import("react/jsx-runtime").JSX.Element;
