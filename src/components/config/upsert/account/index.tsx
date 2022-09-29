import React, { useState } from 'react';
import { Tabs, Row, Col, Card, Divider, Input, InputAdornment, Space, Form } from 'tdesign-react';
import Styles from './web.module.less';
import { AliCloudConfig, AmapCloudConfig, Config, QiniuCloudConfig, TencentCloudConfig } from '../../../../types/Config';

const { FormItem } = Form;
const { TabPanel } = Tabs;

function TencentAccount(props: {
    accounts: TencentCloudConfig[],
    setValue: (path: string, value: any) => void
    removeItem: (path: string, index: number) => void
}) {
    const { accounts, setValue, removeItem } = props;
    return (
        <Col align="stretch">
            <Divider align="left" className={Styles.title}>腾讯云配置</Divider>
            <Tabs
                placement={'top'}
                size={'medium'}
                disabled={false}
                theme="normal"
                addable={accounts.length > 0}
            >
                {
                    accounts.length > 0 ? accounts.map(
                        (ele, idx) => {
                            console.log(ele);
                            return (
                                <TabPanel
                                    key={idx}
                                    value={idx}
                                    label={`帐号${idx + 1}`}
                                    removable={true}
                                    onRemove={() => removeItem('', idx)}
                                >
                                    <Form
                                        colon={false}
                                        labelAlign="left"
                                        labelWidth="100px"
                                        layout="vertical"
                                        preventSubmitDefault
                                        resetType="empty"
                                        showErrorMessage
                                        submitWithWarningMessage={false}
                                        style={{ marginTop: 10 }}
                                    >
                                        <FormItem
                                            label="secretId"
                                            name="secretId"
                                            successBorder={false}
                                        >
                                            <>
                                                <Input
                                                    align="left"
                                                    autoWidth={false}
                                                    autofocus={false}
                                                    clearable={false}
                                                    placeholder="请输入secretId"
                                                    readonly={false}
                                                    showClearIconOnEmpty={false}
                                                    size="medium"
                                                    status="default"
                                                    type="text"
                                                    value={ele.secretId}
                                                    onChange={(value) => setValue(`${idx}.secretId`, value)}
                                                />
                                            </>
                                        </FormItem>
                                        <FormItem
                                            label="secretKey"
                                            name="secretKey"
                                            successBorder={false}
                                        >
                                            <>
                                                <Input
                                                    align="left"
                                                    autoWidth={false}
                                                    autofocus={false}
                                                    clearable={false}
                                                    placeholder="请输入secretKey"
                                                    readonly={false}
                                                    showClearIconOnEmpty={false}
                                                    size="medium"
                                                    status="default"
                                                    type="text"
                                                    value={ele.secretKey}
                                                    onChange={(value) => setValue(`${idx}.secretKey`, value)}
                                                />
                                            </>
                                        </FormItem>
                                        <FormItem
                                            label="region"
                                            name="region"
                                            successBorder={false}
                                        >
                                            <>
                                                <Input
                                                    align="left"
                                                    autoWidth={false}
                                                    autofocus={false}
                                                    clearable={false}
                                                    placeholder="请输入region"
                                                    readonly={false}
                                                    showClearIconOnEmpty={false}
                                                    size="medium"
                                                    status="default"
                                                    type="text"
                                                    value={ele.region}
                                                    onChange={(value) => setValue(`${idx}.region`, value)}
                                                />
                                            </>
                                        </FormItem>
                                    </Form>
                                </TabPanel>
                            );
                        }
                    ) : (
                        <TabPanel
                            key={0}
                            value={0}
                            label="新建帐号"
                        >

                            <Form
                                colon={true}
                                labelAlign="left"
                                labelWidth="100px"
                                layout="vertical"
                                style={{ marginTop: 10 }}
                            >
                                <FormItem
                                    label="secretId"
                                    name="secretId"
                                    successBorder={false}
                                >
                                    <>
                                        <Input
                                            align="left"
                                            autoWidth={false}
                                            autofocus={false}
                                            clearable={false}
                                            placeholder="请输入secretId"
                                            readonly={false}
                                            showClearIconOnEmpty={false}
                                            size="medium"
                                            status="default"
                                            type="text"
                                            value=""
                                            onChange={(value) => setValue(`0.secretId`, value)}
                                        />
                                    </>
                                </FormItem>
                                <FormItem
                                    label="secretKey"
                                    name="secretKey"
                                    successBorder={false}
                                >
                                    <>
                                        <Input
                                            align="left"
                                            autoWidth={false}
                                            autofocus={false}
                                            clearable={false}
                                            placeholder="请输入secretKey"
                                            readonly={false}
                                            showClearIconOnEmpty={false}
                                            size="medium"
                                            status="default"
                                            type="text"
                                            value=""
                                            onChange={(value) => setValue(`0.secretKey`, value)}
                                        />
                                    </>
                                </FormItem>
                                <FormItem
                                    label="region"
                                    name="region"
                                    successBorder={false}
                                >
                                    <>
                                        <Input
                                            align="left"
                                            autoWidth={false}
                                            autofocus={false}
                                            clearable={false}
                                            placeholder="请输入region"
                                            readonly={false}
                                            showClearIconOnEmpty={false}
                                            size="medium"
                                            status="default"
                                            type="text"
                                            value=""
                                            onChange={(value) => setValue(`0.region`, value)}
                                        />
                                    </>
                                </FormItem>
                            </Form>
                        </TabPanel>
                    )
                }
            </Tabs>
        </Col>
    );
}

