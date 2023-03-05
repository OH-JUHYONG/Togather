import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  getbookmarkItems,
  removeBookmarkItem,
} from '../../../_actions/user_action';
import NavBar from '../NavBar/NavBar';
import UserCardBlock from './Sections/UserCardBlock';

function BookmarkPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    let bookmarkItems = [];
    // 리덕스 User state안에 bookmark 안에 글이 들어있는지 확인
    if (props.user.userData && props.user.userData.bookmark) {
      if (props.user.userData.bookmark.length > 0) {
        props.user.userData.bookmark.forEach((item) => {
          bookmarkItems.push(item.id);
        });
        dispatch(getbookmarkItems(bookmarkItems, props.user.userData.bookmark));
      }
    }
  }, [props.user.userData]);

  // 북마크에 저장된 글 삭제
  const removeFromBookmark = (postpageId) => {
    dispatch(removeBookmarkItem(postpageId)).then((response) => {});
  };

  return (
    <>
      <NavBar />

      <div style={{ width: '85%', margin: '3rem auto' }}>
        <h1>저장 목록</h1>

        <div>
          <UserCardBlock
            postpages={props.user.postpagedetail}
            removeItem={removeFromBookmark}
          />
        </div>
      </div>
    </>
  );
}

export default BookmarkPage;
