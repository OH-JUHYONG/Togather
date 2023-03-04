import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './FilterPopup.module.css';
import { Category } from './Sections/Category';
import { useBodyScrollLock } from './Sections/ScrollLock';

function ModalBasic({ setModalOpen }) {
  const scroll = useBodyScrollLock();

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    scroll.lockScroll();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      scroll.openScroll();
      if (width < 500 || height < 500) {
        closeModal();
      }
    };
  }, [closeModal, height, scroll, width]);

  return (
    <>
      <link
        href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-round.css"
        rel="stylesheet"
      ></link>
      <div className={styles.background} onClick={closeModal}></div>
      <div className={styles.container}>
        <div className={styles.title}>
          필터
          <button button className={styles.close_btn} onClick={closeModal}>
            X
          </button>
        </div>
        <Category key={width} />
      </div>
    </>
  );
}
export default ModalBasic;
