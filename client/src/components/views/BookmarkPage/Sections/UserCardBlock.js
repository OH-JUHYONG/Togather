import React from 'react';
import { Col, Row } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import './UserCardBlock.css';

function UserCardBlock(props) {
  const renderItems = () =>
    props.postpages &&
    props.postpages.map((postpage, index) => (
      <Col lg={8} md={12} xs={24} key={index}>
        <div className="landingpage-postpage_div">
          <CloseCircleFilled
            style={{ display: 'flex', justifyContent: 'right' }}
            onClick={() => props.removeItem(postpage._id)}
          />
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

  return <Row gutter={[16, 16]}>{renderItems()}</Row>;
}

export default UserCardBlock;
