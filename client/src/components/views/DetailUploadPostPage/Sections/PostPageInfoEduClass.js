import React from 'react';
import { Button, Description } from 'antd';

function PostPageInfoEduClass(props) {
  return (
    <div>
      <br />
      <br />
      <label>수업명 / 분반: {props.detail.divison}</label>
      {/* <br />
      <Input
        onChange={divisionChangeHandler}
        value={Division}
        placeholder="ex)... 게임혼합현실 / 7분반"
      />
      <br />

      <br />
      <label>모집인원</label>
      <select onChange={headcounterChangeHandler} value={HeadCount}>
        {HeadCountArray.map((item) => (
          <option key={item.key} value={item.key}>
            {item.value}
          </option>
        ))}
      </select>
      <br />

      <br />
      <label>모집 마감일</label>
      <DatePicker
        selected={SelectedDate}
        onChange={selectedDateChangeHandler}
      />
      <br />

      <br />
      <label>진행 방식</label>
      <select onChange={progressChangeHandler} value={Progress}>
        {ProgessArray.map((item) => (
          <option key={item.key} value={item.key}>
            {item.value}
          </option>
        ))}
      </select>
      <br />

      <br />
      <label>연락 방법</label>
      <select onChange={contactChangeHandler} value={Contact}>
        {ContactArray.map((item) => (
          <option key={item.key} value={item.key}>
            {item.value}
          </option>
        ))}
      </select>
      <br />
      <Input
        onChange={contactinfoChangeHandler}
        value={Contactinfo}
        placeholder={ContactArray[Contact - 1].placeholder}
      />
      <br />

      <br />
      <label>상세 설명</label>

      <br />
      <TextArea
        style={{ height: '50vh' }}
        onChange={descriptionChangeHandler}
        value={Description}
      /> */}
    </div>
  );
}

export default PostPageInfoEduClass;
