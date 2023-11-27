import React from 'react';
import { defaultColor } from './color';
import Style from './radioColor.module.less';
const RadioColor = (props) => (<div className={Style.panel}>
        {defaultColor.map((color, index) => (<div key={index} onClick={() => props?.onChange(color)} className={Style.box} style={{
            borderColor: props.defaultValue === color ? color : 'transparent',
        }}>
                <div className={Style.item} style={{ backgroundColor: color }}/>
            </div>))}
    </div>);
export default React.memo(RadioColor);
