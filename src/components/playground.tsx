import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  fontSize: 16,
};

const OPTIONS_WITH_READONLY = {
  readOnly: true,
  automaticLayout: true,
  fontSize: 16,
};

const Playground = () => {
  const [raw, setRaw] = useState('{}');
  const [template, setTemplate] = useState('{}');
  const [result, setResult] = useState('// Here is where your jinja template will be applied');
  const [error, setError] = useState('');

  useEffect(() => {
    const asides = document.querySelectorAll('aside');
    asides.forEach((aside) => {
      aside.style.display = 'none';
    });
    return () => {
      asides.forEach((aside) => {
        aside.style.display = '';
      });
    };
  }, []);

  const updateResult = async () => {
    try {
      setError('');

      const templateValue = template || '{}';
      const dataValue = raw || '{}';

      let parsedData;
      try {
        parsedData = JSON.parse(dataValue);
      } catch (e) {
        setError('Invalid JSON data');
        setResult('');
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/render/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template: templateValue,
          data: parsedData,
        }),
      });

      const resultJson = await response.json();
      if (resultJson.error) {
        setError(resultJson.error);
        setResult('');
      } else {
        setResult(resultJson.result);
      }
    } catch (e) {
      if (e instanceof Error && e.message.includes('NetworkError')) {
        setError('Could not connect to the backend');
      } else {
        console.error(e);
        setError('An error occurred');
      }
      setResult('');
    }
  };

  const containerStyle = {
    display: 'flex',
    height: '80vh',
    width: '80vw', // Ensure full viewport width
    overflow: 'hidden',
    margin: 0,
    padding: 0, // Remove padding to prevent extra width
  };

  const editorContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    overflow: 'hidden',
  };

  const columnStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    margin: "2px"
  };

  const editorStyle = {
    flex: 1,
    height: 'calc(100% - 3rem)', // Adjust based on header size
  };

  const headerStyle = {
    margin: 0,
    textAlign: 'center',
  };

  const errorStyle = {
    color: 'red',
    padding: '1rem',
    textAlign: 'center',
  };

  return (
    <>
      <select style={{ flex: 'none' }}>
        <option value="" selected disabled hidden>Pick an example</option>
        <option value="location"> Location Oriented </option>
        <option value="dataset oriented"> Dataset Oriented </option>
      </select>

      <div style={containerStyle}>
        <div style={editorContainerStyle}>
          <div style={columnStyle}>
            <h2 style={headerStyle}>Raw JSON Output</h2>
            <Editor
              value={raw}
              options={MONACO_EDITOR_OPTIONS}
              theme="vs-dark"
              language="json"
              onChange={(value) => setRaw(value)}
              style={editorStyle}
            />
          </div>
          <div style={columnStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2 style={headerStyle}>Jinja Template</h2>
              <button onClick={updateResult}>Update Result</button>
            </div>
            <Editor
              value={template}
              onChange={(value) => setTemplate(value)}
              options={MONACO_EDITOR_OPTIONS}
              theme="vs-dark"
              language="jinja"
              style={editorStyle}
            />
          </div>
          <div style={columnStyle}>
            <h2 style={headerStyle}>Templated Result</h2>
            {!error ? (
              <Editor
                value={result}
                options={OPTIONS_WITH_READONLY}
                theme="vs-dark"
                language="json"
                style={editorStyle}
              />
            ) : (
              <div style={errorStyle}>{error}</div>
            )}
          </div>
        </div>
      </div>
    </>


  );
};

export default Playground;

