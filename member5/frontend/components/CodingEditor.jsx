import { useEffect, useRef } from 'react';
import loader from '@monaco-editor/loader';

const starterCode = `function twoSum(a, target) {
  // Return indices of two numbers whose sum equals target.
  // Example: twoSum([2, 7, 11, 15], 9) -> [0, 1]
  return [];
}`;

export default function CodingEditor({ value, onChange, language = 'javascript', height = '420px' }) {
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const changeRef = useRef(onChange);

  useEffect(() => { changeRef.current = onChange; }, [onChange]);

  useEffect(() => {
    let mounted = true;
    let subscription;
    loader.init().then((monaco) => {
      if (!mounted || !containerRef.current) return;
      editorRef.current = monaco.editor.create(containerRef.current, {
        value: value ?? starterCode,
        language,
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false }
      });
      subscription = editorRef.current.onDidChangeModelContent(() => {
        changeRef.current?.(editorRef.current.getValue());
      });
    });

    return () => {
      mounted = false;
      subscription?.dispose();
      editorRef.current?.dispose();
      editorRef.current = null;
    };
  }, [language]);

  return <div ref={containerRef} style={{ width: '100%', height, borderRadius: 8, overflow: 'hidden' }} />;
}

export { starterCode };
