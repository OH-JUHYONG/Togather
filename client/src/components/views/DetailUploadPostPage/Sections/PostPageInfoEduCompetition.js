import React from 'react';
import { Button, Description } from 'antd';

import './PostPageInfoEdu.css';

function PostPageInfoEduCompetition(props) {
  return (
    <>
      <div className="PostPageInfo_Edu">
        <section className="PostPageInfo_Edu_postheader">
          <div className="PostPageInfo_Edu_title">{props.detail.title}</div>
          <ul className="PostPageInfo_Edu_ul">
            <li className="PostPageInfo_Edu_li">
              <span className="PostPageInfo_Edu_content1">모집 구분</span>
              <span className="PostPageInfo_Edu_content2">
                {props.detail.m_category}
              </span>
            </li>
            <li className="PostPageInfo_Edu_li">
              <span className="PostPageInfo_Edu_content1">대회 명칭</span>
              <span className="PostPageInfo_Edu_content2">
                {props.detail.competition}
              </span>
            </li>
            <li className="PostPageInfo_Edu_li">
              <span className="PostPageInfo_Edu_content1">모집 인원</span>
              <span className="PostPageInfo_Edu_content2">
                {props.detail.headcount}
              </span>
            </li>
            <li className="PostPageInfo_Edu_li">
              <span className="PostPageInfo_Edu_content1">모집 마감</span>
              <span className="PostPageInfo_Edu_content2">
                {props.detail.day.substring(0, 10)} 까지
              </span>
            </li>
            <li className="PostPageInfo_Edu_li">
              <span className="PostPageInfo_Edu_content1">진행 방식</span>
              <span className="PostPageInfo_Edu_content2">
                {props.detail.progress}
              </span>
            </li>
            <li className="PostPageInfo_Edu_li">
              <span className="PostPageInfo_Edu_content1">연락 방법</span>
              <span className="PostPageInfo_Edu_content2">
                {props.detail.contact}({props.detail.contactinfo})
              </span>
            </li>
          </ul>
        </section>
        <div className="PostPageInfo_Edu_detailcontent">
          <h2 className="PostPageInfo_Edu_h2">상세 설명</h2>
          <div className="PostPageInfo_Edu_detail">
            {props.detail.description}
          </div>
        </div>
      </div>
    </>
  );
}

export default PostPageInfoEduCompetition;
