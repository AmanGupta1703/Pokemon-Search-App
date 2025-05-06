import { ChangeEvent } from "react";

import styles from "./Input.module.css";

type TInputProps = {
  type?: string;
  name: string;
  placeholder?: string;
  value: string;

  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  type = "text",
  name,
  placeholder = "eg: write a pokemon name here",
  value,
  onChange,
}: TInputProps) => {
  return (
    <input
      className={`${styles.input} ${styles["input-search"]}`}
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
