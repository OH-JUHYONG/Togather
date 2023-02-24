import React from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Menu, Button } from 'antd';

const { SubMenu } = Menu;

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
        alert('로그아웃 하는데 실패 했습니다');
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    // 로그인 안한 경우
    return (
      <div className="beforlogin-state">
        <button onClick={navigateToLogin}>로그인</button>
        <button onClick={navigateToRegister}>회원가입</button>
      </div>
    );
  } else {
    // 로그인 한 경우
    return (
      <div className="afterlogin-state">
        <Menu className="writing_menu" mode="horizontal">
          <SubMenu key="test" title="글쓰기">
            <Menu.ItemGroup title="교육">
              <Menu.Item>
                <a href="/post/upload">학교 수업</a>
              </Menu.Item>
              <Menu.Item>
                <a href="/post/upload">대회&창업</a>
              </Menu.Item>
              <Menu.Item>
                <a href="/post/upload">스터디</a>
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="취미(추후 공개예정)" />
            <Menu.ItemGroup title="동아리(추후 공개예정)" />
          </SubMenu>
        </Menu>

        {/* 
          // 기존 방식
          
          <button className="navbar-dropdown__dropbtn">
            <span></span>
            글쓰기
          </button>
          <div className="navbar-dropdown__dropbtn__content">
            <a href="/post/upload">교육(학교수업, 대회&공모전, 스터디)</a>
            <a href="/">취미(운동, 음악, 미술, 봉사활동, 기타...)</a>
            <a href="/">동아리</a>
          </div> */}
        <Button className="logout_button" onClick={logoutHandler}>
          로그아웃
        </Button>
      </div>
    );
  }
};

export default RightMenu;
