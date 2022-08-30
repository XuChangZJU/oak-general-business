import React from 'react';
import {
    Button,
    Row,
    Col,
    Input,
    Space,
    Textarea,
    Card,
    Alert,
} from 'tdesign-react';
import OakGallery from './../../../components/extraFile/gallery';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import {
    IToolbarConfig,
} from '@wangeditor/editor';
import { DeduceCreateOperationData } from 'oak-domain/lib/types';
import { EntityDict } from './../../../general-app-domain';

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

export default function render(this: any) {
    const { t, features, addExtraFile } = this;
    const {
        editor,
        title,
        author,
        abstract,
        content,
        html,
        origin,
        contentTip,
    } = this.state;

    return (
        <div className={Style.container}>
            <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                // style={{ borderBottom: '1px solid #ccc' }}
            />
            <Row>
                <Col flex={2} />

                <Col flex={8}>
                    <div className={Style.content}>
                        <div className={Style.editorContainer}>
                            <div className={Style.titleContainer}>
                                <Input
                                    onChange={(value) => {
                                        this.setUpdateData('title', value);
                                    }}
                                    value={title}
                                    placeholder={t('placeholder.title')}
                                    size="large"
                                    maxlength={64}
                                    suffix={`${[...(title || '')].length}/64`}
                                    inputClass={[Style.input, Style.titleInput]}
                                />
                            </div>
                            <div className={Style.authorContainer}>
                                <Input
                                    onChange={(value) => {
                                        this.setUpdateData('author', value);
                                    }}
                                    value={author}
                                    placeholder={t('placeholder.author')}
                                    inputClass={[Style.input]}
                                />
                            </div>
                            {contentTip && (
                                <Alert
                                    theme="info"
                                    message={t('tips.content')}
                                    close
                                    onClose={() => {
                                        this.setState({
                                            contentTip: false,
                                        });
                                    }}
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
                                                    type: 'image',
                                                    tag1: 'source',
                                                    objectId:
                                                        await generateNewId(),
                                                    filename,
                                                    size,
                                                    extension,
                                                    bucket: '',
                                                    id: await generateNewId(),
                                                } as DeduceCreateOperationData<
                                                    EntityDict['extraFile']['Schema']
                                                >;

                                                try {
                                                    // 自己实现上传，并得到图片 url alt href
                                                    const { url, bucket } =
                                                        await features.extraFile.upload(
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
                                                    objectId:
                                                        await generateNewId(),
                                                    filename,
                                                    size,
                                                    extension,
                                                    bucket: '',
                                                    id: await generateNewId(),
                                                } as DeduceCreateOperationData<
                                                    EntityDict['extraFile']['Schema']
                                                >;

                                                try {
                                                    // 自己实现上传，并得到图片 url alt href
                                                    const { url, bucket } =
                                                        await features.extraFile.upload(
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
                                value={html}
                                onCreated={this.setEditor}
                                onChange={(editor) => {
                                    this.setHtml(editor.getHtml());
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
                                    theme="normal"
                                    bordered={false}
                                >
                                    <Row>
                                        <Col flex="none">
                                            <OakGallery
                                                maxNumber={1}
                                                oakPath="extraFile$entity"
                                                oakParent={this.state.oakFullpath}
                                                type="image"
                                                origin="qiniu"
                                                tag1="cover"
                                                entity="article"
                                            ></OakGallery>
                                        </Col>
                                        <Col flex="auto">
                                            <Textarea
                                                autosize={{
                                                    minRows: 4,
                                                }}
                                                maxlength={120}
                                                placeholder={t(
                                                    'placeholder.abstract'
                                                )}
                                                onChange={(value) => {
                                                    this.setUpdateData(
                                                        'abstract',
                                                        value
                                                    );
                                                }}
                                                value={abstract || ''}
                                            ></Textarea>
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
                                                theme="success"
                                                onClick={() => {
                                                    this.confirm();
                                                }}
                                            >
                                                保存
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    this.preview();
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
                <Col flex={2} />
            </Row>
        </div>
    );
}
