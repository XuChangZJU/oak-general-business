import React, { Component } from 'react';
import Style from './web.module.less';
import PageHeader from '../../../components/common/pageHeader';

export default function render(this: any) {
    const { variant, showBack = true } = this.props;
    const { relation, expiresAt } = this.state;
    return (
        <Container showBack={showBack} variant={variant}>
            
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
        <PageHeader showBack={showBack} title="获取权限">
            <div className={Style.container}>{children}</div>
        </PageHeader>
    );
}