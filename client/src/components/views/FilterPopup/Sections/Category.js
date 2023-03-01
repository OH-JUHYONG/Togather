import { useState } from "react";
import styles from './Category.module.css'

export const Category = () => {
    
    const [ClassCategory, setClassCategory] = useState(true); // 중 카테고리 - 학교 수업
    const [CompetitionCategory, setCompetitionCategory] = useState(false); // 중 카테고리 - 대회 & 공모전
    const [StudyCategory, setStudyCategory] = useState(false); // 중 카테고리 - 스터디

    const handleClassButtonClick = () => {
        setClassCategory(true);
        setCompetitionCategory(false);
        setStudyCategory(false);
    };

    const handleCompetitionButtonClick = () => {
        setClassCategory(false);
        setCompetitionCategory(true);
        setStudyCategory(false);
    };

    const handleStudyButtonClick = () => {
        setClassCategory(false);
        setCompetitionCategory(false);
        setStudyCategory(true);
    };

    return(
    <>
      <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div className={styles.category}>
          <div className={styles.category__name}>
            <button onClick={handleClassButtonClick} disabled={ClassCategory}>
              학교 수업
            </button>
          </div>
          <div className={styles.category__name}>
            <button
              onClick={handleCompetitionButtonClick}
              disabled={CompetitionCategory}
            >
              대회&공모전
            </button>
          </div>
          <div className={styles.category__name}>
            <button onClick={handleStudyButtonClick} disabled={StudyCategory}>
              스터디
            </button>
          </div>
        </div>

      </div>
    </>
    );
}
