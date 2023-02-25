import React from 'react';
import { Col, Row } from 'antd';

function UserCardBlock(props) {
  const renderItems = () =>
    props.postpages &&
    props.postpages.map((postpage, index) => (
      <Col lg={8} md={12} xs={24} key={index}>
        <div>
          <div>{postpage.m_category}</div>
          <div>{postpage.divison}</div>
          <div>{postpage.title}</div>
          <div>모집 인원: {postpage.headcount}</div>
          <div>마감일: {postpage.day.substring(0, 10)} 까지</div>
        </div>
      </Col>
    ));

  return <Row gutter={[16, 16]}>{renderItems()}</Row>;
}

export default UserCardBlock;