function QiniuAccount(props: {
    accounts: QiniuCloudConfig[],
    setValue: (path: string, value: any) => void
    removeItem: (path: string, index: number) => void
}) {
    const { accounts, setValue, removeItem } = props;
    return (
        <Col align="stretch">
            <Divider align="left" className={Styles.title}>七牛云配置</Divider>
            <Tabs
                placement={'top'}
                size={'medium'}
                disabled={false}
                theme="normal"
                addable={accounts.length > 0}
            >
                {
                    accounts.length > 0 ? accounts.map(
                        (ele, idx) => (
                            <TabPanel
                                key={idx}
                                value={idx}
                                label={`帐号${idx + 1}`}
                                removable={true}
                                onRemove={() => removeItem('', idx)}
                            >
                                <Form
                                    colon={false}
                                    labelAlign="left"
                                    labelWidth="100px"
                                    layout="vertical"
                                    preventSubmitDefault
                                    resetType="empty"
                                    showErrorMessage
                                    submitWithWarningMessage={false}
                                    style={{ marginTop: 10 }}
                                >
                                    <FormItem
                                        label="accessKey"
                                        name="accessKey"
                                        successBorder={false}
                                    >
                                        <>
                                            <Input
                                                align="left"
                                                autoWidth={false}
                                                autofocus={false}
                                                clearable={false}
                                                placeholder="请输入accessKey"
                                                readonly={false}
                                                showClearIconOnEmpty={false}
                                                size="medium"
                                                status="default"
                                                type="text"
                                                value={ele.accessKey}
                                                onChange={(value) => setValue(`${idx}.accessKey`, value)}
                                            />
                                        </>
                                    </FormItem>
                                    <FormItem
                                        label="secretKey"
                                        name="secretKey"
                                        successBorder={false}
                                    >
                                        <>
                                            <Input
                                                align="left"
                                                autoWidth={false}
                                                autofocus={false}
                                                clearable={false}
                                                placeholder="请输入secretKey"
                                                readonly={false}
                                                showClearIconOnEmpty={false}
                                                size="medium"
                                                status="default"
                                                type="text"
                                                value={ele.secretKey}
                                                onChange={(value) => setValue(`${idx}.secretKey`, value)}
                                            />
                                        </>
                                    </FormItem>
                                </Form>
                            </TabPanel>
                        )
                    ) : (
                        <TabPanel
                            key={0}
                            value={0}
                            label="新建帐号"
                        >

                            <Form
                                colon={true}
                                labelAlign="left"
                                labelWidth="100px"
                                layout="vertical"
                                style={{ marginTop: 10 }}
                            >
                                <FormItem
                                    label="accessKey"
                                    name="accessKey"
                                    successBorder={false}
                                >
                                    <>
                                        <Input
                                            align="left"
                                            autoWidth={false}
                                            autofocus={false}
                                            clearable={false}
                                            placeholder="请输入accessKey"
                                            readonly={false}
                                            showClearIconOnEmpty={false}
                                            size="medium"
                                            status="default"
                                            type="text"
                                            value=""
                                            onChange={(value) => setValue(`0.accessKey`, value)}
                                        />
                                    </>
                                </FormItem>
                                <FormItem
                                    label="secretKey"
                                    name="secretKey"
                                    successBorder={false}
                                >
                                    <>
                                        <Input
                                            align="left"
                                            autoWidth={false}
                                            autofocus={false}
                                            clearable={false}
                                            placeholder="请输入secretKey"
                                            readonly={false}
                                            showClearIconOnEmpty={false}
                                            size="medium"
                                            status="default"
                                            type="text"
                                            value=""
                                            onChange={(value) => setValue(`0.secretKey`, value)}
                                        />
                                    </>
                                </FormItem>
                            </Form>
                        </TabPanel>
                    )
                }
            </Tabs>
        </Col>
    );
}

