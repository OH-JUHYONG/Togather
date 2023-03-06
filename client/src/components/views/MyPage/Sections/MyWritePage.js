import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'antd';
import Axios from 'axios';

function MyWritePage() {
  const user = useSelector((state) => state.user); // 유저 정보를 가져오기 위한 명령어
  const [PostpageInfo, setPostpageInfo] = useState([]);
  const [User, setUser] = useState(user);

  useEffect(() => {
    if (User && User.userData) {
      Axios.get(
        `/api/users/postpage/postpage_by_id?id=${user.userData._id}&type=single&attribute=writer`,
      )
        .then((response) => {
          setPostpageInfo(response.data);
        })
        .catch((err) => alert(err));
    }
  }, []);

  const renderItems = () =>
    PostpageInfo &&
    PostpageInfo.map((postpage, index) => (
      <Col lg={8} md={12} xs={24} key={index}>
        <div className="landingpage-postpage_div">
          {/* 클릭시 해당 글로 넘어갈 수 있게 설정 */}
          <a className="landingpage-postpage_a" href={`/post/${postpage._id}`}>
            <div className="landingpage-postpage_category">
              {postpage.m_category}
            </div>
            <div className="landingpage-postpage_division">
              {postpage.field}
            </div>
            <div className="landingpage-postpage_content_title">
              {postpage.title}
            </div>
            <div className="landingpage-postpage_content">
              모집 인원: {postpage.headcount}
            </div>
            <div className="landingpage-postpage_content">
              마감일: {postpage.day.substring(0, 10)} 까지
            </div>
          </a>
        </div>
      </Col>
    ));

  return <div>{renderItems()} </div>;
}

export default MyWritePage;
