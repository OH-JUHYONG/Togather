import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'antd';
import './LandingPage.css';
import NavBar from '../NavBar/NavBar';

// import SearchFeature from './Sections/SearchFeature'; // 검색 기능
import Checkbox from './Sections/CheckBox';
import { m_category_Num } from './Sections/Datas';

import ModalBasic from '../FilterPopup/FIlterPopup'; // 필터 모달창 기능

function LandingPage() {
  const [Postpages, setPostPages] = useState([]); // 여러 게시글을 담을 수 있게 배열 사용
  const [Skip, setSkip] = useState(0);
  // const [Limit, setLimit] = useState(6); // 기본으로 보여주는 postpage 개수
  const [PostSize, setPostSize] = useState();

  //필터 박스 기능
  const [Filters, setFilters] = useState({ m_category_Num: [] });

  //필터 모달창 노충 여부
  const [modalOpen, setModalOpen] = useState(false);

  // 검색 기능
  // const [SearchTerm, setSearchTerm] = useState('');

  // landgin page에 작성한 글들을 모아 볼 수 있게 UploadPostPage에서 작성하고 DB에 저장한 정보를 불러옴
  useEffect(() => {
    let body = {
      skip: Skip,
    };

    getPage(body);
  }, []);

  // TODO: 2번씩 업로드 되는 이유?
  const getPage = (body) => {
    axios.post('/api/users/postpage/postpages', body).then((response) => {
      console.log(response.status);

      if (response.status === 200) {
        // 글 정렬(key: createdAt), 최신글이 먼저 보일 수 있게 설정
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

  const renderCards = Postpages.map((postpage, index) => {
    console.log('postpage', postpage);

    // 교육>>학교 수업 게시글 형태
    if (postpage.m_category_Num === 1) {
      return (
        <a className="landingpage_postpage__a" href={`/post/${postpage._id}`}>
          <li className="landingpage_postpage__li">
            <div className="landingpage-postpage_category">
              {postpage.m_category}
            </div>
            <div className="landingpage-postpage_division">
              {postpage.divison}
            </div>
            <div className="landingpage-postpage_content_title">
              {postpage.title}
            </div>
            <div className="landingpage-postpage_hashtag">
              {postpage.m_hashtag.map((hashtag) => (
                <Button>{hashtag}</Button>
              ))}
            </div>
            <div className="landingpage-postpage_headcount">
              모집 인원: {postpage.headcount}
            </div>
            <div className="landingpage-postpage_deadline">
              마감일: {postpage.day.substring(0, 10)} 까지
            </div>
          </li>
        </a>
      );
    }

    // 교육>>대회&공모전 게시글 형태
    else if (postpage.m_category_Num === 2) {
      return (
        <a className="landingpage_postpage__a" href={`/post/${postpage._id}`}>
          <li className="landingpage_postpage__li">
            <div className="landingpage-postpage_category">
              {postpage.m_category}
            </div>
            <div className="landingpage-postpage_division">
              {postpage.competition}
            </div>
            <div className="landingpage-postpage_content_title">
              {postpage.title}
            </div>
            <div className="landingpage-postpage_hashtag">
              {postpage.m_hashtag.map((hashtag) => (
                <Button>{hashtag}</Button>
              ))}
            </div>
            <div className="landingpage-postpage_headcount">
              모집 인원: {postpage.headcount}
            </div>
            <div className="landingpage-postpage_deadline">
              마감일: {postpage.day.substring(0, 10)} 까지
            </div>
          </li>
        </a>
      );
    }

    //  교육>>스터디 게시글 형태
    else {
      return (
        <a className="landingpage_postpage__a" href={`/post/${postpage._id}`}>
          <li className="landingpage_postpage__li">
            <div className="landingpage-postpage_category">
              {postpage.m_category}
            </div>
            <div className="landingpage-postpage_division">
              {postpage.field}
            </div>
            <div className="landingpage-postpage_content_title">
              {postpage.title}
            </div>
            <div className="landingpage-postpage_hashtag">
              {postpage.m_hashtag.map((hashtag) => (
                <Button>{hashtag}</Button>
              ))}
            </div>
            <div className="landingpage-postpage_headcount">
              모집 인원: {postpage.headcount}
            </div>
            <div className="landingpage-postpage_deadline">
              마감일: {postpage.day.substring(0, 10)} 까지
            </div>
          </li>
        </a>
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

  // 필터 모달창 기능
  const showModal = () => {
    setModalOpen(true);
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
      <NavBar />
      {/* TODO: 필터 박스 적용시 HighCategory를 어떻게 처리할 것인지 생각해보기 
       <HighCategory /> 
       */}

      {/* 필터 박스 */}
      <div style={{ width: '88%', margin: '3rem auto' }}>
        <Checkbox
          className="Category-filter_checklist"
          list={m_category_Num}
          handleFilters={(filters) => handleFilters(filters, 'm_category_Num')}
        />

        {/*필터 모달창*/}
        <button className="landingpage-model_button" onClick={showModal}>
          모달 띄우기
        </button>
        {modalOpen && <ModalBasic setModalOpen={setModalOpen} />}

        {/* TODO: '검색 기능'의 성능을 높이기 위해 어떤 알고리즘을 사용할 것인지
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

        {/* 작성한 게시글을 불러옴 */}
        {/* <Row gutter={[16, 16]}>{renderCards}</Row> */}
        <div className="landingpage_postpage">
          <ul className="landingpage_postpage_list">{renderCards}</ul>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
