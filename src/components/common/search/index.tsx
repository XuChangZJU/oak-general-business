import React, { memo, useRef, useState } from 'react';
import { CloseCircleFilledIcon } from 'tdesign-icons-react';
import { Button } from 'tdesign-react';

import './index.less';


type SearchProps = {
    /**
     * 自定义右侧操作按钮文字
     * @default ''
     */
    action?: React.ReactNode;
    /**
     * 是否居中
     * @default false
     */
    center?: boolean;
    /**
     * 是否禁用
     * @default false
     */
    disabled?: boolean;
    /**
     * 是否聚焦
     * @default false
     */
    focus?: boolean;
    /**
     * 左侧文本
     * @default ''
     */
    label?: string;
    /**
     * 左侧图标
     */
    leftIcon?: React.ReactNode;
    /**
     * 占位符
     * @default ''
     */
    placeholder?: string;
    /**
     * 右侧图标
     */
    rightIcon?: React.ReactNode;
    /**
     * 搜索框形状
     * @default 'square'
     */
    shape?: 'square' | 'round';
    /**
     * 值
     * @default ''
     */
    value?: string;
    /**
     * 值，非受控属性
     * @default ''
     */
    defaultValue?: string;
    /**
     * 点击右侧操作按钮文字时触发时触发
     * @default ''
     */
    onActionClick?: (e?: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLElement, MouseEvent>) => void;
    /**
     * 失去焦点时触发
     * @default ''
     */
    onBlur?: (value: string, e?: React.FocusEvent<HTMLDivElement>) => void;
    /**
     * 值发生变化时触发
     * @default ''
     */
    onChange?: (
        value: string,
        e?: React.FormEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
    ) => void;
    /**
     * 点击清除时触发
     * @default ''
     */
    onClear?: (e: React.MouseEvent<SVGSVGElement>) => void;
    /**
     * 获得焦点时触发
     * @default ''
     */
    onFocus?: (value: string, e?: React.FocusEvent<HTMLDivElement>) => void;
    /**
     * 提交时触发
     * @default ''
     */
    onSubmit?: (
        value: string,
        e?:
            | React.KeyboardEvent<HTMLDivElement>
            | React.FocusEvent<HTMLInputElement, Element>
    ) => void;

    style?: React.CSSProperties;
    className?: string;

    onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
};


const Search = (props: SearchProps) => {
    const {
    className = '',
    style = {},
    action = '',
    center,
    disabled,
    focus,
    label,
    leftIcon,
    placeholder,
    rightIcon,
    shape = 'square',
    value = '',
    onActionClick,
    onBlur,
    onChange,
    onClear,
    onFocus,
    onSubmit,
    onClick,
    } = props;
    const prefixCls = 'oak';


   const inputRef = useRef(null);
   const [focusState, setFocus] = useState(focus);

  function handleBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
    setFocus(false);
    (inputRef?.current as any)?.blur();
    const { value } = e.currentTarget;
    onBlur && onBlur(value, e);
  }

  function handleClear(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    onClear && onClear(e);
    onChange && onChange('');
  }

  function handleAction(e?: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLElement, MouseEvent>) {
    onActionClick && onActionClick(e);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.CompositionEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    onChange && onChange(value, e);
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement, Element>) {
    const { value } = e.currentTarget;
    onFocus && onFocus(value, e);
  }

  function handleSubmit(e: React.FocusEvent<HTMLInputElement, Element>) {
    const { value } = e.currentTarget;
    onSubmit && onSubmit(value, e);
  }

  function handleClick() {
    (inputRef?.current as any)?.focus();
    setFocus(true);
  }

  const shapeStyle = { borderRadius: shape === 'square' ? 'none' : '50px' };

  return (
      <div
          className={`${prefixCls}-search ${
              focusState ? `${prefixCls}-search-is-focused` : ''
          } ${className}`}
          style={{ ...style }}
          onClick={onClick}
      >
          {label && (
              <div
                  className={`${prefixCls}-search__label-text`}
                  style={{
                      marginLeft: '0px',
                      paddingRight: '8px',
                      color: 'rgba(0,0,0,0.9)',
                      whiteSpace: 'nowrap',
                  }}
              >
                  {label}
              </div>
          )}
          <div
              className={`${prefixCls}-search__form`}
              style={{ ...shapeStyle }}
          >
              <div className={`${prefixCls}-search__box`}>
                  <div className={`${prefixCls}-search__icon-search`}>
                      {leftIcon}
                  </div>
                  <input
                      style={{ textAlign: center ? 'center' : 'unset' }}
                      ref={inputRef}
                      type="text"
                      autoFocus={focusState}
                      disabled={disabled}
                      value={value}
                      placeholder={placeholder}
                      className={`${prefixCls}-search__input`}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      //   onFocus={handleFocus}
                      onSubmit={handleSubmit}
                  />
                  <div className={`${prefixCls}-search__icon-close`}>
                      {value.length > 0 && (
                          <CloseCircleFilledIcon onClick={handleClear} />
                      )}
                      {rightIcon}
                  </div>
              </div>
              <label
                  className={`${prefixCls}-search__label`}
                  style={{ ...shapeStyle }}
                  onClick={handleClick}
              >
                  <div className={`${prefixCls}-search__label-icon-search`}>
                      {leftIcon}
                  </div>
                  <span className={`${prefixCls}-search__label-text`}>
                      {placeholder}
                  </span>
              </label>
          </div>
          {focusState && action && (
              <Button
                  className={`${prefixCls}-search__cancel-button`}
                  variant="text"
                  theme="primary"
                  onClick={handleAction}
              >
                  {action}
              </Button>
          )}
      </div>
  );
};

export default Search;