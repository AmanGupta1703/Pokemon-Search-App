import { ReactNode } from "react";

import styles from "./Section.module.css";

type TSectionClassName = "section-cards" | "section-search";

type TSectionProps = {
  className?: TSectionClassName;
  children: ReactNode;
};

const Section = ({ children }: TSectionProps) => {
  return <section className={`${styles.section} ${styles["section-cards"]}`}>{children}</section>;
};

export default Section;
