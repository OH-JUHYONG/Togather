import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

import PostPageInfoEduClass from './Sections/PostPageInfoEduClass';
import PostPageInfoEduCompetition from './Sections/PostPageInfoEduCompetition';
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
    return <PostPageInfoEduClass detail={PostpageInfo} />;
  } else if (PostpageInfo.m_category_Num === 2) {
    return <PostPageInfoEduCompetition detail={PostpageInfo} />;
  } else if (PostpageInfo.m_category_Num === 3) {
    return <PostPageInfoEduStudy detail={PostpageInfo} />;
  }
}

export default DetailUploadPostPage;