function AliAccount(props: {
    accounts: AliCloudConfig[],
    setValue: (path: string, value: any) => void
    removeItem: (path: string, index: number) => void
}) {
    const { accounts, setValue, removeItem } = props;
    return (
        <Col align="stretch">
            <Divider align="left" className={Styles.title}>阿里云配置</Divider>
            <Tabs
                placement={'top'}
                size={'medium'}
                disabled={false}
                theme="normal"
                addable={accounts.length > 0}
            >
                {
                    accounts.length > 0 ? accounts.map(
                        (ele, idx) => (
                            <TabPanel
                                key={idx}
                                value={idx}
                                label={`帐号${idx + 1}`}
                                removable={true}
                                onRemove={() => removeItem('', idx)}
                            >
                                <Form
                                    colon={false}
                                    labelAlign="left"
                                    labelWidth="100px"
                                    layout="vertical"
                                    preventSubmitDefault
                                    resetType="empty"
                                    showErrorMessage
                                    submitWithWarningMessage={false}
                                    style={{ marginTop: 10 }}
                                >
                                    <FormItem
                                        label="accessKeyId"
                                        name="accessKeyId"
                                        successBorder={false}
                                    >
                                        <>
                                            <Input
                                                align="left"
                                                autoWidth={false}
                                                autofocus={false}
                                                clearable={false}
                                                placeholder="请输入accessKeyId"
                                                readonly={false}
                                                showClearIconOnEmpty={false}
                                                size="medium"
                                                status="default"
                                                type="text"
                                                value={ele.accessKeyId}
                                                onChange={(value) => setValue(`${idx}.accessKeyId`, value)}
                                            />
                                        </>
                                    </FormItem>
                                    <FormItem
                                        label="accessKeySecret"
                                        name="accessKeySecret"
                                        successBorder={false}
                                    >
                                        <>
                                            <Input
                                                align="left"
                                                autoWidth={false}
                                                autofocus={false}
                                                clearable={false}
                                                placeholder="请输入accessKeySecret"
                                                readonly={false}
                                                showClearIconOnEmpty={false}
                                                size="medium"
                                                status="default"
                                                type="text"
                                                value={ele.accessKeySecret}
                                                onChange={(value) => setValue(`${idx}.accessKeySecret`, value)}
                                            />
                                        </>
                                    </FormItem>
                                    <FormItem
                                        label="regionId"
                                        name="regionId"
                                        successBorder={false}
                                    >
                                        <>
                                            <Input
                                                align="left"
                                                autoWidth={false}
                                                autofocus={false}
                                                clearable={false}
                                                placeholder="请输入regionId"
                                                readonly={false}
                                                showClearIconOnEmpty={false}
                                                size="medium"
                                                status="default"
                                                type="text"
                                                value={ele.regionId}
                                                onChange={(value) => setValue(`${idx}.regionId`, value)}
                                            />
                                        </>
                                    </FormItem>
                                </Form>
                            </TabPanel>
                        )
                    ) : (
                        <TabPanel
                            key={0}
                            value={0}
                            label="新建帐号"
                        >

                            <Form
                                colon={true}
                                labelAlign="left"
                                labelWidth="100px"
                                layout="vertical"
                                style={{ marginTop: 10 }}
                            >
                                <FormItem
                                    label="accessKeyId"
                                    name="accessKeyId"
                                    successBorder={false}
                                >
                                    <>
                                        <Input
                                            align="left"
                                            autoWidth={false}
                                            autofocus={false}
                                            clearable={false}
                                            placeholder="请输入accessKeyId"
                                            readonly={false}
                                            showClearIconOnEmpty={false}
                                            size="medium"
                                            status="default"
                                            type="text"
                                            value=""
                                            onChange={(value) => setValue(`0.accessKeyId`, value)}
                                        />
                                    </>
                                </FormItem>
                                <FormItem
                                    label="accessKeySecret"
                                    name="accessKeySecret"
                                    successBorder={false}
                                >
                                    <>
                                        <Input
                                            align="left"
                                            autoWidth={false}
                                            autofocus={false}
                                            clearable={false}
                                            placeholder="请输入accessKeySecret"
                                            readonly={false}
                                            showClearIconOnEmpty={false}
                                            size="medium"
                                            status="default"
                                            type="text"
                                            value=""
                                            onChange={(value) => setValue(`0.accessKeySecret`, value)}
                                        />
                                    </>
                                </FormItem>
                                <FormItem
                                    label="regionId"
                                    name="regionId"
                                    successBorder={false}
                                >
                                    <>
                                        <Input
                                            align="left"
                                            autoWidth={false}
                                            autofocus={false}
                                            clearable={false}
                                            placeholder="请输入regionId"
                                            readonly={false}
                                            showClearIconOnEmpty={false}
                                            size="medium"
                                            status="default"
                                            type="text"
                                            value=""
                                            onChange={(value) => setValue(`0.regionId`, value)}
                                        />
                                    </>
                                </FormItem>
                            </Form>
                        </TabPanel>
                    )
                }
            </Tabs>
        </Col>
    );
}


