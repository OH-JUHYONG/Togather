import React, { useEffect } from 'react';
import axios from 'axios';

// 상>>중 카테고리
import HighCategory from '../Category/HighCategory/HighCategory';

function LandingPage() {
  // landgin page에 작성한 글들을 모아 볼 수 있게 UploadPostPage에서 작성하고 DB에 저장한 정보를 불러옴
  useEffect(() => {
    axios.post('/api/users/postpage/postpages').then((response) => {
      if (response.data.success) {
        console.log(response.data);
      } else {
        alert('게시글을 가져오는데 실패했습니다.');
      }
    });
  });

  return (
    <>
      <HighCategory />
    </>
  );
}

export default LandingPage;
