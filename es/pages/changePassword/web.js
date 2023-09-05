import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import Style from './web.module.less';
import ChangePassword from '../../components/changePassword';
export default function render(props) {
    const { showBack, userId, currentUserId } = props.data;
    return ((userId || currentUserId) ? _jsx("div", { className: Style.container, children: _jsx(ChangePassword, { oakId: userId || currentUserId, oakPath: "$changePassword-component", oakAutoUnmount: true }) }) : _jsx(_Fragment, {}));
}
