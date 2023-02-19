import React, { Component } from 'react';
import Style from './web.module.less';
import PageHeader from '../../../components/common/pageHeader';
import QrCode from '../../../components/common/qrCode';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'userEntityGrant',
        true,
        {
            showBack: boolean;
            variant: 'alone' | 'inline' | 'dialog';
            url: string;
            expiresAt: number;
            title?: string
        },
        {}
    >
) {
    const {
        variant,
        showBack = true,
        url,
        expiresAt,
        title = '授权二维码',
    } = props.data;
    return (
        <Container showBack={showBack} variant={variant} title={title}>
            <QrCode url={url} expiresAt={expiresAt} />
        </Container>
    );
}


function Container(props: {
    children: React.ReactNode;
    variant?: 'inline' | 'alone' | 'dialog';
    showBack?: boolean;
    title?: string;
}) {
    const {
        children,
        variant = 'alone',
        showBack,
        title,
    } = props;
    if (['inline', 'dialog'].includes(variant)) {
        return <>{children}</>;
    }
    return (
        <PageHeader showBack={showBack} title={title}>
            <div className={Style.container}>{children}</div>
        </PageHeader>
    );
}