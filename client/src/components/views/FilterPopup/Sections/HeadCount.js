import { useState } from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

const HeadCount = () => {
  const [inputValue, setInputValue] = useState([1, 3]);
  const onChange = (newArr) => {
    setInputValue(newArr);
  };
  const onChangeMin = (newValue) => {
    const temp = [...inputValue];
    temp[0] = newValue;
    setInputValue(temp);
  };
  const onChangeMax = (newValue) => {
    const temp = [...inputValue];
    temp[1] = newValue;
    setInputValue(temp);
  };

  const marks = {
    0: '최소: 0명',
    8: '최대: 8명',
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Slider
            range
            marks={marks}
            onChange={onChange}
            value={inputValue}
            min={0}
            max={8}
          />
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <InputNumber
            min={0}
            max={8}
            style={{
              margin: '0 16px',
            }}
            value={inputValue[0]}
            onChange={onChangeMin}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={8}
            style={{
              margin: '0 16px',
            }}
            value={inputValue[1]}
            onChange={onChangeMax}
          />
        </Col>
      </Row>
    </>
  );
};

export default HeadCount;
