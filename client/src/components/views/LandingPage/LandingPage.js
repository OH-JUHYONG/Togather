import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Row, Col } from 'antd';

// 상>>중 카테고리
import HighCategory from '../Category/HighCategory/HighCategory';

import Checkbox from './Sections/CheckBox';
import { m_category_Num } from './Sections/Datas';

function LandingPage() {
  const [Postpages, setPostPages] = useState([]); // 여러 게시글을 담을 수 있게 배열 사용
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(6); // 기본으로 보여주는 postpage 개수
  const [PostSize, setPostSize] = useState();

  /*
  필터 박스 기능
  */
  const [Filters, setFilters] = useState({
    m_category_Num: [],
  });

  // landgin page에 작성한 글들을 모아 볼 수 있게 UploadPostPage에서 작성하고 DB에 저장한 정보를 불러옴
  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getPage(body);
  }, []);

  const getPage = (body) => {
    axios.post('/api/users/postpage/postpages', body).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        if (body.loadMore) {
          setPostPages([...Postpages, ...response.data.postpageinfo]);
        } else {
          setPostPages(response.data.postpageinfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert('게시글을 가져오는데 실패했습니다.');
      }
    });
  };

  const loadMoreHandler = () => {
    let skip = Skip + Limit;

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };
    getPage(body);
    setSkip(skip);
  };

  const renderCards = Postpages.map((postpage, index) => {
    console.log('postpage', postpage);
    return (
      <Col lg={8} md={12} xs={24} key={index}>
        <div>
          <div>{postpage.m_category}</div>
          <div>{postpage.divison}</div>
          <div>{postpage.title}</div>
          <div>모집 인원: {postpage.headcount}</div>
        </div>
        <br />
      </Col>
    );
  });

  /*
  필터 박스 기능
  */

  const showFilterResults = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };

    console.log(filters);

    getPage(body);
    setSkip(0);
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;

    showFilterResults(newFilters);
  };

  return (
    <>
      <HighCategory />

      <div style={{ width: '75%', margin: '3rem auto' }}>
        <Checkbox
          list={m_category_Num}
          handleFilters={(filters) => handleFilters(filters, 'm_category_Num')}
        />

        <Row gutter={[16, 16]}>{renderCards}</Row>

        <br />
        <br />

        {PostSize >= Limit && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={loadMoreHandler}>더보기</button>
          </div>
        )}
      </div>
    </>
  );
}

export default LandingPage;
