import React, { useRef, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { pythonLanguage } from '@codemirror/lang-python';
import { vim } from '@replit/codemirror-vim';
import { basicSetup } from 'codemirror';
import { indentationMarkers } from '@replit/codemirror-indentation-markers';
import { indentUnit } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

const Editor = ({ value, onChange, onEditorReady }) => {
  const editorRef = (node) => {
    if (node) {
      onEditorReady(node.view);
    }
  };

  const fontSize = EditorView.theme({
    "&": {
      fontSize: "1rem"
    }
  });

  return (
    <CodeMirror
      ref={editorRef}
      value={value}
      height="100vh"
      extensions={[
        vim(),
        pythonLanguage,
        basicSetup.filter(ext => ext.name !== 'autocompletion'),
        indentationMarkers(),
        EditorState.tabSize.of(4),
        indentUnit.of("    "),
        fontSize
      ]}
      onChange={onChange}
    />
  );
};

export default Editor;