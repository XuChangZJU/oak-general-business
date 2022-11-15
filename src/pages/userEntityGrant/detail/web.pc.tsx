import React, { Component } from 'react';
import Style from './web.module.less';
import PageHeader from '../../../components/common/pageHeader';
import QrCode from '../../../components/common/qrCode';

export default function render(this: any) {
    const { variant, showBack = true } = this.props;
    const { url, expiresAt } = this.state;
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