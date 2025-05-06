import { ReactNode } from "react";

import styles from "./Main.module.css";

type TMainProps = {
  children: ReactNode;
};

const Main = ({ children }: TMainProps) => {
  return <main className={styles.main}>{children}</main>;
};

export default Main;
