import React, { useState, } from "react";

import { Space, Spin, Modal, Form, Input, Empty, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Style from "./web.module.less";
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
import ImgBox from "oak-frontend-base/src/components/imgBox"

type MethodsType = 'original' | 'url' | 'uploadLocalImg';

export default function render(
	props: WebComponentProps<
		EntityDict,
		"extraFile",
		true,
		{
			src: string;
			bridgeUrl: string;
			renderImgUrl: string;
			isModalOpen: boolean;
			isModalOpen1: boolean;
			renderImgs: { renderUrl: string, originUrl: string, id: number }[];
			originImgLoading: boolean;
		},
		{
			onModalConfirm: (value: string) => void;
			chooseMethod: (method: MethodsType) => void;
			closeModal1: () => void;
			closeModal: () => void;
			onModal1Confirm: (value: number) => void;
		}
	>
) {
	const {
		isModalOpen,
		isModalOpen1,
		renderImgs,
		src,
		bridgeUrl,
		originImgLoading,
		renderImgUrl,
	} = props.data;
	const { t, onModalConfirm, chooseMethod, closeModal1, closeModal, onModal1Confirm } = props.methods;

	const methods: MethodsType[] = ['original', 'url', 'uploadLocalImg'];
	const [selectedId, setSelectedId] = useState(-1);
	const [form] = Form.useForm();

	const handleOk = () => {
		onModalConfirm(form.getFieldValue('url'));
		form.setFieldValue('url', '');
		closeModal();
	};
	return (
		<div className={Style.imgBox}>
			<Space direction="vertical" size={4}>
				<PlusOutlined />
				<div>选择封面</div>
			</Space>
			<img id="previewImg" src={renderImgUrl} alt="previewImg" className={Style.previewImg} style={{ display: renderImgUrl ? 'inline-block' : 'none'}} />
			<div className={Style.methodList}>
				{methods && methods.map((ele) => (
					<div
						className={Style.methodListItem}
						onClick={() => {
							chooseMethod(ele);
						}}
					>
						{t(ele)}
					</div>
				))}
			</div>
			<Modal
				title={t('fillInImageLink')}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={closeModal}
			>
				<Form
					form={form}
					className={Style.formMT}
				>
					<Form.Item
						name="url"
						rules={[
							{
								required: true,
								message: '外部链接不能为空',
							},
							{
								pattern: /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
								message: '请输入正确的外链',
							}
						]}
					>
						<Input
							onChange={({ target: { value } }) => {
								form.setFieldValue('url', value);
							}}
							placeholder='如：https://www.xxx.com'
						/>
					</Form.Item>
				</Form>
			</Modal>
			<Modal
				width={800}
				title={t('chooseImage')}
				open={isModalOpen1}
				onOk={() => onModal1Confirm(selectedId)}
				onCancel={closeModal1}
			>
				<Spin spinning={originImgLoading}>
					{(renderImgs && renderImgs.length) ? (
						<>
							<Row gutter={[4,4]}>
								{renderImgs.map((img: { renderUrl: string, originUrl: string, id: number }) => 
									<Col span={4}>
										<ImgBox
											width={"100%"}
											bordered={true}
											mode="select"
											src={img.renderUrl}
											key={img.id}
											selected={selectedId === img.id}
											onClick={() => {
												if (selectedId === img.id) {
													setSelectedId(-1);
												} else {
													setSelectedId(img.id);
												}
											}}
										/>
									</Col>
								)}
							</Row>
						</>
					) : (
						<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
					)}
				</Spin>
			</Modal>
		</div>
	);
}
