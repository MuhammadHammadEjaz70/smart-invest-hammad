import React, { ForwardedRef, forwardRef, MouseEvent } from "react";

interface CustomToggleProps {
  children: React.ReactNode;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}

// ForwardRef to handle ref and props typing
const CustomToggle = forwardRef<HTMLAnchorElement, CustomToggleProps>(
  ({ children, onClick }, ref) => (
    <a
      href="#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  )
);

export default CustomToggle;
