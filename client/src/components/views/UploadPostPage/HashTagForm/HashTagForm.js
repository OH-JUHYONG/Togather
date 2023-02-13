import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';

function HashTagForm() {
  const [HashTag, setHashTag] = useState(''); // 해시 태그
  const [HashTagArr, setHashTagArr] = useState([]); // 해시 태그를 담는 배열

  const hashtagChangeHandler = (event) => setHashTag(event.target.value);
  const hashtagSubmit = (event) => {
    event.preventDefault();
    if (HashTag === '') {
      return;
    }
    setHashTagArr((currentArray) => [HashTag, ...currentArray]);
    setHashTag('');
  };

  return (
    <Form onSubmit={hashtagSubmit}>
      <Input
        onChange={hashtagChangeHandler}
        value={HashTag}
        type="text"
        placeholder="# 해시태그로 본인 / 팀을 소개하세요"
      />
      <Button>추가하기</Button>
      <ul>
        {HashTagArr.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Form>
  );
}

export default HashTagForm;
