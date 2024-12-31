import React, { useState, useEffect } from 'react';
import styles from './Settings.module.css';
import Progress from '@/app/components/Progress'

export default function Settings({ pattern, cards, patterns }) {
  const [apiKey, setApiKey] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const storedApiKey = localStorage.getItem('apiKey');
    if (storedApiKey) setApiKey(storedApiKey);
  }, []);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('apiKey', apiKey);
    }
  }, [apiKey]);


  return (
    <>
      <div className={styles.settingsSection}>
        <p className={styles.settingsText}><a className={styles.settingsLink} target='_blank' href='https://platform.openai.com/api-keys'>OpenAI</a> Key</p>
        <input type={isInputFocused ? "text" : "password"} value={apiKey} onChange={(e) => setApiKey(e.target.value)} onFocus={() => setIsInputFocused(true)} onBlur={() => setIsInputFocused(false)} placeholder="Enter your API key" className={styles.apiKeyInput} />
      </div>
      <div className={styles.settingsSection}>
        <Progress cards={cards} patterns={patterns}/>
      </div>
    </>
  );
}