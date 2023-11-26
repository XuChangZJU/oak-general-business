import React from 'react';
import { Config } from '../../../../types/Config';
export default function Cos(props: {
    cos: Required<Config>['Cos'];
    setValue: (path: string, value: any) => void;
    removeItem: (path: string, index: number) => void;
}): React.JSX.Element;
