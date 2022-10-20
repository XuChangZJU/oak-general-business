import React from 'react';
import { Button, Input, Textarea, Form, InputAdornment } from 'tdesign-react';
import { ChevronRightIcon } from 'tdesign-icons-react';
import Style from './web.module.less';
const { FormItem } = Form;

export default function render(this: any) {
    const PickArea = (
        <Button
            variant="text"
            icon={<ChevronRightIcon />}
            onClick={() => this.callAreaPicker()}
        />
    );
    return (
        <div className={Style.container}>
            <Form
                colon={false}
                labelAlign="top"
                labelWidth="100px"
                layout="vertical"
                preventSubmitDefault
                resetType="empty"
                showErrorMessage
                submitWithWarningMessage={false}
            >
                <FormItem
                    label={this.t('address:attr.name')}
                    name="name"
                >
                    <Input
                        placeholder="姓名"
                        onChange={(data) => this.setUpdateData('name', data)}
                        value={this.state.name}
                        data-attr="name"
                        tips={this.state.oakFocused?.attr === 'name' ? this.state.oakFocused.message : undefined}
                        status={this.state.oakFocused?.attr === 'name' ? 'error' : undefined}
                    />
                </FormItem>
                <FormItem
                    label={this.t('address:attr.phone')}
                    name="phone"
                >
                    <Input
                        placeholder="手机号"
                        onChange={(data) => this.setUpdateData('phone', data)}
                        value={this.state.phone}
                        data-attr="phone"
                        tips={this.state.oakFocused?.attr === 'phone' ? this.state.oakFocused.message : undefined}
                        status={this.state.oakFocused?.attr === 'phone' ? 'error' : undefined}
                    />
                </FormItem>
                <FormItem
                    label={this.t('address:attr.area')}
                    name="areaText"
                >
                    <InputAdornment append={PickArea} style={{ width: '100%' }}>
                        <Input
                            placeholder="所在地区"
                            onChange={this.setValue}
                            value={this.state.areaText}
                            data-attr="areaText"
                            disabled={true}
                            tips={this.state.oakFocused?.attr === 'areaId' ? this.state.oakFocused.message : undefined}
                            status={this.state.oakFocused?.attr === 'areaId' ? 'error' : undefined}
                        />
                    </InputAdornment>
                </FormItem>
                <FormItem
                    label={this.t('address:attr.detail')}
                    name="detail"
                >
                    <Textarea
                        maxlength={100}
                        onChange={(data) => this.setUpdateData('detail', data)}
                        value={this.state.detail}
                        data-attr="detail"
                        placeholder="详细地址"
                        tips={this.state.oakFocused?.attr === 'detail' ? this.state.oakFocused.message : undefined}
                        status={this.state.oakFocused?.attr === 'detail' ? 'error' : undefined}
                    />
                </FormItem>
            </Form>
            <div style={{ flex: 1 }} />
            <Button
                block
                disabled={this.state.oakAllowExecuting !== true}
                theme="primary"
                onClick={() => {
                    this.confirm();
                }}
            >
                {this.t('common:action.confirm')}
            </Button>
        </div>
    );
}
