import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { Alert, Card, Button, Row, Col, Space, Affix, Input } from 'antd';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import OakGallery from './../../../components/extraFile/gallery';
import Style from './web.module.less';
// 工具栏配置
const toolbarConfig = {
    excludeKeys: ['fullScreen'],
}; // TS 语法
// 自定义校验图片
function customCheckImageFn(src, alt, url) {
    // TS 语法
    if (!src) {
        return;
    }
    if (src.indexOf('http') !== 0) {
        return '图片网址必须以 http/https 开头';
    }
    return true;
    // 返回值有三种选择：
    // 1. 返回 true ，说明检查通过，编辑器将正常插入图片
    // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
    // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
}
export default function Render(props) {
    const { methods: method, data } = props;
    const { t, setEditor, confirm, preview, addExtraFile, uploadFile, update, setHtml, } = method;
    const { editor, origin, oakFullpath } = data;
    return (_jsxs("div", { className: Style.container, children: [_jsx(Affix, { offsetTop: 64, children: _jsx(Toolbar, { editor: editor, defaultConfig: toolbarConfig, mode: "default" }) }), _jsxs(Row, { children: [_jsx(Col, { flex: 4 }), _jsx(Col, { flex: 16, children: _jsx("div", { className: Style.content, children: _jsxs("div", { className: Style.editorContainer, children: [_jsx("div", { className: Style.titleContainer, children: _jsx(Input, { onChange: (e) => update({ title: e.target.value }), value: data.title, placeholder: t('placeholder.title'), size: "large", maxLength: 64, suffix: `${[...(data.title || '')].length}/64`, className: Style.titleInput }) }), _jsx("div", { className: Style.authorContainer, children: _jsx(Input, { onChange: (e) => update({ author: e.target.value }), value: data.author, placeholder: t('placeholder.author'), className: Style.input, maxLength: 16 }) }), data.contentTip && (_jsx(Alert, { type: "info", message: t('tips.content'), closable: true, onClose: () => method.clearContentTip() })), _jsx(Editor, { defaultConfig: {
                                            // TS 语法
                                            placeholder: t('placeholder.content'),
                                            MENU_CONF: {
                                                // fontSize: {
                                                //     fontSizeList: [
                                                //         '12px',
                                                //         '16px',
                                                //         '24px',
                                                //         '40px',
                                                //     ],
                                                // },
                                                checkImage: customCheckImageFn,
                                                uploadImage: {
                                                    // 自定义上传
                                                    async customUpload(file, insertFn) {
                                                        // TS 语法
                                                        // file 即选oi中的文件
                                                        const { name, size, type } = file;
                                                        const extension = name.substring(name.lastIndexOf('.') +
                                                            1);
                                                        const filename = name.substring(0, name.lastIndexOf('.'));
                                                        const extraFile = {
                                                            extra1: file,
                                                            origin: origin,
                                                            type: 'image',
                                                            tag1: 'source',
                                                            objectId: generateNewId(),
                                                            filename,
                                                            size,
                                                            extension,
                                                            bucket: '',
                                                            id: generateNewId(),
                                                        };
                                                        try {
                                                            // 自己实现上传，并得到图片 url alt href
                                                            const { url, bucket } = await uploadFile(extraFile);
                                                            extraFile.bucket = bucket;
                                                            extraFile.extra1 = null;
                                                            await addExtraFile(extraFile);
                                                            // 最后插入图片
                                                            insertFn('http://' + url, extraFile.filename);
                                                        }
                                                        catch (err) { }
                                                    },
                                                },
                                                uploadVideo: {
                                                    // 自定义上传
                                                    async customUpload(file, insertFn) {
                                                        // TS 语法
                                                        // file 即选中的文件
                                                        const { name, size, type } = file;
                                                        const extension = name.substring(name.lastIndexOf('.') +
                                                            1);
                                                        const filename = name.substring(0, name.lastIndexOf('.'));
                                                        const extraFile = {
                                                            extra1: file,
                                                            origin: origin,
                                                            type: 'video',
                                                            tag1: 'source',
                                                            objectId: generateNewId(),
                                                            filename,
                                                            size,
                                                            extension,
                                                            bucket: '',
                                                            id: generateNewId(),
                                                        };
                                                        try {
                                                            // 自己实现上传，并得到图片 url alt href
                                                            const { url, bucket } = await uploadFile(extraFile);
                                                            extraFile.bucket = bucket;
                                                            extraFile.extra1 = null;
                                                            await addExtraFile(extraFile);
                                                            // 最后插入图片
                                                            insertFn('http://' + url, 'http://' +
                                                                url +
                                                                '?vframe/jpg/offset/0');
                                                        }
                                                        catch (err) { }
                                                    },
                                                },
                                            },
                                        }, value: data.content, onCreated: setEditor, onChange: (editor) => {
                                            setHtml(editor.getHtml());
                                        }, mode: "default", style: {
                                            minHeight: '520px',
                                            overflowY: 'hidden',
                                        } }), _jsx("div", { className: Style.abstract, children: _jsx(Card, { title: "\u5C01\u9762\u53CA\u6458\u8981", bordered: false, className: Style.card, children: _jsxs(Row, { children: [_jsx(Col, { flex: "none", children: _jsx(OakGallery, { maxNumber: 1, oakPath: oakFullpath
                                                                ? `${oakFullpath}.extraFile$entity`
                                                                : undefined, type: "image", origin: "qiniu", tag1: "cover", entity: "article" }) }), _jsx(Col, { flex: "auto", children: _jsx(Input.TextArea, { autoSize: {
                                                                minRows: 4,
                                                            }, maxLength: 120, placeholder: t('placeholder.abstract'), onChange: (e) => update({
                                                                abstract: e.target.value,
                                                            }), value: data.abstract || '' }) })] }) }) }), _jsx("div", { className: Style.footer, children: _jsxs(Row, { align: "middle", children: [_jsx(Col, { flex: "auto", children: _jsx("div", { className: Style.contentNumber, children: _jsx("span", { children: "\u6B63\u6587\u5B57\u6570 0" }) }) }), _jsx(Col, { flex: "none", children: _jsxs(Space, { children: [_jsx(Button, { type: "primary", onClick: () => {
                                                                    confirm();
                                                                }, children: "\u4FDD\u5B58" }), _jsx(Button, { onClick: () => {
                                                                    preview();
                                                                }, children: "\u9884\u89C8" })] }) })] }) })] }) }) }), _jsx(Col, { flex: 4 })] })] }));
}
