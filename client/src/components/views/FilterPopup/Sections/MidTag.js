import { useState, useEffect } from 'react';
import { Select } from 'antd';
import Axios from 'axios';

const Midtag = (prop) => {
  const [options, setOptions] = useState([]);
  const [defaultItem, setdefaultItem] = useState();

  const curCategory = async () => {
    try {
      let body = { m_category_Num: prop['data-req'] };
      const response = await Axios.post(
        '/api/users/postpage/postpage/aggregate',
        body,
      );
      console.log(response);
      if (response.status === 200) {
        const newOptions = response.data.map((it) => ({
          value: it._id,
          label: `${it._id} (${it.count})`,
        }));
        setOptions(newOptions);
        setdefaultItem(null);
      } else {
        alert('게시글을 가져오는데 실패했습니다.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    curCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop['data-req']]);

  useEffect(() => {
    prop.setValue(defaultItem);
  }, [prop['isSubmmit'], defaultItem]); //TODO:나중에 의존성 배열에 제출버튼을 추가하여 제출할때만 부모에게 데이터가 전달되도록 구현

  //TODO: 윈도우 리사이즈시마다 useEffect가 지속적으로 호출되는 현상 막을 필요있음
  return (
    <>
      <Select
        options={options}
        value={defaultItem}
        onChange={(value) => setdefaultItem(value)}
        placeholder="해당 태그를 선택하세요."
      />
    </>
  );
};

export default Midtag;
