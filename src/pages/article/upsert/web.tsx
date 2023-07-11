import { generateNewId } from "oak-domain/lib/utils/uuid";
import { useState, useRef, useEffect } from "react";
import {
	Alert,
	Card,
	Button,
	Row,
	Col,
	Space,
	Affix,
	Input,
	Modal,
} from "antd";
const { confirm } = Modal;
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IToolbarConfig } from "@wangeditor/editor";
import OakGallery from "./../../../components/extraFile/gallery";
import { EntityDict } from "./../../../general-app-domain";
import { WebComponentProps } from "oak-frontend-base";
import PageHeader from "../../../components/common/pageHeader";

import Style from "./web.module.less";
import useFeatures from "../../../hooks/useFeatures";
import {
	EyeOutlined,
} from "@ant-design/icons";

type InsertFnType = (url: string, alt?: string, href?: string) => void;
type InsertVideoFnType = (url: string, poster?: string) => void;

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
	excludeKeys: ["fullScreen"],
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
	if (src.indexOf("http") !== 0) {
		return "图片网址必须以 http/https 开头";
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
		"article",
		false,
		{
			id: string;
			name: string;
			editor: any;
			abstract?: string;
			content?: string;
			html?: string;
			origin?: string;
			contentTip: boolean;
			origin1: string;
		},
		{
			setHtml: (content: string) => void;
			setEditor: (editor: any) => void;
			check: () => void;
			preview: () => void;
			addExtraFile: (
				file: EntityDict["extraFile"]["CreateSingle"]["data"]
			) => Promise<void>;
			uploadFile: (
				file: EntityDict["extraFile"]["CreateSingle"]["data"]
			) => Promise<{ bucket: string; url: string }>;
			clearContentTip: () => void;
			onRemoveArticle: (id: string) => void;
			gotoPreview: (content?: string, title?: string) => void;
		}
	>
) {
	const { methods: method, data } = props;
	const {
		t,
		setEditor,
		check,
		preview,
		addExtraFile,
		uploadFile,
		update,
		setHtml,
		onRemoveArticle,
		gotoPreview
	} = method;
	const { id, content, editor, origin1, oakFullpath, html } = data;
	const features = useFeatures();
	const [articleId, setArticleId] = useState("");
	useEffect(() => {
		if (id) {
			setArticleId(id);
		}
	}, [id]);
	return (
    <PageHeader showBack={true} title="添加文章">
		<div className={Style.container}>
			<Affix offsetTop={64}>
				<Toolbar editor={editor} defaultConfig={toolbarConfig} mode="default" />
			</Affix>

			<Row>
				<Col flex={4} />

				<Col flex={16}>
					<div className={Style.content}>
						<div className={Style.editorContainer}>
							<div className={Style.titleContainer}>
								<Input
									onChange={(e) => update({ name: e.target.value })}
									value={data.name}
									placeholder={"请输入文章标题"}
									size="large"
									maxLength={64}
									suffix={`${[...(data.name || "")].length}/64`}
									className={Style.titleInput}
								/>
							</div>
							{data.contentTip && (
								<Alert
									type="info"
									message={t("tips.content")}
									closable
									onClose={() => method.clearContentTip()}
								/>
							)}
							<Editor
								defaultConfig={{
									placeholder: "请输入文章内容...",
									MENU_CONF: {
										checkImage: customCheckImageFn,
										uploadImage: {
											// 自定义上传
											async customUpload(file: File, insertFn: InsertFnType) {
												// TS 语法
												// file 即选中的文件
												const { name, size, type } = file;
												const extension = name.substring(
													name.lastIndexOf(".") + 1
												);
												const filename = name.substring(
													0,
													name.lastIndexOf(".")
												);
												const extraFile = {
													entity: "article",
													entityId: articleId,
													extra1: file as any,
													origin: origin1,
													type: "image",
													tag1: "source",
													objectId: generateNewId(),
													filename,
													size,
													extension,
													bucket: "",
													id: generateNewId(),
												} as EntityDict["extraFile"]["CreateSingle"]["data"];

												try {
													// 自己实现上传，并得到图片 url alt href
													const { url, bucket } =
														await features.extraFile.upload(extraFile);
													extraFile.bucket = bucket;
													extraFile.extra1 = null;
													await addExtraFile(extraFile);
													// 最后插入图片
													insertFn("http://" + url, extraFile.filename);
												} catch (err) {
													console.log(err);
												}
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
												const { name, size, type } = file;
												const extension = name.substring(
													name.lastIndexOf(".") + 1
												);
												const filename = name.substring(
													0,
													name.lastIndexOf(".")
												);
												const extraFile = {
													entity: "article",
													entityId: articleId,
													extra1: file as any,
													origin: origin1,
													type: "video",
													tag1: "source",
													objectId: generateNewId(),
													filename,
													size,
													extension,
													bucket: "",
													id: generateNewId(),
												} as EntityDict["extraFile"]["CreateSingle"]["data"];

												try {
													// 自己实现上传，并得到图片 url alt href
													const { url, bucket } =
														await features.extraFile.upload(extraFile);
													extraFile.bucket = bucket;
													extraFile.extra1 = null;
													await addExtraFile(extraFile);
													// 最后插入图片
													insertFn(
														"http://" + url,
														"http://" + url + "?vframe/jpg/offset/0"
													);
												} catch (err) { }
											},
										},
									},
								}}
								value={html}
								onCreated={setEditor}
								onChange={(editorDom: any) => {
									setHtml(editorDom.getHtml());
								}}

								style={{
									minHeight: 440,
								}}
								mode="default"
							/>
							<div className={Style.footer}>
								<Row align="middle">
									<Col flex="none">
										<Space>
											<Button
												type="primary"
												onClick={() => {
													check();
												}}
											>
												保存
											</Button>
											<Button
												onClick={() => {
													gotoPreview(content, data.name);
												}}
											>
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
				<Col flex={4} />
			</Row>
		</div>
    </PageHeader>
	);
}
