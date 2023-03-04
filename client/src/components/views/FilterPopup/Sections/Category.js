import { useState } from 'react';
import styles from './Category.module.css';
import { Midtag } from './MidTag';

export const Category = () => {
  const [Category, setCategory] = useState([false, true, false, false]); // 중 카테고리 - 1.학교 수업 2.대회 & 공모전 3.스터디
  const [CurCategory, setCurCategory] = useState(1);

  const handleSelctItem = (req) => {
    let temp = [false, false, false, false];
    temp[req] = true;
    setCurCategory(req);
    setCategory(temp);
  };

  return (
    <>
      <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div className={styles.category}>
          <div className={styles.category__name}>
            <button onClick={() => handleSelctItem(1)} disabled={Category[1]}>
              학교 수업
            </button>
          </div>
          <div className={styles.category__name}>
            <button onClick={() => handleSelctItem(2)} disabled={Category[2]}>
              대회&공모전
            </button>
          </div>
          <div className={styles.category__name}>
            <button onClick={() => handleSelctItem(3)} disabled={Category[3]}>
              스터디
            </button>
          </div>
        </div>
      </div>
      <Midtag data-req={CurCategory}></Midtag>
    </>
  );
};
