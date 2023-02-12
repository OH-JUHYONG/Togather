import React, { useState } from 'react';
import './LandingPage.css';

import MiddleCategoryEdu from '../Category/MiddleCategoryEdu';

function LandingPage() {
  const [visibleEdu, setVisibleEdu] = useState(false);

  const alertPage = () => {
    alert('서비스 준비 중입니다.');
  };
  return (
    <>
      <div className="high-category">
        <div className="high-category__name">
          <button
            className="high-category__button"
            onClick={() => {
              setVisibleEdu(!visibleEdu);
            }}
          >
            교육
          </button>
        </div>
        <div className="high-category__name">
          <span onClick={alertPage}>취미</span>
        </div>
        <div className="high-category__name">
          <span onClick={alertPage}>동아리</span>
        </div>
      </div>
      {visibleEdu && <MiddleCategoryEdu />}
    </>
  );
}

export default LandingPage;
