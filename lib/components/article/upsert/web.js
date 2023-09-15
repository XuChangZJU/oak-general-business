"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const uuid_1 = require("oak-domain/lib/utils/uuid");
const react_1 = require("react");
const antd_1 = require("antd");
require("@wangeditor/editor/dist/css/style.css"); // 引入 css
const editor_for_react_1 = require("@wangeditor/editor-for-react");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const icons_1 = require("@ant-design/icons");
// 工具栏配置
const toolbarConfig = {
    excludeKeys: ["fullScreen"],
}; // TS 语法
// 自定义校验图片
function customCheckImageFn(src, alt, url) {
    // TS 语法
    if (!src) {
        return;
    }
    if (src.indexOf("http") !== 0) {
        return "图片网址必须以 http/https 开头";
    }
    return true;
    // 返回值有三种选择：
    // 1. 返回 true ，说明检查通过，编辑器将正常插入图片
    // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
    // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
}
function Render(props) {
    const { methods: method, data } = props;
    const { t, setEditor, check, preview, addExtraFile, uploadFile, update, setHtml, gotoPreview, } = method;
    const { id, content, editor, origin1, oakFullpath, html, oakId, articleMenuId, changeIsEdit } = data;
    const [articleId, setArticleId] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        if (id) {
            setArticleId(id);
        }
    }, [id]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)("div", { style: { width: 'calc(100% - 20px)' }, children: (0, jsx_runtime_1.jsx)(editor_for_react_1.Toolbar, { editor: editor, defaultConfig: toolbarConfig, mode: "default" }) }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { flex: 4 }), (0, jsx_runtime_1.jsx)(antd_1.Col, { flex: 16, children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.content, children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.editorContainer, children: [data.contentTip && ((0, jsx_runtime_1.jsx)(antd_1.Alert, { type: "info", message: t("tips.content"), closable: true, onClose: () => method.clearContentTip() })), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.titleContainer, children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: (e) => update({ name: e.target.value }), value: data.name, placeholder: "请输入文章标题", size: "large", maxLength: 32, suffix: `${[...(data.name || "")].length}/32`, className: web_module_less_1.default.titleInput }) }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.editorContent, children: (0, jsx_runtime_1.jsx)(editor_for_react_1.Editor, { defaultConfig: {
                                                autoFocus: true,
                                                placeholder: "请输入文章内容...",
                                                MENU_CONF: {
                                                    checkImage: customCheckImageFn,
                                                    uploadImage: {
                                                        // 自定义上传
                                                        async customUpload(file, insertFn) {
                                                            // TS 语法
                                                            // file 即选中的文件
                                                            const { name, size, type } = file;
                                                            const extension = name.substring(name.lastIndexOf(".") + 1);
                                                            const filename = name.substring(0, name.lastIndexOf("."));
                                                            const extraFile = {
                                                                entity: "article",
                                                                entityId: articleId,
                                                                extra1: file,
                                                                origin: origin1,
                                                                type: "image",
                                                                tag1: "source",
                                                                objectId: (0, uuid_1.generateNewId)(),
                                                                filename,
                                                                size,
                                                                extension,
                                                                bucket: "",
                                                                id: (0, uuid_1.generateNewId)(),
                                                            };
                                                            try {
                                                                // 自己实现上传，并得到图片 url alt href
                                                                const { url, bucket } = await uploadFile(extraFile);
                                                                extraFile.bucket = bucket;
                                                                extraFile.extra1 = null;
                                                                // await addExtraFile(extraFile);
                                                                // 最后插入图片
                                                                insertFn("http://" + url, extraFile.filename);
                                                            }
                                                            catch (err) {
                                                            }
                                                        },
                                                    },
                                                    uploadVideo: {
                                                        // 自定义上传
                                                        async customUpload(file, insertFn) {
                                                            // TS 语法
                                                            // file 即选中的文件
                                                            const { name, size, type } = file;
                                                            const extension = name.substring(name.lastIndexOf(".") + 1);
                                                            const filename = name.substring(0, name.lastIndexOf("."));
                                                            const extraFile = {
                                                                entity: "article",
                                                                entityId: articleId,
                                                                extra1: file,
                                                                origin: origin1,
                                                                type: "video",
                                                                tag1: "source",
                                                                objectId: (0, uuid_1.generateNewId)(),
                                                                filename,
                                                                size,
                                                                extension,
                                                                bucket: "",
                                                                id: (0, uuid_1.generateNewId)(),
                                                            };
                                                            try {
                                                                // 自己实现上传，并得到图片 url alt href
                                                                const { url, bucket } = await uploadFile(extraFile);
                                                                extraFile.bucket = bucket;
                                                                extraFile.extra1 = null;
                                                                await addExtraFile(extraFile);
                                                                // 最后插入图片
                                                                insertFn("http://" + url, "http://" + url + "?vframe/jpg/offset/0");
                                                            }
                                                            catch (err) { }
                                                        },
                                                    },
                                                },
                                            }, onCreated: setEditor, onChange: (editorDom) => {
                                                setHtml(editorDom.getHtml());
                                            }, style: {
                                                minHeight: 440,
                                            }, mode: "default" }) }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.footer, children: (0, jsx_runtime_1.jsx)(antd_1.Row, { align: "middle", children: (0, jsx_runtime_1.jsx)(antd_1.Col, { flex: "none", children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { disabled: !data.oakDirty || data.oakExecuting, type: "primary", onClick: () => {
                                                                check();
                                                            }, children: "\u4FDD\u5B58" }), (0, jsx_runtime_1.jsxs)(antd_1.Button, { onClick: () => {
                                                                gotoPreview(content, data.name);
                                                            }, children: [(0, jsx_runtime_1.jsx)(icons_1.EyeOutlined, {}), "\u9884\u89C8"] })] }) }) }) })] }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { flex: 4 })] })] }));
}
exports.default = Render;
