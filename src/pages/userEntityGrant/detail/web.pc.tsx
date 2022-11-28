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
        },
        {}
    >
) {
    const { variant, showBack = true, url, expiresAt } = props.data;
    return (
        <Container showBack={showBack} variant={variant}>
            <QrCode url={url} expiresAt={expiresAt} />
        </Container>
    );
}


function Container(props: {
    children: React.ReactNode;
    variant?: 'inline' | 'alone' | 'dialog';
    showBack?: boolean;
}) {
    const { children, variant = 'alone', showBack } = props;
    if (['inline', 'dialog'].includes(variant)) {
        return <>{children}</>;
    }
    return (
        <PageHeader showBack={showBack} title="授权二维码">
            <div className={Style.container}>{children}</div>
        </PageHeader>
    );
}