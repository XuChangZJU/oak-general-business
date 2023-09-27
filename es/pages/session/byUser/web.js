import { jsx as _jsx } from "react/jsx-runtime";
import SessionList from '../list';
export default function Render(props) {
    const { data } = props;
    const { oakFullpath } = data;
    return (_jsx(SessionList, { oakAutoUnmount: true, oakPath: oakFullpath ? `$$session-byUser/list` : undefined }));
}
