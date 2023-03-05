import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

import PostPageInfoEduClass from './Sections/PostPageInfoEduClass';
import PostPageInfoEduCompetition from './Sections/PostPageInfoEduCompetition';
import PostPageInfoEduStudy from './Sections/PostPageInfoEduStudy';

import NavBar from '../NavBar/NavBar';

function DetailUploadPostPage() {
  const { postpageID } = useParams(); // 기존에 user.match.params.postpageID로 params를 가져오는 방식이 useParams로 바뀜
  const [PostpageInfo, setPostpageInfo] = useState({});

  useEffect(() => {
    Axios.get(`/api/users/postpage/postpage_by_id?id=${postpageID}&type=single`)
      .then((response) => {
        setPostpageInfo(response.data[0]);
      })
      .catch((err) => alert(err));
  }, []);

  // TODO: 왜 \n\n가 들어가는지 알아보고 수정
  if (PostpageInfo.description)
    PostpageInfo.description = PostpageInfo.description.replaceAll(
      '\n\n',
      '\n',
    );

  if (PostpageInfo.m_category_Num === 1) {
    return (
      <>
        <NavBar />
        <PostPageInfoEduClass detail={PostpageInfo} />
      </>
    );
  } else if (PostpageInfo.m_category_Num === 2) {
    return (
      <>
        <NavBar />
        <PostPageInfoEduCompetition detail={PostpageInfo} />
      </>
    );
  } else if (PostpageInfo.m_category_Num === 3) {
    return (
      <>
        <NavBar />
        <PostPageInfoEduStudy detail={PostpageInfo} />
      </>
    );
  }
}

export default DetailUploadPostPage;
