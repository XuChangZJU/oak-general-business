import React from 'react';
import './index.less';
declare enum ECode {
    forbidden = 403,
    notFount = 404,
    error = 500,
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
declare function ErrorPage(props: IErrorPageProps): JSX.Element;
export default ErrorPage;
