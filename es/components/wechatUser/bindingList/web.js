import { jsx as _jsx } from "react/jsx-runtime";
import { Space } from 'antd';
import UnbindBtn from '../unbindBtn';
export default function Render(props) {
    const { wechatUsers, oakFullpath } = props.data;
    return (_jsx(Space, { children: wechatUsers && wechatUsers.map((ele) => (_jsx(UnbindBtn, { oakId: ele.id, oakPath: oakFullpath ? `${oakFullpath}.${ele.id}` : undefined }))) }));
}
