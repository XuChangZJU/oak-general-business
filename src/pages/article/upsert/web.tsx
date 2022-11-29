import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { useState } from 'react';
import { Alert, Card, Button, Row, Col, Space, Affix, Input } from 'antd';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IToolbarConfig } from '@wangeditor/editor';
import OakGallery from './../../../components/extraFile/gallery';
import { EntityDict } from './../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';


import Style from './web.module.less';

type InsertFnType = (url: string, alt?: string, href?: string) => void;
type InsertVideoFnType = (url: string, poster?: string) => void;

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: ['fullScreen'],
}; // TS 语法

// 自定义校验图片
function customCheckImageFn(
    src: string,
    alt: string,
    url: string
): boolean | undefined | string {
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

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'article',
        false,
        {
            editor: any;
            title?: string;
            author?: string;
            abstract?: string;
            content?: string;
            html?: string;
            origin?: string;
            contentTip: boolean;
        },
        {
            setHtml: (content: string) => void;
            setEditor: (editor: any) => void;
            confirm: () => void;
            preview: () => void;
            addExtraFile: (
                file: EntityDict['extraFile']['CreateSingle']['data']
            ) => Promise<void>;
            uploadFile: (
                file: EntityDict['extraFile']['CreateSingle']['data']
            ) => Promise<{ bucket: string; url: string }>;
            clearContentTip: () => void;
        }
    >
) {
    const { methods: method, data } = props;
    const {
        t,
        setEditor,
        confirm,
        preview,
        addExtraFile,
        uploadFile,
        update,
        setHtml,
    } = method;
    const { editor, origin, oakFullpath } = data;

    return (
        <div className={Style.container}>
            <Affix offsetTop={64}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                />
            </Affix>

            <Row>
                <Col flex={4} />

                <Col flex={16}>
                    <div className={Style.content}>
                        <div className={Style.editorContainer}>
                            <div className={Style.titleContainer}>
                                <Input
                                    onChange={(e) =>
                                        update({ title: e.target.value })
                                    }
                                    value={data.title}
                                    placeholder={t('placeholder.title')}
                                    size="large"
                                    maxLength={64}
                                    suffix={`${
                                        [...(data.title || '')].length
                                    }/64`}
                                    className={Style.titleInput}
                                />
                            </div>
                            <div className={Style.authorContainer}>
                                <Input
                                    onChange={(e) =>
                                        update({ author: e.target.value })
                                    }
                                    value={data.author}
                                    placeholder={t('placeholder.author')}
                                    className={Style.input}
                                    maxLength={16}
                                />
                            </div>
                            {data.contentTip && (
                                <Alert
                                    type="info"
                                    message={t('tips.content')}
                                    closable
                                    onClose={() => method.clearContentTip()}
                                />
                            )}
                            <Editor
                                defaultConfig={{
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
                                            async customUpload(
                                                file: File,
                                                insertFn: InsertFnType
                                            ) {
                                                // TS 语法
                                                // file 即选oi中的文件
                                                const { name, size, type } =
                                                    file;
                                                const extension =
                                                    name.substring(
                                                        name.lastIndexOf('.') +
                                                            1
                                                    );
                                                const filename = name.substring(
                                                    0,
                                                    name.lastIndexOf('.')
                                                );
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
                                                } as any;

                                                try {
                                                    // 自己实现上传，并得到图片 url alt href
                                                    const { url, bucket } =
                                                        await uploadFile(
                                                            extraFile
                                                        );
                                                    extraFile.bucket = bucket;
                                                    extraFile.extra1 = null;
                                                    await addExtraFile(
                                                        extraFile
                                                    );
                                                    // 最后插入图片
                                                    insertFn(
                                                        'http://' + url,
                                                        extraFile.filename
                                                    );
                                                } catch (err) {}
                                            },
                                        },
                                        uploadVideo: {
                                            // 自定义上传
                                            async customUpload(
                                                file: File,
                                                insertFn: InsertVideoFnType
                                            ) {
                                                // TS 语法
                                                // file 即选中的文件
                                                const { name, size, type } =
                                                    file;
                                                const extension =
                                                    name.substring(
                                                        name.lastIndexOf('.') +
                                                            1
                                                    );
                                                const filename = name.substring(
                                                    0,
                                                    name.lastIndexOf('.')
                                                );
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
                                                } as any;

                                                try {
                                                    // 自己实现上传，并得到图片 url alt href
                                                    const { url, bucket } =
                                                        await uploadFile(
                                                            extraFile
                                                        );
                                                    extraFile.bucket = bucket;
                                                    extraFile.extra1 = null;
                                                    await addExtraFile(
                                                        extraFile
                                                    );
                                                    // 最后插入图片
                                                    insertFn(
                                                        'http://' + url,
                                                        'http://' +
                                                            url +
                                                            '?vframe/jpg/offset/0'
                                                    );
                                                } catch (err) {}
                                            },
                                        },
                                    },
                                }}
                                value={data.content}
                                onCreated={setEditor}
                                onChange={(editor) => {
                                    setHtml(editor.getHtml());
                                }}
                                mode="default"
                                style={{
                                    minHeight: '520px',
                                    overflowY: 'hidden',
                                }}
                            />
                            <div className={Style.abstract}>
                                <Card
                                    title="封面及摘要"
                                    bordered={false}
                                    className={Style.card}
                                >
                                    <Row>
                                        <Col flex="none">
                                            <OakGallery
                                                maxNumber={1}
                                                oakPath={
                                                    oakFullpath
                                                        ? `${oakFullpath}.extraFile$entity`
                                                        : undefined
                                                }
                                                oakFilters={[
                                                    {
                                                        tag1: {
                                                            $in: ['cover'],
                                                        },
                                                    },
                                                ]}
                                                type="image"
                                                origin="qiniu"
                                                tag1="cover"
                                                entity="article"
                                            ></OakGallery>
                                        </Col>
                                        <Col flex="auto">
                                            <Input.TextArea
                                                autoSize={{
                                                    minRows: 4,
                                                }}
                                                maxLength={120}
                                                placeholder={t(
                                                    'placeholder.abstract'
                                                )}
                                                onChange={(e) =>
                                                    update({
                                                        abstract:
                                                            e.target.value,
                                                    })
                                                }
                                                value={data.abstract || ''}
                                            ></Input.TextArea>
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                            <div className={Style.footer}>
                                <Row align="middle">
                                    <Col flex="auto">
                                        <div className={Style.contentNumber}>
                                            <span>正文字数 0</span>
                                        </div>
                                    </Col>
                                    <Col flex="none">
                                        <Space>
                                            <Button
                                                type="primary"
                                                onClick={() => {
                                                    confirm();
                                                }}
                                            >
                                                保存
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    preview();
                                                }}
                                            >
                                                预览
                                            </Button>
                                        </Space>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col flex={4} />
            </Row>
        </div>
    );
}
