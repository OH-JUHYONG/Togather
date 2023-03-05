import React, { useState } from 'react';
import './UploadPostPage.css';
import { Button } from 'antd';

import 'react-datepicker/dist/react-datepicker.css';
// import HashTagForm from './HashTagForm/HashTagForm';

import ClassUploadPage from './MiddleCategoryEdu/ClassUploadPage';
import CompetitionUploadPage from './MiddleCategoryEdu/CompetitionUploadPage';
import StudyUploadPage from './MiddleCategoryEdu/StudyUploadPage';

import Navbar from '../NavBar/NavBar';

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
      <Navbar />
      <div className="uploadpostpage">
        <div className="uploadpostpage_Edu_middlecategory">
          <Button
            className="uploadpostpage_Edu_middlecategory__Button"
            onClick={handleClassButtonClick}
            disabled={ClassCategory}
          >
            학교 수업
          </Button>

          <Button
            className="uploadpostpage_Edu_middlecategory__Button"
            onClick={handleCompetitionButtonClick}
            disabled={CompetitionCategory}
          >
            대회&공모전
          </Button>

          <Button
            className="uploadpostpage_Edu_middlecategory__Button"
            onClick={handleStudyButtonClick}
            disabled={StudyCategory}
          >
            스터디
          </Button>
        </div>

        {ClassCategory && <ClassUploadPage />}
        {CompetitionCategory && <CompetitionUploadPage />}
        {StudyCategory && <StudyUploadPage />}
      </div>
    </>
  );
};

export default UploadPostPage;
