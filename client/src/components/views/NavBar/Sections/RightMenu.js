import React from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RightMenu = () => {
   const user = useSelector((state) => state.user);
   const navigate = useNavigate();

   const navigateToLogin = () => {
      navigate('/login');
   };

   const navigateToRegister = () => {
      navigate('/register');
   };

   const logoutHandler = () => {
      axios.get(`${USER_SERVER}/logout`).then((response) => {
         if (response.status === 200) {
            navigate('/login');
         } else {
            alert('Log out Failed');
         }
      });
   };

   if (user.userData && !user.userData.isAuth) {
      return (
         <div>
            <button onClick={navigateToLogin}>로그인</button>
            <button onClick={navigateToRegister}>회원가입</button>
         </div>
      );
   } else {
      return (
         <div>
            <div className="navbar-dropdown">
               <button className="navbar-dropdown__dropbtn">
                  <span></span>
                  글쓰기
               </button>
               <div className="navbar-dropdown__dropbtn__content">
                  <a href="/">교육(학교수업, 대회&공모전, 스터디)</a>
                  <a href="/">취미(운동, 음악, 미술, 엑티비티, 기타)</a>
                  <a href="/">동아리</a>
               </div>
            </div>
            <button onClick={logoutHandler}>Logout</button>
         </div>
      );
   }
};

export default RightMenu;
