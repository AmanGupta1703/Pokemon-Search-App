import { ReactNode } from "react";

import styles from "./Wrapper.module.css";

type TWrapperClassname = "wrapper-search" | "wrapper-cards";

type TWrapperProps = {
  className: TWrapperClassname;
  children: ReactNode;
};

const Wrapper = ({ className, children }: TWrapperProps) => {
  return <div className={`${styles.wrapper} ${styles[className]}`}>{children}</div>;
};

export default Wrapper;
