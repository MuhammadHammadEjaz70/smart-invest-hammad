import React, { useState, ChangeEvent } from "react";
import styles from "./input.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { SEARCH } from "@/utils/images";
import { Row } from "react-bootstrap";
import Buttons from "../Button/Button";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  min?: number;
  max?: number;
  onChange?: (event: any) => void;
  type?: "text" | "password" | "textarea" | "number" | "email" | "search";
  mode?: "light" | "dark";
  borderRadius?: string;
  readOnly?: boolean;
  width?: string;
  color?: string;
  rows?: number;
  backgroundColor?: string;
  border?: string;
  height?: string;
  required?: boolean;
  showAdditionalField?: boolean;
  additionalFieldPlaceholder?: string;
  additionalFieldValue?: string;
  additionalFieldOnChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  buttonText?: string;
  onButtonClick?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  name,
  min,
  max,
  borderRadius,
  border,
  readOnly = false,
  width,
  backgroundColor,
  color,
  height,
  rows,
  required = false,
  mode = "light",
  showAdditionalField = false,
  additionalFieldPlaceholder,
  additionalFieldValue,
  additionalFieldOnChange,
  buttonText = "Submit",
  onButtonClick,
}) => {
  const [inputType, setInputType] = useState<string>(type);

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const labelClass = mode === "light" ? styles.lightLabelText : styles.darkLabelText;
  const inputClass = mode === "light" ? styles.lightInputFields : styles.darkInputFields;

  if (type === "textarea") {
    return (
      <div className={styles.inputContainer}>
        {label && <label className={labelClass}>{label}</label>}
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`form-control ${inputClass} my-3 mb-3`}
          style={{ borderRadius, width, backgroundColor, color, border, height }}
        />
      </div>
    );
  }
  return (
    <div className={styles.inputContainer}>
      {label && <label className={labelClass}>{label}</label>}
      {showAdditionalField ? (
        <Row className="align-items-center my-2">
          <div className={styles.InputButttons}>
            <input
              type={inputType}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className={`form-control ${styles.additionalInput}`}
              style={{ borderRadius, width, backgroundColor, color }}
            />
            <Buttons
              type="submit"
              variant="background"
              children={buttonText}
              height="64px"
              borderRadius="35px"
              whiteSpace="nowrap"
              onClick={onButtonClick}
            />
          </div>
        </Row>
      ) : (
        <Row>
          <div className={styles.inputWrapper}>
            <input
              type={inputType}
              name={name}
              placeholder={placeholder}
              value={value}
              readOnly={readOnly}
              min={min}
              required={required}
              max={max}
              onChange={onChange as (event: ChangeEvent<HTMLInputElement>) => void}
              className={`form-control ${styles.inputFields} ${inputClass} my-3`}
              style={{ borderRadius, width, backgroundColor, color, border, height }}
            />
            {type === "password" && (
              <span onClick={togglePasswordVisibility} className={styles.eyeIcon}>
                <FontAwesomeIcon
                  icon={inputType === "password" ? faEye : faEyeSlash}
                />
              </span>
            )}
            {type === "search" && (
              <span className={styles.searchIcon}>
                <Image src={SEARCH} alt="search" />
              </span>
            )}
          </div>
        </Row>
      )}
    </div>
  );
};

export default InputField;
