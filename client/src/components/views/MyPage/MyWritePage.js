import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import EditPage from './Sections/EditPage';

function MyWritePage() {
  const [OriginData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams(); //  유저 정보를 가져오기 위해
  console.log(id);

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>작성 목록</h1>

      <div>
        <EditPage />
      </div>
    </div>
  );
}

export default MyWritePage;
