import React, { useState, useEffect, useCallback } from "react";

import { Space, Upload, UploadFile, Tag, Button, Table } from "antd";
import { Html5Filled, PlusOutlined } from "@ant-design/icons";
import { file2Obj } from "antd/es/upload/utils";
import { RcFile } from "antd/es/upload/interface";
import classNames from "classnames";
import Style from "./web.module.less";
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../oak-app-domain";
import useFeatures from "../../../hooks/useFeatures";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isPc } from "../../../../../oak-frontend-base/lib/utils/utils";

interface NewUploadFile extends UploadFile {
	id?: string;
}

type Theme = "file" | "image" | "image-flow" | "custom";
type ListType = "text" | "picture" | "picture-card";

function getListType(theme: Theme): ListType {
	const themeMap: Record<Theme, ListType> = {
		file: "text",
		image: "picture-card",
		"image-flow": "picture",
		custom: "text",
	};
	return themeMap[theme];
}

const type = "DragableUploadList";
const DragableUploadListItem = ({
	originNode,
	moveRow,
	file,
	fileList,
}: any) => {
	const ref = React.useRef(null);
	const index = fileList.indexOf(file);
	const [{ isOver, dropClassName }, drop] = useDrop({
		accept: type,
		collect: (monitor: any) => {
			const { index: dragIndex } = monitor.getItem() || {};
			if (dragIndex === index) {
				return {};
			}
			return {
				isOver: monitor.isOver(),
				dropClassName:
					dragIndex < index ? " drop-over-downward" : " drop-over-upward",
			};
		},
		drop: (item: any) => {
			moveRow(item.index, index);
		},
	});
	const [, drag] = useDrag({
		type,
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	drop(drag(ref));
	return (
		<div
			ref={ref}
			className={`ant-upload-draggable-list-item ${
				isOver ? dropClassName : ""
			}`}
			style={{ cursor: "move", height: "100%" }}
		>
			{originNode}
		</div>
	);
};

export default function render(
	props: WebComponentProps<
		EntityDict,
		"extraFile",
		true,
		{
			accept?: string;
			maxNumber?: number;
			multiple?: boolean;
			draggable?: boolean;
			theme?: Theme;
			tips?: string;
			beforeUpload?: (file: File) => Promise<boolean>;
			disabled?: boolean;
			style?: Record<string, string>;
			className?: string;
			directory?: boolean;
			onPreview?: (file: UploadFile<any>) => void;
			onDownload?: (file: UploadFile<any>) => void;
			showUploadList?: boolean;
			children?: JSX.Element;
			files?: EntityDict["extraFile"]["OpSchema"][];
			disableInsert?: boolean;
			disableAdd?: boolean;
			disableDownload?: boolean;
			disableDelete?: boolean;
			preview?: boolean;
		},
		{
			onPickByWeb: (
				files: UploadFile[],
				callback?: (file: any, status: string) => void
			) => void;
			onDeleteByWeb: (file: UploadFile) => void;
		}
	>
) {
	const {
		accept = "image/*",
		maxNumber = 20,
		multiple = maxNumber !== 1,
		draggable = false,
		theme = "image",
		tips,
		beforeUpload,
		disabled,
		style,
		className,
		directory = false,
		onPreview,
		onDownload,
		children,
		showUploadList = true,
		files,
		disableInsert = false,
		disableAdd = false,
		disableDownload = false,
		disableDelete = false,
		preview = true,
	} = props.data;
	const { onPickByWeb, onDeleteByWeb, updateItem, t } = props.methods;
	const features = useFeatures();

	const [newFiles, setNewFiles] = useState<
		EntityDict["extraFile"]["OpSchema"][]
	>([]);

	const [newUploadFiles, setNewUploadFiles] = useState<NewUploadFile[]>([]);

	const listType = getListType(theme);

	useEffect(() => {
		if (files && files.length > 0) {
			setNewFiles(files);
		} else {
			setNewFiles([]);
		}
	}, [files]);

	const extraFileToUploadFile = (
		extraFile: EntityDict["extraFile"]["OpSchema"]
	): NewUploadFile => {
		return {
			id: extraFile.id,
			url: features.extraFile.getUrl(extraFile),
			thumbUrl: features.extraFile.getUrl(extraFile),
			name: features.extraFile.getFileName(extraFile),
			fileName: features.extraFile.getFileName(extraFile),
			size: extraFile.size!,
			type: extraFile.fileType!,
			uid: extraFile.id, //upload 组件需要uid来维护fileList
			// status: 'done',
		};
	};

	const setNewUploadFilesByStatus = (
		file: EntityDict["extraFile"]["Schema"],
		status: string
	) => {
		const { filename, size, id } = file;
		const file2 = newUploadFiles.find(
			(ele: NewUploadFile) => ele.name?.includes(filename) && ele.size === size
		);
		if (file2) {
			Object.assign(file2, {
				status,
				id,
			});
		}

		setNewUploadFiles(newUploadFiles);
	};

	const customDelete = (index: number) => {
		const arr = [...newUploadFiles];
		arr.splice(index, 1);
		setNewUploadFiles(arr);
	};

	const getUploadButton = () => {
		if (children) {
			return children;
		}
		if (listType === "picture-card") {
			return (
				<div>
					<PlusOutlined />
					<div style={{ marginTop: 8 }}>请选择图片</div>
				</div>
			);
		}
		return <Button type="default">选择文件</Button>;
	};

	const checkLimit = (num: number) => {
		const pattern = /^\d+\.(?:9+)$/;
		return pattern.test(num.toString());
	};

	const moveRow = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			let dragRow = newFiles[dragIndex];
			let sort;
			if (hoverIndex === dragIndex) {
				return;
			} else if (hoverIndex > dragIndex) {
				if (hoverIndex === newFiles.length - 1) {
					sort = newFiles[hoverIndex]!.sort! + 100;
				} else {
					sort = (newFiles[hoverIndex]!.sort! + newFiles[hoverIndex + 1]!.sort!) / 2;
				}
			} else {
				if (hoverIndex === 0) {
					sort = newFiles[hoverIndex]!.sort! / 2;
				} else {
					sort = (newFiles[hoverIndex]!.sort! + newFiles[hoverIndex - 1]!.sort!) / 2;
				}
			}
			if (checkLimit(sort)) {
				alert("当前的sort值为:" + sort);
				return;
			}
			updateItem({ sort }, dragRow.id);
		},
		[newFiles]
	);

	return (
		<Space
			direction="vertical"
			className={Style["oak-upload"]}
			style={{ width: "100%" }}
		>
			<DndProvider backend={isPc ? HTML5Backend : TouchBackend}>
				<Upload
					className={classNames(Style["oak-upload__upload"], className)}
					style={style}
					disabled={disabled}
					directory={directory}
					showUploadList={
						showUploadList
							? {
									showPreviewIcon: preview,
									showRemoveIcon: !disableDelete,
									showDownloadIcon: !disableDownload,
							  }
							: false
					}
					beforeUpload={async (file) => {
						if (typeof beforeUpload === "function") {
							const result = await beforeUpload(file);
							if (result) {
								return false;
							}
						}
						return false;
					}}
					multiple={multiple}
					maxCount={maxNumber}
					accept={accept}
					listType={listType}
					fileList={
						theme === "custom"
							? []
							: newFiles?.map((ele) => extraFileToUploadFile(ele))
					}
					onChange={({ file, fileList, event }) => {
						// id不存在就是file对象
						if (!(file as NewUploadFile).id) {
							if (theme !== "custom") {
								onPickByWeb([file2Obj(file as RcFile)]);
							} else {
								setNewUploadFiles(fileList);
							}
						}
					}}
					onRemove={(file) => {
						onDeleteByWeb(file);
					}}
					onPreview={onPreview}
					onDownload={onDownload}
					itemRender={(originNode, currentFile, currentFileList) => {
						return (
							<DragableUploadListItem
								originNode={originNode}
								file={currentFile}
								fileList={currentFileList}
								moveRow={moveRow}
							/>
						);
					}}
				>
					{!disableInsert && !disableAdd ? getUploadButton() : null}
				</Upload>
			</DndProvider>

			{tips && <small className={Style["oak-upload__tips"]}>{tips}</small>}
			{theme === "custom" && (
				<>
					<Table
						dataSource={newUploadFiles || []}
						rowKey="id"
						columns={[
							{
								align: "center",
								dataIndex: "tableIndex",
								title: "序号",
								render: (value, record, index) => index + 1,
								width: 100,
							},
							{
								dataIndex: "name",
								title: "文件名",
							},
							{
								dataIndex: "size",
								title: "文件大小",
								render: (value, record, index) => {
									return features.extraFile.formatBytes(value as number);
								},
							},
							{
								dataIndex: "status",
								title: "状态",
								render: (value, record, index) => {
									let cpn: any;
									switch (value) {
										case "success":
											cpn = <Tag color="success">{t("success")}</Tag>;
											break;
										case "uploading":
											cpn = <Tag color="processing">{t("uploading")}</Tag>;
											break;
										default:
											cpn = <Tag color="warning">{t("waiting")}</Tag>;
											break;
									}
									return cpn;
								},
							},
							{
								dataIndex: "op",
								width: 300,
								title: "操作",
								align: "center",
								render: (value, record, index) => {
									// 只处理state的文件 这时候可以直接删除
									return (
										<>
											{!record.id && (
												<Button
													type="link"
													onClick={() => {
														customDelete(index);
													}}
												>
													删除
												</Button>
											)}
										</>
									);
								},
								fixed: "right",
							},
						]}
					/>
					<div style={{ display: "flex", justifyContent: "flex-end" }}>
						<Space>
							<Button
								danger
								type="default"
								onClick={() => setNewUploadFiles([])}
							>
								清空
							</Button>
							<Button
								type="primary"
								onClick={() => {
									onPickByWeb(newUploadFiles, (file: any, status: string) => {
										setNewUploadFilesByStatus(file, status);
									});
								}}
							>
								上传
							</Button>
						</Space>
					</div>
				</>
			)}
		</Space>
	);
}
