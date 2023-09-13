import React, { useState, useEffect } from 'react';

import { ETheme } from '../../../types/Theme';
import useFeatures from '../../../hooks/useFeatures';


import RadioColor from './RadioColor';
import RadioRect from './RadioRect';

import { ReactComponent as Light } from './assets/svg/assets-setting-light.svg';
import { ReactComponent as Dark } from './assets/svg/assets-setting-dark.svg';
import { ReactComponent as System } from './assets/svg/assets-setting-auto.svg';

import Style from './index.module.less';

enum ESettingTheme {
    system,
}

const themeList = [
    {
        value: ETheme.light,
        image: <Light />,
        name: '明亮',
    },
    {
        value: ETheme.dark,
        image: <Dark />,
        name: '黑暗',
    },
    {
        value: ESettingTheme.system,
        image: <System />,
        name: '跟随系统',
    },
];

export default function Render(this: any) {
    const features = useFeatures();
    const themeState = features.theme.get();
    const [systemTheme, setSystemTheme] = useState(themeState?.systemTheme);
    const [theme, setTheme] = useState(themeState?.theme);
    const [color, setColor] = useState(themeState?.color);


    const handleThemeSwitch = (value: ETheme | ESettingTheme) => {
        if (value === ESettingTheme.system) {
            features.theme.openSystemTheme();
        } else {
            features.theme.switchTheme(value);
        }
    };

    useEffect(() => {
        const themeUnsub = features.theme.subscribe(() => {
            const themeState = features.theme.get();
            setSystemTheme(themeState.systemTheme);
            setTheme(themeState.theme);
            setColor(themeState.color);
        });
        
        return () => {
            themeUnsub();
        }
    }, []);

    return (
        <div>
            <div className={Style.settingTitle}>主题模式</div>
            <RadioRect
                defaultValue={systemTheme ? ESettingTheme.system : theme}
                onChange={handleThemeSwitch}
                options={themeList}
            />

            <div className={Style.settingTitle}>主题色</div>
            <RadioColor
                defaultValue={color}
                onChange={(value) => features.theme.switchColor(value)}
            />
        </div>
    );
}
