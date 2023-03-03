import React, { useState } from 'react';
import { Button, Description } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './PostPageInfoEdu.css';

// 북마크 기능
import { useDispatch } from 'react-redux';
import { addToBookmark } from '../../../../_actions/user_action';

// 로그인 안한 상태로 북마크 클릭시 '로그인 페이지'로 이동
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// --- Toast UI -> 출력 하는 방법  --- //
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
function ContentsViewer({ contents }) {
  return <Viewer initialValue={contents || ''} />;
}
// -------------------------------- //

function PostPageInfoEduStudy(props) {
  const [IsClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user); // 로그인 여부 파악
  const navigate = useNavigate();

  const getbookmarkhandler = () => {
    // 로그인 안한 상태에서 북마크 클릭시 '로그인 페이지'로 이동
    if (user.userData && !user.userData.isAuth) {
      alert('로그인을 하셔야 합니다.');
      navigate('/login');
    }

    setIsClicked(!IsClicked); // 클림함에 따라 색이 바뀜
    dispatch(addToBookmark(props.detail._id)); // 저장하고 싶은 글을 bookmark에 넣어줌
  };

  const removebookmarkhandler = () => {
    setIsClicked(!IsClicked);
  };

  return (
    <>
      <div className="PostPageInfo_Edu">
        <section className="PostPageInfo_Edu_postheader">
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            {IsClicked === false ? (
              <HeartOutlined
                style={{ fontSize: '30px', color: '#ff7875' }}
                onClick={getbookmarkhandler}
              />
            ) : (
              <HeartFilled
                onClick={removebookmarkhandler}
                style={{ fontSize: '30px', color: '#ff7875' }}
              />
            )}
          </div>
          <div className="PostPageInfo_Edu_title">{props.detail.title}</div>
          <ul className="PostPageInfo_Edu_ul">
            <li className="PostPageInfo_Edu_li">
              <span className="PostPageInfo_Edu_content1">모집 구분</span>
              <span className="PostPageInfo_Edu_content2">
                {props.detail.m_category}
              </span>
            </li>
            <li className="PostPageInfo_Edu_li">
              <span className="PostPageInfo_Edu_content1">모집 분야</span>
              <span className="PostPageInfo_Edu_content2">
                {props.detail.field}
              </span>
            </li>
            <li className="PostPageInfo_Edu_li">
              <span className="PostPageInfo_Edu_content1">모집 대상</span>
              <span className="PostPageInfo_Edu_content2">
                {props.detail.target}
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
          <ul>
            {props.detail.m_hashtag.map((hashtag) => (
              <li>{hashtag}</li>
            ))}
          </ul>
        </section>
        <div className="PostPageInfo_Edu_detailcontent">
          <h2 className="PostPageInfo_Edu_h2">상세 설명</h2>
          <div className="PostPageInfo_Edu_detail display-linebreak">
            <ContentsViewer contents={props.detail.description} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PostPageInfoEduStudy;
