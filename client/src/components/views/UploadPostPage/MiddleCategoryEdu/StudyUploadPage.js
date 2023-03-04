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

// 공통적인 Option
import HeadCountOption from './CommonOption/HeadCountOption'; // 모집인원 option
import ProgessOption from './CommonOption/ProgressOption'; // 진행방식 option
import ContactOption from './CommonOption/ContactOption'; // 연락방법 option

// 스터디에만 있는 Option
import FieldOption from './studyOption/FieldOption';
import TargetOption from './studyOption/TargetOption';
// -------------------------------- //

const { Option } = Select; // antd 'Select' 적용하기 위한 Option

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
        field: FieldOption[Field - 1].value,
        target: TargetOption[Target - 1].value,
        target_Num: Target,
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
        <Form.Item label="분야">
          <Select
            style={{ width: '120px' }}
            onChange={fieldChangeHandler}
            value={Field}
          >
            {FieldOption.map((item) => (
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
            {TargetOption.map((item) => (
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
