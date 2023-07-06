import React from "react";
import { Button, Space, Form, Tooltip, Row, Col, Select, Input } from "antd";
import Style from "./web.module.less";
import PageHeader from "../../../components/common/pageHeader";
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
import CommonStyle from "@project/config/styles/web/common.module.less";
import classNames from "classnames";
import OakGallery from "../../../components/extraFile/gallery";

export default function render(
	props: WebComponentProps<
		EntityDict,
		"articleMenu",
		false,
		{
			name: string;
			parentId: string;
			parentName: string;
		},
		{
			confirm: () => void;
			reset: () => void;
		}
	>
) {
	const { data, methods } = props;
	const { t, update, reset, confirm } = methods;
	const { name, parentId, parentName, oakFullpath } = data;

	return (
		<PageHeader showBack={true} title="添加文章分类">
			<div
				className={classNames(
					CommonStyle.pageWithPadding,
					CommonStyle.pageWithColor
				)}
			>
				<Row>
					<Col xs={24} sm={16}>
						<Form colon labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
							{parentId ? (
								<>
									<Form.Item label={t("articleMenu:attr.parent")} name="parent">
										<Tooltip>{parentName}</Tooltip>
									</Form.Item>
									<Form.Item
										label={"分类名称"}
										rules={[
											{
												required: true,
												message: "分类名称必填",
											},
										]}
									>
										<>
											<Input
												placeholder="请输入分类名称"
												onChange={(e) => {
													update({
														name: e.target.value,
													});
												}}
												value={name}
											/>
										</>
									</Form.Item>
									<Form.Item
										label="LOGO"
										help={
											<div className={Style.help}>
												<span>请上传LOGO高清图片，</span>
												<span>
													108*108像素，仅支持PNG、JPG格式，大小不超过300KB。
												</span>
											</div>
										}
									>
										<>
											<OakGallery
												oakPath={
													oakFullpath
														? `${oakFullpath}.extraFile$entity$1`
														: undefined
												}
												type="image"
												origin="qiniu"
												tag1="logo"
												entity="articleMenu"
												accept=".PNG, .JPG"
												maxNumber={1}
											/>
										</>
									</Form.Item>
								</>
							) : (
								<>
									<Form.Item
										label={"分类名称"}
										rules={[
											{
												required: true,
												message: "分类名称必填",
											},
										]}
									>
										<>
											<Input
												placeholder="请输入分类名称"
												onChange={(e) => {
													update({
														name: e.target.value,
													});
												}}
												value={name}
											/>
										</>
									</Form.Item>
                  <Form.Item
                    label="LOGO"
                    help={
                        <div className={Style.help}>
                            <span>请上传LOGO高清图片，</span>
                            <span>
                                108*108像素，仅支持PNG、JPG格式，大小不超过300KB。
                            </span>
                        </div>
                    }
                >
                    <>
                        <OakGallery
                            oakPath={
                                oakFullpath
                                    ? `${oakFullpath}.extraFile$entity$1`
                                    : undefined
                            }
                            type="image"
                            origin="qiniu"
                            tag1="logo"
                            entity="articleMenu"
                            accept=".PNG, .JPG"
                            maxNumber={1}
                        />
                    </>
                </Form.Item>
								</>
							)}
							<Form.Item wrapperCol={{ offset: 4 }}>
								<Space>
									<Button
                                        disabled={!data.oakDirty || data.oakExecuting}
										type="primary"
										onClick={() => {
											confirm();
										}}
									>
										提交
									</Button>
									<Button
										onClick={() => {
											reset();
										}}
									>
										重置
									</Button>
								</Space>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</div>
		</PageHeader>
	);
}
