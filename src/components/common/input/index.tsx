import React, { useState, useEffect } from 'react';
import { Input, InputProps } from 'antd';

interface IProps extends InputProps {
    value?: string;
}

function BaseHOC(key?: string) {
  return function (props: IProps) {
      const { defaultValue, value, onChange } = props;
      const hasValue = props.hasOwnProperty('value');
      // 用户切换到底是显示 value 还是 input
      // 不能直接用 isOnComposition 原因是，这个值发生变化不会触发重新渲染
      // 不能只使用 flag 原因是，setFlag 是异步的
      const [flag, setFlag] = useState(false);
      // 非中文输入时候显示 value。中文输入的时候显示 input
      const [input, setInput] = useState(hasValue ? value : defaultValue);
      useEffect(
          function () {
              if (hasValue && input !== value) {
                  setInput(value);
              }
          },
          [value]
      );
      let isOnComposition = false;
      function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
          setInput(e.target.value);
          if (isOnComposition) return;
          onChange && onChange(e);
      }
      function handleComposition(
          e?:any
      ) {
          if ('compositionend' === e?.type) {
              isOnComposition = false;
              handleChange(e);
          } else {
              isOnComposition = true;
          }
          if (flag !== isOnComposition) {
              setFlag(isOnComposition);
          }
      }
      let Component = Input;
      if (key) {
          Component = Input[key! as keyof typeof Input];
      }
      return (
          <Component
              {...props}
              value={hasValue && !flag ? value : input}
              onCompositionStart={handleComposition}
              onCompositionUpdate={handleComposition}
              onCompositionEnd={handleComposition}
              onChange={handleChange}
          />
      );
  };
}

const Component = function (props: IProps) {
    return BaseHOC()(props);
};

Component.Search = function (props: IProps) {
    return BaseHOC('Search')(props);
};

Component.TextArea = function (props: IProps) {
    return BaseHOC('TextArea')(props);
};

Component.Password = Input.Password

Component.Group = Input.Group

export default Component;
