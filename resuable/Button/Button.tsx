import React, { useRef } from 'react';
import styles from './Button.module.css';
import Image from 'next/image';

interface ButtonProps {
  variant: 'border' | 'background' | 'none' | 'button-background' | 'signUp-btn' | 'back-to-login-btn' | 'notification-btn' | 'view-all-btn' | 'upload-screenshot-btn';
  children: React.ReactNode;
  image?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  backgroundColor?: string;
  type?: "button" | "submit" | "reset";
  height?: string;
  whiteSpace?: string;
  borderRadius?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  image,
  children,
  onClick,
  onChange,
  width = "",
  backgroundColor = "",
  type = "button",
  height = "",
  whiteSpace = "",
  borderRadius = ""
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  let className = styles.button;

  if (variant === 'border') {
    className += ' ' + styles['button-border'];
  } else if (variant === 'background') {
    className += ' ' + styles['button-background'];
  } else if (variant === 'none') {
    className += ' ' + styles['button-none'];
  } else if (variant === 'signUp-btn') {
    className += ' ' + styles['signUp-btn'];
  } else if (variant === 'back-to-login-btn') {
    className += ' ' + styles['back-to-login-btn'];
  } else if (variant === 'notification-btn') {
    className += ' ' + styles['notification-btn'];
  } else if (variant === 'view-all-btn') {
    className += ' ' + styles['view-all-btn'];
  } else if (variant === 'upload-screenshot-btn') {
    className += ' ' + styles['upload-screenshot-btn'];
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === 'upload-screenshot-btn' && fileInputRef.current) {
      fileInputRef.current.click();
    }
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <>
      <button
        className={className}
        onClick={handleClick}
        style={{ width, backgroundColor, height, borderRadius, whiteSpace }}
        type={type}
      >
        {image && <Image className='mx-2' src={image} alt='image' />} {children}
      </button>
      {variant === 'upload-screenshot-btn' && (
        <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={onChange} />
      )}
    </>
  );
};

export default Button;
