import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Space, Tag, theme, Tooltip } from 'antd';

function HashTagForm() {
  const { token } = theme.useToken();
  const [tags, setTags] = useState(['5개이하', '#무임승차거부']);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };

  const tagInputStyle = {
    width: 78,
    verticalAlign: 'top',
  };

  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };

  return (
    <Space size={[0, 8]} wrap>
      <Space size={[0, 8]} wrap>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInputRef}
                key={tag}
                size="middle"
                style={tagInputStyle}
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag
              key={tag}
              closable={index !== 0}
              style={{
                userSelect: 'none',
              }}
              onClose={() => handleClose(tag)}
            >
              <span
                onDoubleClick={(e) => {
                  if (index !== 0) {
                    setEditInputIndex(index);
                    setEditInputValue(tag);
                    e.preventDefault();
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
      </Space>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="middle"
          style={tagInputStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag style={tagPlusStyle} onClick={showInput}>
          <PlusOutlined /> 해시태그 입력
        </Tag>
      )}
    </Space>
  );
}

export default HashTagForm;

// import React, { useCallback, useState } from 'react';
// import { css } from '@emotion/react';

// function HashTagForm() {
//   // onChange로 관리할 문자열
//   const [hashtag, setHashtag] = useState('');
//   // 해시태그를 담을 배열
//   const [hashArr, setHashArr] = useState([]);

//   const onChangeHashtag = useCallback((e) => {
//     // space 입력시 '' 빈문자열로 변환하여 Hashtage state에 저장한다
//     const replaceStr = e.target.value.replace(/(\s*)/g, '');
//     console.log(replaceStr);
//     setHashtag(replaceStr);
//   }, []);

//   const onKeyUp = useCallback(
//     (e) => {
//       if (process.browser) {
//         /* 요소 불러오기, 만들기*/
//         const $HashWrapOuter = document.querySelector('.HashWrapOuter');
//         const $HashWrapInner = document.createElement('div');
//         $HashWrapInner.className = 'HashWrapInner';

//         /* 태그를 클릭 이벤트 관련 로직 */
//         $HashWrapInner.addEventListener('click', () => {
//           $HashWrapOuter?.removeChild($HashWrapInner);
//           console.log($HashWrapInner.innerHTML);
//           setHashArr(hashArr.filter((hashtag) => hashtag));
//         });

//         /* enter 키 코드 :13 */
//         if (e.keyCode === 13 && e.target.value.trim() !== '') {
//           console.log('Enter Key 입력됨!', e.target.value);
//           $HashWrapInner.innerHTML = '#' + e.target.value;
//           $HashWrapOuter?.appendChild($HashWrapInner);
//           setHashArr((hashArr) => [...hashArr, hashtag]);
//           setHashtag('');
//         }
//       }
//     },
//     [hashtag, hashArr],
//   );

//   return (
//     <div className="HashWrap">
//       <div className="HashWrapOuter"></div>
//       <input
//         className="HashInput"
//         type="text"
//         value={hashtag}
//         onChange={onChangeHashtag}
//         onKeyUp={onKeyUp}
//         placeholder="해시태그 입력"
//       />
//     </div>
//   );
// }

// export default HashTagForm;

/*
const hashDivrap = css`
  margin-top: 24px;
  color: rgb(52, 58, 64);
  font-size: 1.125rem;
  display: flex;
  flex-wrap: wrap;
  letter-spacing: -0.6px;
  color: #444241;
  border-bottom: 1.6px solid;
  padding: 2px 2px 8px 2px;

  .HashWrapOuter {
    display: flex;
    flex-wrap: wrap;
  }

  .HashWrapInner {
    margin-top: 5px;
    background: #ffeee7;
    border-radius: 56px;
    padding: 8px 12px;
    color: #ff6e35;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 1.4rem;
    line-height: 20px;
    margin-right: 5px;
    cursor: pointer;
  }

  .HashInput {
    width: auto;
    margin: 10px;
    display: inline-flex;
    outline: none;
    cursor: text;
    line-height: 2rem;
    margin-bottom: 0.75rem;
    min-width: 8rem;
    border: none;
  }
`;
*/

// import React, { useState } from 'react';
// import { Button, Form, Input } from 'antd';

// function HashTagForm() {
//   const [HashTag, setHashTag] = useState(''); // 해시 태그
//   const [HashTagArr, setHashTagArr] = useState([]); // 해시 태그를 담는 배열

//   const hashtagChangeHandler = (event) => setHashTag(event.target.value);
//   const hashtagSubmit = (event) => {
//     event.preventDefault();
//     if (HashTag === '') {
//       return;
//     }
//     setHashTagArr((currentArray) => [HashTag, ...currentArray]);
//     setHashTag('');
//   };

//   return (
//     <Form onSubmit={hashtagSubmit}>
//       <Input
//         onChange={hashtagChangeHandler}
//         value={HashTag}
//         type="text"
//         placeholder="# 해시태그로 본인 / 팀을 소개하세요"
//       />
//       <Button>추가하기</Button>
//       <ul>
//         {HashTagArr.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </Form>
//   );
// }

// export default HashTagForm;
