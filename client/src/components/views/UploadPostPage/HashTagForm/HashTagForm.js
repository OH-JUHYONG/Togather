import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Collapse, Input, Tag, theme } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';

function HashTagForm({ tags, setTags }) {
  const { token } = theme.useToken();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
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
    // 태그 길이 12글자 이하로 재한
    if (inputValue.length > 12) {
      console.log(inputValue.length);
      alert('12글자 이하로 작성해주세요');
    }

    if (
      inputValue.length <= 12 &&
      inputValue &&
      tags.indexOf(inputValue) === -1 &&
      tags.length < 5
    ) {
      setTags([...tags, inputValue]);
    }

    // 태그 갯수 제한
    if (tags.length === 5) {
      alert('더 이상 추가할 수 없습니다.');
    }

    setInputVisible(false);
    setInputValue('');
  };
  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        #{tag}
      </Tag>
    );
    return (
      <span
        key={tag}
        style={{
          display: 'inline-block',
        }}
      >
        {tagElem}
      </span>
    );
  };
  const tagChild = tags.map(forMap);
  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };
  return (
    <>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: 'from',
            duration: 100,
          }}
          onEnd={(e) => {
            if (e.type === 'appear' || e.type === 'enter') {
              e.target.style = 'display: inline-block';
            }
          }}
          leave={{
            opacity: 0,
            width: 0,
            scale: 0,
            duration: 200,
          }}
          appear={false}
        >
          {tagChild}
        </TweenOneGroup>
      </div>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{
            width: 78,
          }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag onClick={showInput} style={tagPlusStyle}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
}

export default HashTagForm;
