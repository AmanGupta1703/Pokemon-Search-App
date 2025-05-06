import { ReactNode } from "react";

import styles from "./Button.module.css";

type TButtonProps = {
  children: ReactNode;

  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ children, onClick }: TButtonProps) => {
  return (
    <button className={`${styles.btn} ${styles["btn-search"]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
