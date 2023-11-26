import React from 'react';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: {
    data: EntityDict['domain']['OpSchema'];
    update: <T extends keyof EntityDict['domain']['OpSchema']>(attr: T, value: EntityDict['domain']['OpSchema'][T] | undefined) => void;
}): React.JSX.Element;
