import React, { useState, useRef } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { useSelector } from 'react-redux'; // user 정보를 가져오기 위한 설정
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import DatePicker from 'react-datepicker'; // 달려을 가져오기 위한 명령어
import 'react-datepicker/dist/react-datepicker.css';

import HashTagForm from '../HashTagForm/HashTagForm'; // 해시태그 폼
import TextEditor from '../TextEditor/TextEditor'; // TextEditor

// 공통적인 Option
import HeadCountOption from './CommonOption/HeadCountOption'; // 모집인원 option
import ProgessOption from './CommonOption/ProgressOption'; // 진행방식 option
import ContactOption from './CommonOption/ContactOption'; // 연락방법 option

// 대회&공모전에만 있는 Option
import CompetitionOption from './competitionOption/CompetitionOption'; // 대회&공모전 option
// -------------------------------- //

const { Option } = Select; // antd 'Select' 적용하기 위한 Option

const CompetitionUploadPage = () => {
  const user = useSelector((state) => state.user); // 유저 정보를 가져오기 위한 명령어
  const navigate = useNavigate();

  const editorRef = useRef(); // TOAST UI Editor

  const [Competition, setCompetition] = useState(1); // 대회명
  const [Title, setTitle] = useState(''); // 제목
  const [HeadCount, setHeadCount] = useState(1); // 모집 인원
  const [SelectedDate, setSelectedDate] = useState(null); //모집 기한
  const [Progress, setProgress] = useState(1); // 진행 방식
  const [Contact, setContact] = useState(1); // 연락 방법
  const [Contactinfo, setContactinfo] = useState(''); // 연락 정보

  const [tags, setTags] = useState([]); // Child가 사용할 parent의 variable 선언, Parent에서 미리 설정하여 넘겨줌
  const [Description, setDescription] = useState(''); // 상세 설명, 마찬가지로 Child가 사용할 parent의 variable 선언, Parent에서 미리 설정하여 넘겨줌

  const competitionChangeHandler = (key) => {
    setCompetition(key);
  };

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const headcounterChangeHandler = (key) => {
    setHeadCount(key);
  };

  const selectedDateChangeHandler = (date) => {
    setSelectedDate(date);
  };

  const progressChangeHandler = (key) => {
    setProgress(key);
  };

  const contactChangeHandler = (key) => {
    setContact(key);
  };

  const contactinfoChangeHandler = (event) => {
    setContactinfo(event.currentTarget.value);
  };

  const submitHandler = (event) => {
    event.preventDefault(); // 초기화 방지

    if (
      !Competition ||
      !Title ||
      !HeadCount ||
      !Progress ||
      !Contact ||
      !Contactinfo ||
      !Description
    ) {
      return alert('모든 값을 넣어주셔야 합니다.');
    }

    if (Title.length < 5) {
      return alert('제목은 최소 5글자 이상이어야 합니다.');
    }

    if (user && user.userData) {
      const username = user.userData._id;

      // 서버에 채운 값들을 request로 보낸다.
      const body = {
        writer: username, // 로그인 된 사람의 ID
        m_category: '대회&공모전',
        m_category_Num: 2,
        m_hashtag: tags.map((tag) => (tag[0] === '#' ? tag : '#' + tag)), // 해시태그 저장시 '#' 붙여주기 위한 작업
        competition: CompetitionOption[Competition - 1].value,
        title: Title,
        headcount: HeadCountOption[HeadCount - 1].value,
        day: SelectedDate,
        progress: ProgessOption[Progress - 1].value,
        contact: ContactOption[Contact - 1].value,
        contactinfo: Contactinfo,
        description: Description,
      };

      Axios.post('/api/users/postpage', body).then((response) => {
        if (response.status === 200) {
          alert('글 작성이 완료되었습니다.');
          navigate('/');
        } else {
          alert('글 작성이 실패 했습니다.');
        }
      }); //분기점 비교하는 부분 response.data.success에서 response.status로 바꿈
    }
  };

  return (
    <>
      <Form style={{ paddingTop: '30px' }} onSubmit={submitHandler}>
        <Form.Item label="대회&공모전 이름">
          <Select
            style={{ width: '400px' }}
            onChange={competitionChangeHandler}
            value={Competition}
          >
            {CompetitionOption.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="제목">
          <Input
            onChange={titleChangeHandler}
            value={Title}
            placeholder="제목을 입력해 주세요"
          />
        </Form.Item>

        <Form.Item label="모집 인원">
          <Select
            style={{ width: '110px' }}
            onChange={headcounterChangeHandler}
            value={HeadCount}
          >
            {HeadCountOption.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="모집 마감일">
          <DatePicker
            selected={SelectedDate}
            onChange={selectedDateChangeHandler}
          />
        </Form.Item>

        <Form.Item label="진행 방식">
          <Select
            style={{ width: '110px' }}
            onChange={progressChangeHandler}
            value={Progress}
          >
            {ProgessOption.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="연락 방법">
          <Select
            style={{ width: '170px' }}
            onChange={contactChangeHandler}
            value={Contact}
          >
            {ContactOption.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
          <Input
            style={{ width: '500px' }}
            onChange={contactinfoChangeHandler}
            value={Contactinfo}
            placeholder={ContactOption[Contact - 1].placeholder}
          />
        </Form.Item>

        {/* child에게 parent의 변수를 넘겨주기 (child가 사용하도록) */}
        <Form.Item label="해시태그로 본인/팀 소개를 해보세요">
          <HashTagForm tags={tags} setTags={setTags} />
        </Form.Item>

        {/* child에게 parent의 변수를 넘겨주기 (child가 사용하도록) */}
        <Form.Item label="상세 설명">
          <TextEditor
            description={Description}
            setDescription={setDescription}
          />
        </Form.Item>

        <Button style={{ float: 'right' }} onClick={submitHandler}>
          글등록
        </Button>
      </Form>
    </>
  );
};

export default CompetitionUploadPage;
