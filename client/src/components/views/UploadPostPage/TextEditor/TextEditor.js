import React, { useRef } from 'react';

// Text Editor(TOAST UI Editor)
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'; // 플러그인 추가(Color picker)
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr'; // 기본언어 영어를 한국어로 바꿔줌
// -------------------------------- //

function TextEditor({ description, setDescription }) {
  const editorRef = useRef(); // TOAST UI Editor

  // Tosat UI
  const descriptionChangeHandler = () => {
    const data = editorRef.current.getInstance().getHTML();
    setDescription(data);
  };

  return (
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
  );
}

export default TextEditor;
