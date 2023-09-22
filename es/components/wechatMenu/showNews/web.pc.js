import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Style from './web.module.less';
export default function Render(props) {
    const { news } = props.data;
    return (_jsx("div", { className: Style.container, children: news && news.length > 1 ?
            _jsx("div", { className: Style.multiNews, children: news.map((ele, index) => {
                    if (index === 0) {
                        return (_jsxs("div", { className: Style.cover, children: [_jsx("img", { className: Style.img, src: ele.coverUrl }), _jsx("div", { className: Style.articleTitle, children: ele.title })] }));
                    }
                    else {
                        return (_jsxs("div", { className: Style.newsItem, children: [_jsx("div", { className: Style.articleTitle, children: ele.title }), _jsx("div", { className: Style.imgCover, children: _jsx("img", { className: Style.img, src: ele.coverUrl }) })] }));
                    }
                }) })
            :
                _jsxs("div", { className: Style.singleNews, children: [_jsx("div", { className: Style.cover, children: _jsx("img", { className: Style.img, src: news?.[0]?.coverUrl }) }), _jsx("div", { className: Style.articleTitle, children: news?.[0]?.title })] }) }));
}
