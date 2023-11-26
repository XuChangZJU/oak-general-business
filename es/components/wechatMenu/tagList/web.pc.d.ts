import React from 'react';
import { EntityDict } from "../../../oak-app-domain";
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'wechatPublicTag', true, {
    rows: EntityDict['wechatPublicTag']['Schema'][];
    getTag: (data: {
        id: string;
        name: string;
        wechatId: string;
    }) => void;
}, {}>): React.JSX.Element;
