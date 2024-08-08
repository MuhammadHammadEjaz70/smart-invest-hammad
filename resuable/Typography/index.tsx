import React, { ReactNode } from "react";
import styles from "./Typography.module.css";

interface TypographyProps {
  variant:
  | "text14"
  | "text14notification"
  | "text16"
  | "text14Link"
  | "text26"
  | "text28light"
  | "text20light"
  | "text20danger"
  | "text20label"
  | "forgotLink"
  | "headingS"
  | "tableH"
  | "headingM"
  | "text18Light"
  | "text20Profile";

  children: ReactNode;
  className?: string;
  handleClick?: any;
}

const Typography: React.FC<TypographyProps> = ({
  variant = "",
  children,
  className,
  handleClick,
}) => {
  return (
    <div
      className={`${styles[variant]} ${className || ""}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Typography;
