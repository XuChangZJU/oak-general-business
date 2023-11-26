import { generateNewId } from "oak-domain/lib/utils/uuid";
import { useState, useEffect } from "react";
import { Alert, Button, Row, Col, Space, Input, } from "antd";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import Style from "./web.module.less";
import { EyeOutlined, } from "@ant-design/icons";
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
export default function Render(props) {
    const { methods: method, data } = props;
    const { t, setEditor, check, preview, uploadFile, update, setHtml, gotoPreview, } = method;
    const { id, content, editor, origin1, oakFullpath, html, oakId, articleMenuId, changeIsEdit, } = data;
    const [articleId, setArticleId] = useState('');
    useEffect(() => {
        if (id) {
            setArticleId(id);
        }
    }, [id]);
    return (<div className={Style.container}>
            <div style={{ width: 'calc(100% - 20px)' }}>
                <Toolbar editor={editor} defaultConfig={toolbarConfig} mode="default"/>
            </div>
            <Row>
                <Col flex={4}/>
                <Col flex={16}>
                    <div className={Style.content}>
                        <div className={Style.editorContainer}>
                            {data.contentTip && (<Alert type="info" message={t('tips.content')} closable onClose={() => method.clearContentTip()}/>)}
                            <div className={Style.titleContainer}>
                                <Input onChange={(e) => update({ name: e.target.value })} value={data.name} placeholder={'请输入文章标题'} size="large" maxLength={32} suffix={`${[...(data.name || '')].length}/32`} className={Style.titleInput}/>
                            </div>
                            <div className={Style.editorContent}>
                                <Editor defaultConfig={{
            autoFocus: true,
            placeholder: '请输入文章内容...',
            MENU_CONF: {
                checkImage: customCheckImageFn,
                uploadImage: {
                    // 自定义上传
                    async customUpload(file, insertFn) {
                        // TS 语法
                        // file 即选中的文件
                        const { name, size, type } = file;
                        const extension = name.substring(name.lastIndexOf('.') + 1);
                        const filename = name.substring(0, name.lastIndexOf('.'));
                        const extraFile = {
                            entity: 'article',
                            entityId: articleId,
                            origin: origin1,
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
                            const url = await uploadFile(extraFile, file);
                            // 最后插入图片
                            insertFn(url, extraFile.filename);
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
                        const extension = name.substring(name.lastIndexOf('.') + 1);
                        const filename = name.substring(0, name.lastIndexOf('.'));
                        const extraFile = {
                            entity: 'article',
                            entityId: articleId,
                            origin: origin1,
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
                            const url = await uploadFile(extraFile, file);
                            // 最后插入图片
                            insertFn(url, url +
                                '?vframe/jpg/offset/0');
                        }
                        catch (err) { }
                    },
                },
            },
        }} onCreated={setEditor} onChange={(editorDom) => {
            setHtml(editorDom.getHtml());
        }} style={{
            minHeight: 440,
        }} mode="default"/>
                            </div>
                            <div className={Style.footer}>
                                <Row align="middle">
                                    <Col flex="none">
                                        <Space>
                                            <Button disabled={!data.oakDirty ||
            data.oakExecuting} type="primary" onClick={() => {
            check();
        }}>
                                                保存
                                            </Button>
                                            <Button onClick={() => {
            gotoPreview(content, data.name);
        }}>
                                                <EyeOutlined />
                                                预览
                                            </Button>
                                        </Space>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col flex={4}/>
            </Row>
        </div>);
}
