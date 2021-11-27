import React from 'react';
import styles from './Modal.module.css';

export const Modal = ({ children, modalVisible, onModalClose, modalRef }) => {
  if (!modalVisible) return null;
  return (
    <div className={styles.wrap}>
      <div ref={modalRef} className={styles.body}>
        <button onClick={onModalClose} className={styles.modalCloseBtn}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};
