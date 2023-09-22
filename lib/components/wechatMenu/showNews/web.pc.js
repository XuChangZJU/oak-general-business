"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { news } = props.data;
    return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: news && news.length > 1 ?
            (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.multiNews, children: news.map((ele, index) => {
                    if (index === 0) {
                        return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.cover, children: [(0, jsx_runtime_1.jsx)("img", { className: web_module_less_1.default.img, src: ele.coverUrl }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.articleTitle, children: ele.title })] }));
                    }
                    else {
                        return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.newsItem, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.articleTitle, children: ele.title }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.imgCover, children: (0, jsx_runtime_1.jsx)("img", { className: web_module_less_1.default.img, src: ele.coverUrl }) })] }));
                    }
                }) })
            :
                (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.singleNews, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.cover, children: (0, jsx_runtime_1.jsx)("img", { className: web_module_less_1.default.img, src: news?.[0]?.coverUrl }) }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.articleTitle, children: news?.[0]?.title })] }) }));
}
exports.default = Render;
