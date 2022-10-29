"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./index.less");
function QrCode(props) {
    var _a = props.id, id = _a === void 0 ? 'login_qr_container' : _a, appId = props.appId, scope = props.scope, redirectUri = props.redirectUri, state = props.state, _b = props.style, style = _b === void 0 ? '' : _b, _c = props.href, href = _c === void 0 ? '' : _c;
    (0, react_1.useEffect)(function () {
        loadScript("".concat(window.location.protocol, "//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"), function () {
            // @ts-ignore
            new WxLogin({
                id: id,
                appid: appId,
                scope: scope,
                redirect_uri: redirectUri,
                state: state,
                style: style,
                href: href,
            });
        });
    }, []);
    function loadScript(url, callback) {
        var script = document.createElement('script');
        // @ts-ignore
        if (script.readyState) {
            // IE
            // @ts-ignore
            script.onreadystatechange = function () {
                if (
                // @ts-ignore
                script.readyState === 'loaded' ||
                    // @ts-ignore
                    script.readyState === 'complete') {
                    // @ts-ignore
                    script.onreadystatechange = null;
                    callback();
                }
            };
        }
        else {
            // 其他浏览器
            script.onload = function () {
                callback();
            };
        }
        script.type = 'text/javascript';
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    return (0, jsx_runtime_1.jsx)("div", { className: "oak-loginQrCode", id: id });
}
exports.default = QrCode;
