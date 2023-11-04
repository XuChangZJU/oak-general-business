import { jsx as _jsx } from "react/jsx-runtime";
export default function Render(props) {
    const { userEntityGrant } = props.data;
    if (userEntityGrant) {
        return (_jsx("div", { children: userEntityGrant.id }));
    }
    return null;
}
