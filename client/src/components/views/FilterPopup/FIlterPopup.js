import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './FilterPopup.module.css';
import Category from './Sections/Category';
import { useBodyScrollLock } from './Sections/ScrollLock';
import { DatePicker, Button } from 'antd';
import HeadCount from './Sections/HeadCount';
const { RangePicker } = DatePicker;

function ModalBasic({ setModalOpen }) {
  const scroll = useBodyScrollLock();
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [isSubmit, setisSubmit] = useState(false);
  const [curMidtag, setcurMidtag] = useState();
  const [curTimeRange, setcurTimeRange] = useState([]);
  const [curHeadCount, setcurHeadCount] = useState([]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

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
        <Category setValue={setcurMidtag} isSubmit={isSubmit} />
        <RangePicker
          onChange={(value) => {
            setcurTimeRange(value.map((value) => value.$d));
          }}
        />
        <HeadCount setValue={setcurHeadCount} isSubmit={isSubmit} />
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setisSubmit(true);
            console.log(curMidtag, curTimeRange, curHeadCount);
            closeModal();
          }}
        >
          저장
        </Button>
        <Button type="default" size="large">
          닫기
        </Button>
      </div>
    </>
  );
}

export default ModalBasic;
