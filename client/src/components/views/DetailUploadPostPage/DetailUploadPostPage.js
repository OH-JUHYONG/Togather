import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

import PostPageInfoEduClass from './Sections/PostPageInfoEduClass';
import PostPageInfoEduStudy from './Sections/PostPageInfoEduStudy';

import { Row, Col } from 'antd';

function DetailUploadPostPage() {
  const { postpageID } = useParams(); // 기존에 user.match.params.postpageID로 params를 가져오는 방식이 useParams로 바뀜
  const [PostpageInfo, setPostpageInfo] = useState({});

  useEffect(() => {
    Axios.get(
      `/api/users/postpage/postpage_by_id?id=${postpageID}&type=single`,
    ).then((response) => {
      if (response.status === 200) {
        console.log('response.data', response.data);
        setPostpageInfo(response.data.postpageInfo[0]);
      } else {
        alert('게시글 정보 가져오기를 실패했습니다.');
      }
    });
  }, []);

  if (PostpageInfo.m_category_Num === 1) {
    return (
      <div style={{ width: '100%', padding: '3rem 4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>{PostpageInfo.title}</h1>
        </div>
        <br />
        <Row gutter={[16, 16]}>
          <Col lg={12} sm={24}>
            <PostPageInfoEduClass detail={PostpageInfo} />
          </Col>
        </Row>
      </div>
    );
  } else if (PostpageInfo.m_category_Num === 3) {
    return (
      <div style={{ width: '100%', padding: '3rem 4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>{PostpageInfo.title}</h1>
        </div>
        <br />
        <Row gutter={[16, 16]}>
          <Col lg={12} sm={24}>
            <PostPageInfoEduStudy detail={PostpageInfo} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DetailUploadPostPage;
