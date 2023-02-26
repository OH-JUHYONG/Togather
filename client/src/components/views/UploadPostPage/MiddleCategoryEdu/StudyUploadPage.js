import React, { useState, useRef } from 'react';
import { Button, Form, Input, Select } from 'antd';
import DatePicker from 'react-datepicker'; // 달려을 가져오기 위한 명령어
import Axios from 'axios';
import { useSelector } from 'react-redux'; // user 정보를 가져오기 위한 설정
import { useNavigate } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css'; // 날짜 출력 template
import HashTagForm from '../HashTagForm/HashTagForm'; // 해시태그 폼

// Text Editor(TOAST UI Editor)
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'; // 플러그인 추가(Color picker)
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr'; // 기본언어 영어를 한국어로 바꿔줌
// -------------------------------- //

const { Option } = Select; // antd 'Select' 적용하기 위한 Option

// 스터디 분야 option
const FieldArray = [
  { key: 1, value: '어학' },
  { key: 2, value: '취업' },
  { key: 3, value: '프로그래밍' },
  { key: 4, value: '고시/공무원' },
  { key: 5, value: 'IT 프로젝트' },
  { key: 6, value: '편입' },
  { key: 7, value: '자격증' },
  { key: 8, value: '취양/교양' },
  { key: 9, value: '기타' },
];

const TargetArray = [
  { key: 1, value: '제한없음' },
  { key: 2, value: '1학년만' },
  { key: 3, value: '1학년 이상' },
  { key: 4, value: '2학년만' },
  { key: 5, value: '2학년 이상' },
  { key: 6, value: '3학년만' },
  { key: 7, value: '3학년 이하' },
  { key: 8, value: '4학년만' },
  { key: 9, value: '4학년 이하' },
  { key: 10, value: '4학년 이상' },
  { key: 11, value: '4학년 이상' },
  { key: 12, value: '취준생/졸업생' },
  { key: 13, value: '기타' },
];

// 모집 인원 option
const HeadCountArray = [
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
  { key: 11, value: '제한없음' },
];

// 진행 방식 option
const ProgessArray = [
  { key: 1, value: '대면' },
  { key: 2, value: '비대면' },
  { key: 3, value: '혼용' },
  { key: 4, value: '추후 결정' },
];

// 연락 방법 option
const ContactArray = [
  {
    key: 1,
    value: '카카오톡 오픈채팅',
    placeholder: '오픈 채팅 링크를 입력해주세요.',
  },
  { key: 2, value: '디스코드', placeholder: '디스코드 링크를 입력해주세요.' },
  { key: 3, value: '이메일', placeholder: '이메일 주소를 입력해주세요.' },
  { key: 4, value: '전화번호', placeholder: '전화번호를 입력해주새요.' },
];

const ClassUploadPage = () => {
  const user = useSelector((state) => state.user); // 유저 정보를 가져오기 위한 명령어
  const navigate = useNavigate();

  const editorRef = useRef(); // TOAST UI Editor

  const [Field, setField] = useState(1); // 분야
  const [Title, setTitle] = useState(''); // 제목
  const [Target, setTarget] = useState(1); // 모집 대상
  const [HeadCount, setHeadCount] = useState(1); // 모집 인원
  const [SelectedDate, setSelectedDate] = useState(null); //모집 기한
  const [Progress, setProgress] = useState(1); // 진행 방식
  const [Contact, setContact] = useState(1); // 연락 방법
  const [Contactinfo, setContactinfo] = useState(''); // 연락 정보

  const [Description, setDescription] = useState(''); // 상세 설명

  const [tags, setTags] = useState([]); // Child가 사용할 parent의 variable 선언, Parent에서 미리 설정하여 넘겨줌

  const fieldChangeHandler = (key) => {
    setField(key);
  };

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const targetChangeHandler = (key) => {
    setTarget(key);
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

  // Tosat UI
  const descriptionChangeHandler = () => {
    const data = editorRef.current.getInstance().getHTML();
    setDescription(data);
  };

  const submitHandler = (event) => {
    event.preventDefault(); // 초기화 방지

    if (
      !Target ||
      !Field ||
      !Title ||
      !HeadCount ||
      !Progress ||
      !SelectedDate ||
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
        m_category: '스터디',
        m_category_Num: 3,
        m_hashtag: tags.map((tag) => (tag[0] === '#' ? tag : '#' + tag)), // 해시태그 저장시 '#' 붙여주기 위한 작업
        field: FieldArray[Field - 1].value,
        target: TargetArray[Target - 1].value,
        target_Num: Target,
        title: Title,
        headcount: HeadCountArray[HeadCount - 1].value,
        day: SelectedDate,
        progress: ProgessArray[Progress - 1].value,
        contact: ContactArray[Contact - 1].value,
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
        <Form.Item label="분야">
          <Select
            style={{ width: '120px' }}
            onChange={fieldChangeHandler}
            value={Field}
          >
            {FieldArray.map((item) => (
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

        <Form.Item label="모집 대상">
          <Select
            style={{ width: '130px' }}
            onChange={targetChangeHandler}
            value={Target}
          >
            {TargetArray.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="모집 인원">
          <Select
            style={{ width: '110px' }}
            onChange={headcounterChangeHandler}
            value={HeadCount}
          >
            {HeadCountArray.map((item) => (
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
            {ProgessArray.map((item) => (
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
            {ContactArray.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
          <Input
            style={{ width: '500px' }}
            onChange={contactinfoChangeHandler}
            value={Contactinfo}
            placeholder={ContactArray[Contact - 1].placeholder}
          />
        </Form.Item>

        {/* child에게 parent의 변수를 넘겨주기 (child가 사용하도록) */}
        <Form.Item label="해시태그로 본인/팀 소개를 해보세요">
          <HashTagForm tags={tags} setTags={setTags} />
        </Form.Item>

        <Form.Item label="상세 설명">
          <Editor
            placeholder="상세한 설명을 해주세요!"
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={false}
            plugins={[colorSyntax]}
            onChange={descriptionChangeHandler}
            language="ko-KR"
            hideModeSwitch="true" // 'markdown' 'wysiwyg' 중 한가지 타입만 사용하고 싶을때
            ref={editorRef} // 작업한 텍스트를 가져오기 위한 ref
          />
        </Form.Item>

        <Button style={{ float: 'right' }} onClick={submitHandler}>
          글등록
        </Button>
      </Form>
    </>
  );
};

export default ClassUploadPage;
