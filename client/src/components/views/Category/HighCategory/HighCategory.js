import React, { useState } from 'react';
import './HighCategory.css';
import { Button } from 'antd';

// 중 카테고리
import MiddleCategoryEdu from '../MiddleCategory/MiddleCategoryEdu';
import MiddleCategoryHob from '../MiddleCategory/MiddleCategoryHob';
import MiddleCategoryClub from '../MiddleCategory/MiddleCategoryClub';

function HighCategory() {
  const [Eduvisible, setEduvisible] = useState(true);
  const [Hobvisible, setHobvisible] = useState(false);
  const [Clubvisible, setClubvisible] = useState(false);

  const handleEduButtonClick = () => {
    setEduvisible(true);
    setHobvisible(false);
    setClubvisible(false);
  };

  const handleHobButtonClick = () => {
    setEduvisible(false);
    setHobvisible(true);
    setClubvisible(false);

    alert('서비스 준비중입니다.');
  };

  const handleClubButtonClick = () => {
    setEduvisible(false);
    setHobvisible(false);
    setClubvisible(true);

    alert('서비스 준비중입니다.');
  };

  return (
    <>
      <div className="high-category">
        <div className="high-category__name">
          <Button
            className="high-category__button"
            onClick={handleEduButtonClick}
            disabled={Eduvisible}
          >
            교육
          </Button>
        </div>
        <div className="high-category__name">
          <Button
            className="high-category__button"
            onClick={handleHobButtonClick}
            disabled={Hobvisible}
          >
            취미
          </Button>
        </div>
        <div className="high-category__name">
          <Button
            className="high-category__button"
            onClick={handleClubButtonClick}
            disabled={Clubvisible}
          >
            동아리
          </Button>
        </div>
      </div>

      {Eduvisible && <MiddleCategoryEdu />}
      {Hobvisible && <MiddleCategoryHob />}
      {Clubvisible && <MiddleCategoryClub />}
    </>
  );
}

export default HighCategory;
