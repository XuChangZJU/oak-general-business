import React from "react";
import { Space, Modal, Form, Input, Empty, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Style from "./web.module.less";
import ImgBox from "oak-frontend-base/es/components/imgBox";
export default function render(props) {
    const { isModalOpen, isModalOpen1, renderImgs, src, bridgeUrl, selectedId, } = props.data;
    const { t, onModalConfirm, chooseMethod, closeModal1, closeModal, onModal1Confirm, setSelectedId } = props.methods;
    const methods = ['original', 'url', 'uploadLocalImg'];
    const [form] = Form.useForm();
    const handleOk = () => {
        onModalConfirm(form.getFieldValue('url'));
        form.setFieldValue('url', '');
        closeModal();
    };
    return (<div className={Style.imgBox}>
            <Space direction="vertical" size={4}>
                <PlusOutlined />
                <div>选择封面</div>
            </Space>
            <img id="previewImg" src={src} alt="previewImg" className={Style.previewImg} style={{ display: src ? 'inline-block' : 'none' }}/>
            <div className={Style.methodList}>
                {methods && methods.map((ele) => (<div className={Style.methodListItem} onClick={() => {
                chooseMethod(ele);
            }}>
                        {t(ele)}
                    </div>))}
            </div>
            <Modal title={t('fillInImageLink')} open={isModalOpen} onOk={handleOk} onCancel={closeModal}>
                <Form form={form} className={Style.formMT}>
                    <Form.Item name="url" rules={[
            {
                required: true,
                message: '外部链接不能为空',
            },
            {
                pattern: /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
                message: '请输入正确的外链',
            }
        ]}>
                        <Input onChange={({ target: { value } }) => {
            form.setFieldValue('url', value);
        }} placeholder='如：https://www.xxx.com'/>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal width={800} title={t('chooseImage')} open={isModalOpen1} onOk={() => onModal1Confirm(selectedId)} onCancel={closeModal1}>
                {(renderImgs && renderImgs.length > 0) ? (<>
                        <Row gutter={[4, 4]}>
                            {renderImgs.map((img, index) => <Col key={img.id} span={4}>
                                    <ImgBox width={"100%"} bordered={true} mode="select" src={img.renderUrl} selected={selectedId === img.id} onClick={() => {
                    if (selectedId === img.id) {
                        setSelectedId(-1);
                    }
                    else {
                        setSelectedId(img.id);
                    }
                }}/>
                                </Col>)}
                        </Row>
                    </>) : (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>)}
            </Modal>
        </div>);
}
