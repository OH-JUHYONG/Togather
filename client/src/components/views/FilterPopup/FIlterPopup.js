import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './FilterPopup.module.css';
import { useBodyScrollLock } from './Sections/ScrollLock';

function ModalBasic({ setModalOpen }) {
    const scroll = useBodyScrollLock();
    // 모달 끄기 
    const closeModal = useCallback(() => {
        setModalOpen(false);
        scroll.openScroll(); //메인 페이지 스크롤락 해제
    },[]);


    // 윈도우 최소크기 이하일때 모달 창 끄기
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }; //이벤트 리스너를 통해 매순간 resize마다 값 저장
    
    useMemo(() => {
        scroll.lockScroll(); //모달창 실행시 메인페이지 스크롤락 
        if(window.innerWidth<500||window.innerHeight<500) closeModal();
    },[]); //윈도우 시작시 창 크기 체크

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            // cleanup
            if(width<500||height<500) {
                window.removeEventListener("resize", handleResize);
                closeModal();
            }
        }
    });  //윈도우 창 크기 업데이트할때마다 체크
    

    return (
        <>
        <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-round.css" rel="stylesheet"></link>
        <div className={styles.background} onClick={closeModal}></div>
        <div className={styles.container}>
            <div className={styles.title}> 필터
                <button button className={styles.close_btn} onClick={closeModal}>
                    X
                </button>
            </div>
            <p>모달창입니다.<br/>여기에 필터 항목들 추가할 예정<br/>필터항목 1<br/>필터항목 2<br/>필터항목 3<br/>필터항목 4</p>
        </div></>
    );
}
export default ModalBasic;