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
  })

  const vimTheme = EditorView.theme({
    '.cm-vim-panel.cm-panel': {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#f3f4f6',
      padding: '4px 8px',
      borderTop: '1px solid #e5e7eb',
      fontSize: '0.9rem',
      zIndex: 1000,
    },
    '.cm-scroller': {
      position: 'fixed',
      width: '50vw',
    },
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
        fontSize,
        vimTheme,
      ]}
      onChange={onChange}
    />
  );
};

export default Editor;