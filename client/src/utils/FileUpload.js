// 안쓰는 기능
// 추후에 사용할 수 있어서 만들어 놓기만 했습니다.

/*
import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios'; // 파일을 백엔드로 전달하기 위해 필요한 부분

function dropHandler() {
  const dropHandler = (file) => {
    let formDate = new FormData();
    const config = {
      header: { 'content-type': 'multipart/fomr-data' }, // 파일이 어떤 타입에 대한 정의
    };
    formDate.append('file', file[0]);

    axios.post('/api/produc/image', formDate, config).then((response) => {
      if (response.data.success) {
      } else {
        alert('파일을 저장하는데 실패했습니다.');
      }
    });
  };
}

function FileUpload() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: 300,
                height: 240,
                border: '1px solid ligthgray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
}

export default FileUpload;
*/
