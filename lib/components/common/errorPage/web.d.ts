import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import { ECode } from '../../../types/ErrorPage';
import './web.less';
interface IErrorPageProps {
    code: ECode;
    title?: string;
    desc?: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
}
export default function Render(props: WebComponentProps<EntityDict, keyof EntityDict, false, IErrorPageProps, {
    goBack: (delta?: number) => void;
}>): import("react/jsx-runtime").JSX.Element;
export {};