function AmapAccount(props: {
    accounts: AmapCloudConfig[],
    setValue: (path: string, value: any) => void
    removeItem: (path: string, index: number) => void
}) {
    const { accounts, setValue, removeItem } = props;
    return (
        <Col align="stretch">
            <Divider align="left" className={Styles.title}>高德云配置</Divider>
            <Tabs
                placement={'top'}
                size={'medium'}
                disabled={false}
                theme="normal"
                addable={accounts.length > 0}
            >
                {
                    accounts.length > 0 ? accounts.map(
                        (ele, idx) => (
                            <TabPanel
                                key={idx}
                                value={idx}
                                label={`帐号${idx + 1}`}
                                removable={true}
                                onRemove={() => removeItem('', idx)}
                            >
                                <Form
                                    colon={false}
                                    labelAlign="left"
                                    labelWidth="100px"
                                    layout="vertical"
                                    preventSubmitDefault
                                    resetType="empty"
                                    showErrorMessage
                                    submitWithWarningMessage={false}
                                    style={{ marginTop: 10 }}
                                >
                                    <FormItem
                                        label="webApiKey"
                                        name="webApiKey"
                                        successBorder={false}
                                    >
                                        <>
                                            <Input
                                                align="left"
                                                autoWidth={false}
                                                autofocus={false}
                                                clearable={false}
                                                placeholder="请输入webApiKey"
                                                readonly={false}
                                                showClearIconOnEmpty={false}
                                                size="medium"
                                                status="default"
                                                type="text"
                                                value={ele.webApiKey}
                                                onChange={(value) => setValue(`${idx}.webApiKey`, value)}
                                            />
                                        </>
                                    </FormItem>
                                </Form>
                            </TabPanel>
                        )
                    ) : (
                        <TabPanel
                            key={0}
                            value={0}
                            label="新建帐号"
                        >

                            <Form
                                colon={true}
                                labelAlign="left"
                                labelWidth="100px"
                                layout="vertical"
                                style={{ marginTop: 10 }}
                            >
                                <FormItem
                                    label="webApiKey"
                                    name="webApiKey"
                                    successBorder={false}
                                >
                                    <>
                                        <Input
                                            align="left"
                                            autoWidth={false}
                                            autofocus={false}
                                            clearable={false}
                                            placeholder="请输入webApiKey"
                                            readonly={false}
                                            showClearIconOnEmpty={false}
                                            size="medium"
                                            status="default"
                                            type="text"
                                            value=""
                                            onChange={(value) => setValue(`0.webApiKey`, value)}
                                        />
                                    </>
                                </FormItem>
                            </Form>
                        </TabPanel>
                    )
                }
            </Tabs>
        </Col>
    );
}

export default function Account(props: {
    account: Required<Config>['Account'],
    setValue: (path: string, value: any) => void
    removeItem: (path: string, index: number) => void
}) {
    const { account, setValue, removeItem } = props;
    const { tencent, qiniu, ali, amap } = account;
    return (
        <Col>
            <Row>
                <Card className={Styles.tips}>
                    每种云厂商均可配置多个帐号，相应的服务所使用的帐号请准确对应
                </Card>
            </Row>
            <TencentAccount
                accounts={tencent || []}
                setValue={(path, value) => setValue(`tencent.${path}`, value)}
                removeItem={(path, index) => removeItem(`tencent`, index)}
            />
            <QiniuAccount
                accounts={qiniu || []}
                setValue={(path, value) => setValue(`qiniu.${path}`, value)}
                removeItem={(path, index) => removeItem(`qiniu`, index)}
            />
            <AliAccount
                accounts={ali || []}
                setValue={(path, value) => setValue(`ali.${path}`, value)}
                removeItem={(path, index) => removeItem(`ali`, index)}
            />
            <AmapAccount
                accounts={amap || []}
                setValue={(path, value) => setValue(`amap.${path}`, value)}
                removeItem={(path, index) => removeItem(`amap`, index)}
            />
        </Col>
    );
}