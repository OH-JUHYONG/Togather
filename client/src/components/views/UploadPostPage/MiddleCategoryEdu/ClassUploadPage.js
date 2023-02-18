// import React, { useState } from 'react';
// import { Button, Form, Input } from 'antd';
// import DatePicker from 'react-datepicker'; // 달려을 가져오기 위한 명령어
// import Axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// import 'react-datepicker/dist/react-datepicker.css';
// // import HashTagForm from './HashTagForm/HashTagForm';

// const { TextArea } = Input;

// // 모집 인원 option
// const HeadCountArray = [
//   { key: 1, value: '인원 미정' },
//   { key: 2, value: '2명' },
//   { key: 3, value: '3명' },
//   { key: 4, value: '4명' },
//   { key: 5, value: '5명' },
//   { key: 6, value: '6명' },
//   { key: 7, value: '7명' },
//   { key: 8, value: '8명' },
//   { key: 9, value: '9명' },
//   { key: 10, value: '10명' },
// ];

// // 진행 방식 option
// const ProgessArray = [
//   { key: 1, value: '대면' },
//   { key: 2, value: '비대면' },
//   { key: 3, value: '혼용' },
//   { key: 4, value: '추후 결정' },
// ];

// // 연락 방법 option
// const ContactArray = [
//   {
//     key: 1,
//     value: '카카오톡 오픈채팅',
//     placeholder: '오픈 채팅 링크를 입력해주세요.',
//   },
//   { key: 2, value: '디스코드', placeholder: '디스코드 링크를 입력해주세요.' },
//   { key: 3, value: '이메일', placeholder: '이메일 주소를 입력해주세요.' },
//   { key: 4, value: '전화번호', placeholder: '전화번호를 입력해주새요.' },
// ];

// const ClassUploadPage = (props) => {
//   const navigate = useNavigate();

//   const [Division, setDivision] = useState(''); // 수업명 / 분반
//   const [Title, setTitle] = useState(''); // 제목
//   const [HeadCount, setHeadCount] = useState(1); // 모집 인원
//   const [SelectedDate, setSelectedDate] = useState(null); //모집 기한
//   const [Progress, setProgress] = useState(1); // 진행 방식
//   const [Contact, setContact] = useState(1); // 연락 방법
//   const [Contactinfo, setContactinfo] = useState(''); // 연락 정보

//   const [Description, setDescription] = useState(''); // 상세 설명

//   const divisionChangeHandler = (event) => {
//     setDivision(event.currentTarget.value);
//   };

//   const titleChangeHandler = (event) => {
//     setTitle(event.currentTarget.value);
//   };

//   const headcounterChangeHandler = (event) => {
//     setHeadCount(event.currentTarget.value);
//   };

//   const selectedDateChangeHandler = (date) => {
//     setSelectedDate(date);
//   };

//   const progressChangeHandler = (event) => {
//     setProgress(event.currentTarget.value);
//   };

//   const contactChangeHandler = (event) => {
//     setContact(event.currentTarget.value);
//   };

//   const contactinfoChangeHandler = (event) => {
//     setContactinfo(event.currentTarget.value);
//   };

//   const descriptionChangeHandler = (event) => {
//     setDescription(event.currentTarget.value);
//   };

//   const submitHandler = (event) => {
//     event.preventDefault(); // 초기화 방지

//     if (
//       !Division ||
//       !Title ||
//       !HeadCount ||
//       !Progress ||
//       !Contact ||
//       !Contactinfo ||
//       !Description
//     ) {
//       return alert('모든 값을 넣어주셔야 합니다.');
//     }

//     if (Division.length < 5) {
//       return alert('수업명 / 분반은 최소 5글자 이상이어야 합니다.');
//     }

//     if (Title.length < 5) {
//       return alert('제목은 최소 5글자 이상이어야 합니다.');
//     }

//     // 서버에 채운 값들을 request로 보낸다.
//     const body = {
//       // 로그인 된 사람의 ID
//       writer: props.user.userData._id,
//       m_category: '학교 수업',
//       divison: Division,
//       title: Title,
//       headcount: HeadCountArray[HeadCount - 1].value,
//       day: SelectedDate,
//       progress: ProgessArray[Progress - 1].value,
//       contact: ContactArray[Contact - 1].value,
//       contactinfo: Contactinfo,
//       description: Description,
//     };

//     Axios.post('/api/users/postpage', body).then((response) => {
//       if (response.status === 200) {
//         alert('글 작성이 완료되었습니다.');
//         navigate('/');
//       } else {
//         alert('글 작성이 실패 했습니다.');
//       }
//     }); //분기점 비교하는 부분 response.data.success에서 response.status로 바꿈
//   };

//   return (
//     <>
//       <Form onSubmit={submitHandler}>
//         <br />
//         <br />
//         <label>수업명 / 분반</label>
//         <br />
//         <Input
//           onChange={divisionChangeHandler}
//           value={Division}
//           placeholder="ex)... 게임혼합현실 / 7분반"
//         />
//         <br />

//         <br />
//         <label>제목</label>
//         <br />
//         <Input
//           onChange={titleChangeHandler}
//           value={Title}
//           placeholder="제목을 입력해 주세요"
//         />
//         <br />

//         <br />
//         <label>모집인원</label>
//         <select onChange={headcounterChangeHandler} value={HeadCount}>
//           {HeadCountArray.map((item) => (
//             <option key={item.key} value={item.key}>
//               {item.value}
//             </option>
//           ))}
//         </select>
//         <br />

//         <br />
//         <label>모집기한</label>
//         <DatePicker
//           selected={SelectedDate}
//           onChange={selectedDateChangeHandler}
//         />
//         <br />

//         <br />
//         <label>진행 방식</label>
//         <select onChange={progressChangeHandler} value={Progress}>
//           {ProgessArray.map((item) => (
//             <option key={item.key} value={item.key}>
//               {item.value}
//             </option>
//           ))}
//         </select>
//         <br />

//         <br />
//         <label>연락 방법</label>
//         <select onChange={contactChangeHandler} value={Contact}>
//           {ContactArray.map((item) => (
//             <option key={item.key} value={item.key}>
//               {item.value}
//             </option>
//           ))}
//         </select>
//         <br />
//         <Input
//           onChange={contactinfoChangeHandler}
//           value={Contactinfo}
//           placeholder={ContactArray[Contact - 1].placeholder}
//         />
//         <br />

//         <br />
//         <label>상세 설명</label>

//         <br />
//         <TextArea
//           style={{ height: '100vh' }}
//           onChange={descriptionChangeHandler}
//           value={Description}
//         />
//         <br />

//         <br />
//         <Button onClick={submitHandler}>글등록</Button>
//       </Form>
//     </>
//   );
// };

// export default ClassUploadPage;
