import React from 'react';
import { Style as StyleDef } from '../../../../types/Style';
import { EntityDict } from '../../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    entity: string;
    name: string;
    currentStyle: StyleDef;
    dirty: boolean;
}, {
    resetStyle: () => void;
    updateStyle: () => void;
    setValue: (style: StyleDef) => void;
}>): React.JSX.Element;
