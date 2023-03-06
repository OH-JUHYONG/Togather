import React from 'react';
import { Button } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

function UserCardBlock(props) {
  function renderItems() {
    return (
      props.postpages &&
      props.postpages.map((postpage, index) => {
        if (postpage.m_category_Num === 1) {
          return (
            <div key={index}>
              <CloseCircleFilled
                style={{ display: 'flex', justifyContent: 'right' }}
                onClick={() => props.removeItem(postpage._id)}
              />
              <a
                className="bookmarkpage-postpage_a"
                href={`/post/${postpage._id}`}
              >
                <li className="bookmarkpage-postpage_li">
                  <div className="bookmarkpage-postpage_category">
                    {postpage.m_category}
                  </div>
                  <div className="bookmarkpage-postpage_division">
                    {postpage.divison}
                  </div>
                  <div className="bookmarkpage-postpage_content_title">
                    {postpage.title}
                  </div>
                  <div className="bookmarkpage-postpage_hashtag">
                    {postpage.m_hashtag.map((hashtag) => (
                      <Button>{hashtag}</Button>
                    ))}
                  </div>
                  <div className="bookmarkpage-postpage_headcount">
                    모집 인원: {postpage.headcount}
                  </div>
                  <div className="bookmarkpage-postpage_deadline">
                    마감일: {postpage.day.substring(0, 10)} 까지
                  </div>
                </li>
              </a>
            </div>
          );
        } else if (postpage.m_category_Num === 2) {
          return (
            <div key={index}>
              <CloseCircleFilled
                style={{ display: 'flex', justifyContent: 'right' }}
                onClick={() => props.removeItem(postpage._id)}
              />
              <a
                className="bookmarkpage-postpage_a"
                href={`/post/${postpage._id}`}
              >
                <li className="bookmarkpage-postpage_li">
                  <div className="bookmarkpage-postpage_category">
                    {postpage.m_category}
                  </div>
                  <div className="bookmarkpage-postpage_division">
                    {postpage.competition}
                  </div>
                  <div className="bookmarkpage-postpage_content_title">
                    {postpage.title}
                  </div>
                  <div className="bookmarkpage-postpage_hashtag">
                    {postpage.m_hashtag.map((hashtag) => (
                      <Button>{hashtag}</Button>
                    ))}
                  </div>
                  <div className="bookmarkpage-postpage_headcount">
                    모집 인원: {postpage.headcount}
                  </div>
                  <div className="bookmarkpage-postpage_deadline">
                    마감일: {postpage.day.substring(0, 10)} 까지
                  </div>
                </li>
              </a>
            </div>
          );
        } else {
          return (
            <div key={index}>
              <CloseCircleFilled
                style={{ display: 'flex', justifyContent: 'right' }}
                onClick={() => props.removeItem(postpage._id)}
              />
              <a
                className="bookmarkpage-postpage_a"
                href={`/post/${postpage._id}`}
              >
                <li className="bookmarkpage-postpage_li">
                  <div className="bookmarkpage-postpage_category">
                    {postpage.m_category}
                  </div>
                  <div className="bookmarkpage-postpage_division">
                    {postpage.field}
                  </div>
                  <div className="bookmarkpage-postpage_content_title">
                    {postpage.title}
                  </div>
                  <div className="bookmarkpage-postpage_hashtag">
                    {postpage.m_hashtag.map((hashtag) => (
                      <Button>{hashtag}</Button>
                    ))}
                  </div>
                  <div className="bookmarkpage-postpage_headcount">
                    모집 인원: {postpage.headcount}
                  </div>
                  <div className="bookmarkpage-postpage_deadline">
                    마감일: {postpage.day.substring(0, 10)} 까지
                  </div>
                </li>
              </a>
            </div>
          );
        }
      })
    );
  }

  return renderItems();
}

export default UserCardBlock;
