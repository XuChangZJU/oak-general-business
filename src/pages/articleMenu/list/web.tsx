import { Form, Tree, Row, Col, Space, Button, Menu, Modal, Image, Empty } from "antd";
const { confirm } = Modal;
import type { MenuProps } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames";
import Style from "./web.module.less";
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
import useFeatures from "../../../hooks/useFeatures";
import PageHeader from "../../../components/common/pageHeader";
import { Editor } from "@wangeditor/editor-for-react";
import { IEditorConfig } from "@wangeditor/editor";
import ArticleUpsert from "../../../components/article/detail";
import { EyeOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;
interface DataNode {
	label: string;
	title: string;
	key: string;
	isArticle?: boolean;
	children?: DataNode[];
}
export default function render(
	props: WebComponentProps<
		EntityDict,
		"articleMenu",
		true,
		{
			articleMenu: EntityDict["articleMenu"]["Schema"][];
			articles: EntityDict["article"]["Schema"][];
			treeData: DataNode[];
			content: string;
			arr: {
				id: string | undefined;
				name: string | undefined;
				parent: string | undefined;
				parentId: string | undefined;
				isArticle: boolean;
				isLeaf: boolean;
			}[];
			id: string;
			parentId: string;
			articleId: string;
			name: string;
			isArticle: boolean;
			isChildren: boolean;
			logo: string;
			title: string;
		},
		{
			gotoUpsert: (id?: string) => void;
			gotoUpsertById: (id: string) => void;
			gotoArticleUpsert: (articleId: string) => void;
			check: () => void;
			onRemoveArticleMenu: (id: string) => void;
			gotoEdit: (id?: string) => void;
			gotoEditByParentId: (parentId: string) => void;
			gotoArticleEdit: (articleId: string) => void;
			onRemoveArticle: (id: string) => void;
			gotoArticleEditByArticleMenuId: (articleMenuId: string) => void;
			gotoPreview: (content: string, title: string, articleId: string) => void;
			copy: (articleId: string) => void;
		}
	>
) {
	const {
		arr,
		treeData,
		id,
		parentId,
		articleId,
		name,
		content,
		oakFullpath,
		isArticle,
		isChildren,
		logo,
		title,
	} = props.data;
	const {
		t,
		gotoUpsert,
		gotoUpsertById,
		gotoArticleUpsert,
		onRemoveArticleMenu,
		gotoEdit,
		gotoEditByParentId,
		gotoArticleEdit,
		onRemoveArticle,
		gotoArticleEditByArticleMenuId,
		gotoPreview,
		copy
	} = props.methods;
	const features = useFeatures();
	const editorConfig: Partial<IEditorConfig> = {
		readOnly: true,
		autoFocus: true,
		scroll: false,
	};
	const renderMenuItems = (data: any) => {
		return data?.map((menuItem: any) => {
			if (menuItem.children || menuItem.isLeaf) {
				return (
					<Menu.SubMenu
						icon={
							menuItem.logo ? (
								<Image
									height={26}
									width={26}
									src={menuItem.logo}
									preview={false}
								/>
							) : null
						}
						key={menuItem.key}
						title={<div style={{ marginLeft: 8 }}>{menuItem.title}</div>}
						onTitleClick={(e) => {
							gotoUpsertById(e.key);
						}}
					>
						{renderMenuItems(menuItem.children)}
					</Menu.SubMenu>
				);
			}
			return (
				<Menu.Item
					key={menuItem.key}
					onClick={(e) => {
						gotoArticleUpsert(e.key);
					}}
				>
					{menuItem.label}
				</Menu.Item>
			);
		});
	};
	return (
		<PageHeader title="分类管理">
			<div className={Style.container}>
				<div className={Style.space}>
					<Button
						type="primary"
						onClick={() => {
							gotoEdit();
						}}
					>
						新增
					</Button>
					{articleId && (
						<Space>
							<Button
								onClick={() => {
									copy(articleId);
								}}
							>
								复制链接
							</Button>
							<Button
								onClick={() => {
									gotoPreview(content, title, articleId);
								}}
							>
								<EyeOutlined />
								查看
							</Button>
						</Space>
					)}
				</div>
				{
					treeData?.length === 0 ? (
						<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
					) : (
						<div className={Style.article}>
							<div className={Style.menu}>
								<Menu
									// onClick={(e) => gotoArticleUpsert(e.keyPath[1])}
									style={{ width: 256 }}
									mode="inline"
								// items={renderMenuItems(treeData)}
								>
									{renderMenuItems(treeData)}
								</Menu>
							</div>
							<div className={Style.editor}>
								{id?.length > 0 ? (
									<div className={Style.rightContainer}>
										<Row>
											<Col xs={24} sm={16}>
												<Form
													colon
													labelCol={{ span: 4 }}
													wrapperCol={{ span: 20 }}
												>
													<>
														<Form.Item
															label={'分类标题'}
															name="name"
														//  rules={[
														//      {
														//          required: true,
														//          message: '文章分类名称必填',
														//      },
														//  ]}
														>
															<>{`${name}`}</>
														</Form.Item>
														<Form.Item label="分类LOGO" name="extraFile$entity">
															<>
																{logo ? (
																	<Image src={logo} width={100} height={100} />
																) : (
																	"暂无图片"
																)}
															</>
														</Form.Item>
													</>

													<Form.Item wrapperCol={{ offset: 4 }}>
														<Space>
															<Button
																type="primary"
																onClick={() => {
																	gotoEdit(id);
																}}
															>
																编辑
															</Button>
															{!isArticle && (
																<Button
																	onClick={() => {
																		gotoEditByParentId(id);
																	}}
																>
																	添加子节点
																</Button>
															)}
															{!isArticle && (
																<Button
																	onClick={() => {
																		gotoArticleEditByArticleMenuId(id);
																	}}
																>
																	添加文章
																</Button>
															)}
															<Button
																type="link"
																onClick={() => {
																	const modal = confirm({
																		title: "确定删除该文章分类吗？",
																		content: "删除后不可恢复",
																		okText: "确定",
																		cancelText: "取消",
																		onOk: (e) => {
																			onRemoveArticleMenu(id);
																			modal!.destroy();
																		},
																	});
																}}
															>
																删除
															</Button>
														</Space>
													</Form.Item>
												</Form>
											</Col>
										</Row>
									</div>
								) : articleId?.length > 0 ? (
									<ArticleUpsert
										oakAutoUnmount={true}
										content={content}
										articleId={articleId}
										oakPath={`$article-detail-${articleId}`}
									/>
								) : (
									""
								)}
							</div>
						</div>
					)
				}


			</div>
		</PageHeader>
	);
}
