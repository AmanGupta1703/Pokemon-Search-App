import { ReactNode, useState, useEffect } from "react";

import { retrieveFromLocalStorage, saveToLocalStorage } from "../../utils";

import styles from "./Model.module.css";

type TModalProps = {
  children: ReactNode;
};

const keyName = "toHideModal";

const Modal = ({ children }: TModalProps) => {
  const [toHide, setToHide] = useState(() => retrieveFromLocalStorage(keyName) ?? false);

  const onClose = () => {
    setToHide(true);
  };

  useEffect(() => {
    saveToLocalStorage(keyName, toHide);
  }, [toHide]);

  return !toHide ? (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;
