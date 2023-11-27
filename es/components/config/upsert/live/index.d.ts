import React from 'react';
import { Config } from '../../../../types/Config';
export default function Cos(props: {
    live: Required<Config>['Live'];
    setValue: (path: string, value: any) => void;
}): React.JSX.Element;
