import React from 'react';
import { Config } from '../../../../types/Config';
export default function Sms(props: {
    sms: Required<Config>['Sms'];
    setValue: (path: string, value: any) => void;
    removeItem: (path: string, index: number) => void;
    cleanKey: (path: string, key: string) => void;
}): React.JSX.Element;
