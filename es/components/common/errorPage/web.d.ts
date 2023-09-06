import React from 'react';
import './web.less';
export declare enum ECode {
    forbidden = "403",
    notFound = "404",
    error = "500",
    networkError = "network-error",
    browserIncompatible = "browser-incompatible",
    maintenance = "maintenance"
}
interface IErrorPageProps {
    code: ECode;
    title?: string;
    desc?: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
}
declare function ErrorPage(props: IErrorPageProps): import("react/jsx-runtime").JSX.Element;
export default ErrorPage;
