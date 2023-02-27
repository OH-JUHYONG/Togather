import React from 'react';
import { Col, Row } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

function UserCardBlock(props) {
  const renderItems = () =>
    props.postpages &&
    props.postpages.map((postpage, index) => (
      <Col key={index}>
        <div>
          <CloseCircleFilled
            style={{ display: 'flex', justifyContent: 'right' }}
            onClick={() => props.removeItem(postpage._id)}
          />
          {/* 클릭시 해당 글로 넘어갈 수 있게 설정 */}
          <a href={`/post/${postpage._id}`}>
            <div>{postpage.m_category}</div>
            <div>{postpage.divison}</div>
            <div>{postpage.title}</div>
            <div>모집 인원: {postpage.headcount}</div>
            <div>마감일: {postpage.day.substring(0, 10)} 까지</div>
          </a>
        </div>
      </Col>
    ));

  return <Row gutter={[16, 16]}>{renderItems()}</Row>;
}

export default UserCardBlock;
