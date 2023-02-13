import React, { useState } from 'react';
import './UploadPostPage.css';
import { Button, Form, Input } from 'antd';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
// import HashTagForm from './HashTagForm/HashTagForm';

const { TextArea } = Input;

// 모집 인원 option
const HeadCounts = [
  { key: 1, value: '인원 미정' },
  { key: 2, value: '2명' },
  { key: 3, value: '3명' },
  { key: 4, value: '4명' },
  { key: 5, value: '5명' },
  { key: 6, value: '6명' },
  { key: 7, value: '7명' },
  { key: 8, value: '8명' },
  { key: 9, value: '9명' },
  { key: 10, value: '10명' },
];

// 진행 방식 option
const Progresses = [
  { key: 1, value: '대면' },
  { key: 2, value: '비대면' },
  { key: 3, value: '혼용' },
  { key: 4, value: '추후 결정' },
];

// 연락 방법 option
const Contacts = [
  { key: 1, value: '카카오톡 오픈채팅' },
  { key: 2, value: '디스코드' },
  { key: 3, value: '이메일' },
  { key: 4, value: '전화번호' },
];

const UploadPostPage = () => {
  const [Division, setDivision] = useState(''); // 수업명 / 분반
  const [Title, setTitle] = useState(''); // 제목
  const [HeadCount, setHeadCount] = useState(0); // 모집 인원
  const [StartDate, setStartDate] = useState(new Date()); // 모집 기한
  const [Progress, setProgress] = useState(0); // 진행 방식
  const [Contact, setContact] = useState(0); // 연락 방법
  const [Contactinfo, setContactinfo] = useState(''); // 연락 정보

  const [Description, setDescription] = useState(''); // 상세 설명

  const divisionChangeHandler = (event) =>
    setDivision(event.currentTarget.value);

  const titleChangeHandler = (event) => setTitle(event.currentTarget.value);

  const headcounterChangeHandler = (event) =>
    setHeadCount(event.currentTarget.value);

  const progressChangeHandler = (event) =>
    setProgress(event.currentTarget.value);

  const contactChangeHandler = (event) => setContact(event.currentTarget.value);
  const contactinfoChangeHandler = (event) =>
    setContactinfo(event.currentTarget.value);

  const descriptionChangeHandler = (event) =>
    setDescription(event.currentTarget.value);

  return (
    <>
      <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <Form>
          <div className="high-category">
            <div className="high-category__name">
              <Button>학교 수업</Button>
            </div>
            <div className="high-category__name">
              <Button>대회&공모전</Button>
            </div>
            <div className="high-category__name">
              <Button>스터디</Button>
            </div>
          </div>

          <br />
          <br />
          <label>수업명 / 분반</label>
          <br />
          <Input
            onChange={divisionChangeHandler}
            value={Division}
            placeholder="ex)... 게임혼합현실 / 7분반"
          />
          <br />

          <br />
          <label>제목</label>
          <br />
          <Input
            onChange={titleChangeHandler}
            value={Title}
            placeholder="제목을 입력해 주세요"
          />
          <br />

          <br />
          <label>모집인원</label>
          <select onChange={headcounterChangeHandler} value={HeadCount}>
            {HeadCounts.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
          <br />

          <br />
          <label>모집기한</label>
          <DatePicker
            selected={StartDate}
            onChange={(date) => setStartDate(date)}
          />
          <br />

          <br />
          <label>진행 방식</label>
          <select onChange={progressChangeHandler} value={Progress}>
            {Progresses.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
          <br />

          <br />
          <label>연락 방법</label>
          <select onChange={contactChangeHandler} value={Contact}>
            {Contacts.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
          <br />
          <Input
            onChange={contactinfoChangeHandler}
            value={Contactinfo}
            placeholder="연락처를 입력해 주세요"
          />
          <br />

          <br />
          <label>본인 / 팀 소개(5개 이하)</label>

          <br />
          <label>상세 설명</label>
          <br />
          <TextArea
            style={{ height: '100vh' }}
            onChange={descriptionChangeHandler}
            value={Description}
          />
          <br />

          <br />
          <Button>글등록</Button>
        </Form>
      </div>
    </>
  );
};

export default UploadPostPage;
