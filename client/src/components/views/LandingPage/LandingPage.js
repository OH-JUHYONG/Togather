import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'antd';
import Meta from 'antd/lib/card/Meta';

// 상>>중 카테고리
import HighCategory from '../Category/HighCategory/HighCategory';

function LandingPage() {
  const [Postpages, setPostPages] = useState([]); // 여러 게시글을 담을 수 있게 배열 사용

  // landgin page에 작성한 글들을 모아 볼 수 있게 UploadPostPage에서 작성하고 DB에 저장한 정보를 불러옴
  useEffect(() => {
    axios.post('/api/users/postpage/postpages').then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        setPostPages(response.data.postpageinfo);
      } else {
        alert('게시글을 가져오는데 실패했습니다.');
      }
    });
  }, []);

  const renderCards = Postpages.map((postpage, index) => {
    console.log('postpage', postpage);
    return (
      <Col lg={8} md={12} xs={24} key={index}>
        <div>
          <div>{postpage.m_category}</div>
          <div>{postpage.divison}</div>
          <div>{postpage.title}</div>
          <div>모집 인원 {postpage.headcount}</div>
        </div>
        <br />
      </Col>
    );
  });

  return (
    <>
      <HighCategory />

      <div style={{ width: '75%', margin: '3rem auto' }}>
        <Row gutter={[16, 16]}>{renderCards}</Row>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button>더보기</button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
