import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import axios from 'axios';

import MiddleCategoryEdu from '../Category/MiddleCategoryEdu';
import MiddleCategoryHob from '../Category/MiddleCategoryHob';
import MiddleCategoryClub from '../Category/MiddleCategoryClub';

function LandingPage() {
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
  };

  const handleClubButtonClick = () => {
    setEduvisible(false);
    setHobvisible(false);
    setClubvisible(true);
  };

  // landgin page에 작성한 글들을 모아 볼 수 있게 UploadPostPage에서 작성하고 DB에 저장한 정보를 불러옴
  useEffect(() => {
    axios.post('/api/users/postpage/postpages').then((response) => {
      if (response.data.success) {
        console.log(response.data);
      } else {
        alert('게시글을 가져오는데 실패했습니다.');
      }
    });
  });

  return (
    <>
      <div className="high-category">
        <div className="high-category__name">
          <button
            className="high-category__button"
            onClick={handleEduButtonClick}
            disabled={Eduvisible}
          >
            교육
          </button>
        </div>
        <div className="high-category__name">
          <button
            className="high-category__button"
            onClick={handleHobButtonClick}
            disabled={Hobvisible}
          >
            취미
          </button>
        </div>
        <div className="high-category__name">
          <button
            className="high-category__button"
            onClick={handleClubButtonClick}
            disabled={Clubvisible}
          >
            동아리
          </button>
        </div>
      </div>

      {Eduvisible && <MiddleCategoryEdu />}
      {Hobvisible && <MiddleCategoryHob />}
      {Clubvisible && <MiddleCategoryClub />}
    </>
  );
}

export default LandingPage;
