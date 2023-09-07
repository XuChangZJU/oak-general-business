import { jsx as _jsx } from "react/jsx-runtime";
import QrCode from '../../../components/common/qrCode';
export default function Render(props) {
    const { oakFullpath, qrCodeUrl, loading, successed, type } = props.data;
    return (_jsx("div", { children: _jsx(QrCode, { loading: loading, url: qrCodeUrl, disableDownload: true, tips: _jsx("div", { children: "\u5FAE\u4FE1\u626B\u4E00\u626B" }), successed: successed, type: type }) }));
}
