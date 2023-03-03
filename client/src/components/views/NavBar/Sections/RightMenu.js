import React from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Menu, Button, Badge } from 'antd';
import { HeartFilled } from '@ant-design/icons';

const { SubMenu } = Menu;

const RightMenu = () => {
  const user = useSelector((state) => state.user); // 유저 정보를 가져오기 위한 코드
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
          <SubMenu
            key="test"
            title="글쓰기"
            style={{ fontSize: '18px', fontWeight: 600 }}
          >
            <Menu.ItemGroup title="교육">
              <Menu.Item>
                <a href="/post/upload">학교 수업 / 대회&창업 / 스터디</a>
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="취미(추후 공개예정)" />
            <Menu.ItemGroup title="동아리(추후 공개예정)" />
          </SubMenu>
        </Menu>

        <Button className="my_writing_page">
          <a href="/mywritepage">내 게시물</a>
        </Button>

        <div style={{ paddingBottom: 5 }}>
          <Badge
            style={{ marginTop: 10 }}
            count={user.userData && user.userData.bookmark.length}
          >
            <a
              href="/users/bookmark"
              style={{ color: '#66777', marginRight: 2 }}
            >
              <HeartFilled
                style={{ color: '#ff7875', fontSize: 25, marginTop: 10 }}
              />
            </a>
          </Badge>
        </div>

        <Button className="logout_button" onClick={logoutHandler}>
          로그아웃
        </Button>
      </div>
    );
  }
};

export default RightMenu;
