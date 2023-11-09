import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Style from './web.module.less';
export default function render(props) {
    const { methods, data } = props;
    const { t } = methods;
    const { title, author, abstract, content } = data;
    return (_jsx("div", { className: Style.container, children: _jsx("div", { className: Style.content, children: _jsxs("div", { className: Style.editorContainer, children: [_jsx("div", { className: Style.titleContainer, children: _jsx("span", { className: Style.title, children: title }) }), _jsx("div", { className: Style.authorContainer, children: _jsx("span", { className: Style.author, children: author }) }), _jsx("div", { id: "article-content" })] }) }) }));
}
