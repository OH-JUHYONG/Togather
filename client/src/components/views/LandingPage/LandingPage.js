import React, { useState } from 'react';
import './LandingPage.css';

import MiddleCategoryEdu from '../Category/MiddleCategoryEdu';
import MiddleCategoryHob from '../Category/MiddleCategoryHob';
import MiddleCategoryClub from '../Category/MiddleCategoryClub';

function LandingPage() {
  const [visibleEdu, setVisibleEdu] = useState(false);
  const [visibleHob, setVisibleHob] = useState(false);
  const [visibleClub, setVisibleClub] = useState(false);

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
          <span
            onClick={() => {
              setVisibleHob(!visibleHob);
            }}
          >
            취미
          </span>
        </div>
        <div className="high-category__name">
          <span
            onClick={() => {
              setVisibleClub(!visibleClub);
            }}
          >
            동아리
          </span>
        </div>
      </div>

      {visibleEdu && <MiddleCategoryEdu />}
      {visibleHob && <MiddleCategoryHob />}
      {visibleClub && <MiddleCategoryClub />}
    </>
  );
}

export default LandingPage;
