import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
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
    nameRequired: boolean;
}, {
    search: (value: string) => void;
    setPeriod: (period: number) => void;
    confirm: () => void;
    setInit: () => void;
    onSearch: (value: string) => void;
    onSelect: (value: string) => void;
    setSearchValue: (value: string) => void;
}>): React.JSX.Element;
