import React from 'react';
import { Form, Button, Space } from 'antd';
import Style from './web.module.less';
import OnUser from '../onUser/index';
import PageHeader from '../../../../components/common/pageHeader';


export default function render(this: any) {
    const { relations, entity, entityId } = this.props;
    return (
        <PageHeader showBack={true} title="编辑权限">
            <div className={Style.container}>
                <OnUser
                    oakAutoUnmount={true}
                    oakPath={
                        this.state.oakFullpath
                            ? `${this.state.oakFullpath}.user`
                            : undefined
                    }
                    entity={entity}
                    entityId={entityId}
                    relations={relations}
                    oakId={this.props.oakId}
                />
                <Form colon labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button
                                disabled={!this.state.legal}
                                type="primary"
                                onClick={() => {
                                    this.onConfirm();
                                }}
                            >
                                提交
                            </Button>
                            <Button
                                htmlType="reset"
                                onClick={() => this.onReset()}
                            >
                                重置
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </PageHeader>
    );
}
