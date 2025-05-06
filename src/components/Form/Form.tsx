import { ReactNode } from "react";

import styles from "./Form.module.css";

type TFormProps = {
  children: ReactNode;

  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
};

const Form = ({ children, onSubmit }: TFormProps) => {
  return (
    <form className={`${styles.form} ${styles["form-search"]}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
