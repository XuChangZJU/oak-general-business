import './index.less';
declare enum ECode {
    forbidden = 403,
    notFount = 404,
    error = 500
}
interface IErrorPageProps {
    code: ECode;
    title?: string;
    desc?: string;
}
declare function ErrorPage(props: IErrorPageProps): JSX.Element;
export default ErrorPage;
