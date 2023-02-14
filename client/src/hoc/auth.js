import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

export default function foo(ComposedClass, reload, adminRoute = null) {
  /*
    option의 종류
    
    - null: 아무나 출입이 가능한 페이지
    - true: 로그인한 유저만 출입이 가능한 페이지
    - false: 로그인한 유저는 출입 불가능한 페이지
    */

  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user); // 유저의 정보를 모두 넣어줌

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(async (response) => {
        // 로그인 하지 않은 상태
        if (await !response.payload.isAuth) {
          if (reload) {
            navigate('/login');
          }
        } else {
          // 로그인 한 상태
          if (adminRoute && !response.payload.isAdmin) {
            navigate('/');
          } else {
            if (reload === false) {
              navigate('/');
            }
          }
        }
      });
    }, []);

    return <ComposedClass {...props} user={user} />;
  }

  return <AuthenticationCheck />;
}
