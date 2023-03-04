import { useState, useEffect } from 'react';
import { Select } from 'antd';
import Axios from 'axios';

export const Midtag = (prop) => {
  const [options, setOptions] = useState([]);
  const [defaultItem, setdefaultItem] = useState([]);

  const curCategory = async () => {
    try {
      let body = { m_category_Num: prop['data-req'] };
      console.log(body);
      const response = await Axios.post(
        '/api/users/postpage/postpage/aggregate',
        body,
      );

      if (response.status === 200) {
        const newOptions = response.data.map((it) => ({
          value: it._id,
          label: `${it._id} (${it.count})`,
        }));
        setOptions(newOptions);
      } else {
        alert('게시글을 가져오는데 실패했습니다.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    curCategory();
  }, [prop]);

  useEffect(() => {
    const handleResize = () => {
      // 윈도우 화면 조정 시 실행할 코드
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //TODO: 다른 카테고리 누를 때마다 선택된 아이템 초기화 되도록 만들어줄 필요있음  useEffect내에 구현
  return (
    <>
      <Select options={options} defaultValue={defaultItem} />
    </>
  );
};
