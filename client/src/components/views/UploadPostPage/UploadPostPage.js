import React, { useState } from 'react';
import './UploadPostPage.css';
import { Button } from 'antd';

import 'react-datepicker/dist/react-datepicker.css';
// import HashTagForm from './HashTagForm/HashTagForm';

import ClassUploadPage from './MiddleCategoryEdu/ClassUploadPage';
import CompetitionUploadPage from './MiddleCategoryEdu/CompetitionUploadPage';
import StudyUploadPage from './MiddleCategoryEdu/StudyUploadPage';

const UploadPostPage = () => {
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

  return (
    <>
      <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div className="middle-category">
          <div className="middle-category__name">
            <Button onClick={handleClassButtonClick} disabled={ClassCategory}>
              학교 수업
            </Button>
          </div>
          <div className="middle-category__name">
            <Button
              onClick={handleCompetitionButtonClick}
              disabled={CompetitionCategory}
            >
              대회&공모전
            </Button>
          </div>
          <div className="middle-category__name">
            <Button onClick={handleStudyButtonClick} disabled={StudyCategory}>
              스터디
            </Button>
          </div>
        </div>

        {ClassCategory && <ClassUploadPage />}
        {CompetitionCategory && <CompetitionUploadPage />}
        {StudyCategory && <StudyUploadPage />}
      </div>
    </>
  );
};

export default UploadPostPage;
