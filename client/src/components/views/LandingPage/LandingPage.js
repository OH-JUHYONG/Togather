import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'antd';

// 상>>중 카테고리
// import HighCategory from '../Category/HighCategory/HighCategory';

// import SearchFeature from './Sections/SearchFeature';
import Checkbox from './Sections/CheckBox';
import { m_category_Num } from './Sections/Datas';

function LandingPage() {
  const [Postpages, setPostPages] = useState([]); // 여러 게시글을 담을 수 있게 배열 사용
  const [Skip, setSkip] = useState(0);
  // const [Limit, setLimit] = useState(6); // 기본으로 보여주는 postpage 개수
  const [PostSize, setPostSize] = useState();

  //필터 박스 기능
  const [Filters, setFilters] = useState({ m_category_Num: [] });

  // 검색 기능
  // const [SearchTerm, setSearchTerm] = useState('');

  // landgin page에 작성한 글들을 모아 볼 수 있게 UploadPostPage에서 작성하고 DB에 저장한 정보를 불러옴
  useEffect(() => {
    let body = {
      skip: Skip,
      // limit: Limit,
    };

    getPage(body);
  }, []);

  // TODO: 2번씩 업로드 되는 이유?
  const getPage = (body) => {
    axios.post('/api/users/postpage/postpages', body).then((response) => {
      console.log(response.status);

      if (response.status === 200) {
        // 글 정렬(key: createdAt)
        response.data.postpageinfo = response.data.postpageinfo.sort((a, b) =>
          b.createdAt < a.createdAt ? -1 : 1,
        );

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

  // 더보기 버튼
  // const loadMoreHandler = () => {
  //   let skip = Skip + Limit; // 기존의 불러온 정보 갯수 + Limit

  //   let body = {
  //     skip: skip,
  //     limit: Limit,
  //     loadMore: true,
  //   };
  //   getPage(body);
  //   setSkip(skip);
  // };

  const renderCards = Postpages.map((postpage, index) => {
    console.log('postpage', postpage);

    // 교육>>학교 수업 게시글 형태
    if (postpage.m_category_Num === 1) {
      return (
        <Col lg={8} md={12} xs={24} key={index}>
          <div>
            <a href={`/post/${postpage._id}`}>
              <div>{postpage.m_category}</div>
              <div>{postpage.divison}</div>
              <div>{postpage.title}</div>
              <div>모집 인원: {postpage.headcount}</div>
              <div>마감일: {postpage.day.substring(0, 10)} 까지</div>
            </a>
          </div>
          <br />
        </Col>
      );
    }

    // 교육>>대회&공모전게시글 형태
    else if (postpage.m_category_Num === 2) {
      return (
        <Col lg={8} md={12} xs={24} key={index}>
          <div>
            <a href={`/post/${postpage._id}`}>
              <div>{postpage.m_category}</div>
              <div>{postpage.competition}</div>
              <div>{postpage.title}</div>
              <div>모집 인원: {postpage.headcount}</div>
              <div>마감일: {postpage.day.substring(0, 10)} 까지</div>
            </a>
          </div>
          <br />
        </Col>
      );
    }

    //  교육>>스터디 게시글 형태
    else {
      return (
        <Col lg={8} md={12} xs={24} key={index}>
          <div>
            <a href={`/post/${postpage._id}`}>
              <div>{postpage.m_category}</div>
              <div>{postpage.field}</div>
              <div>{postpage.title}</div>
              <div>모집 인원: {postpage.headcount}</div>
              <div>마감일: {postpage.day.substring(0, 10)} 까지</div>
            </a>
          </div>
          <br />
        </Col>
      );
    }
  });

  // 필터 박스 기능
  const showFilterResults = (filters) => {
    let body = {
      skip: 0,
      // limit: Limit,
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

  // 검색 기능
  /*
  const updateSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);

    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    setSkip(0);
    setSearchTerm(newSearchTerm);
    getPage(body);
  };
  */

  return (
    <>
      {/* <HighCategory /> */}

      <div style={{ width: '75%', margin: '3rem auto' }}>
        <Checkbox
          list={m_category_Num}
          handleFilters={(filters) => handleFilters(filters, 'm_category_Num')}
        />

        {/* 
        검색 기능
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '1rem auto',
          }}
        >
          <SearchFeature refreshFunction={updateSearchTerm} />
        </div> 
        */}

        <Row gutter={[16, 16]}>{renderCards}</Row>
        <br />
        <br />
        {/* TODO: 더보기 버튼 refactoring
        더보기 버튼
        {PostSize >= Limit && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={loadMoreHandler}>더보기</Button>
          </div>
        )} */}
      </div>
    </>
  );
}

export default LandingPage;
