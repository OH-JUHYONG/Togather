import React, { useEffect } from 'react';


import MyWritePage from './Sections/MyWritePage';
import NavBar from '../NavBar/NavBar';

function MyPage() {
  
    return (
      <>
        <NavBar />

        <div style={{ width: '85%', margin: '3rem auto' }}>
          <h1>작성 목록</h1>

          <div>
            <MyWritePage />
          </div>
        </div>
      </>
    );
}

export default MyPage;
