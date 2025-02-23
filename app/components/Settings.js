import React, { useState, useEffect } from 'react';
import styles from './Settings.module.css';
import Progress from '@/app/components/Progress'
import Calendar from '@/app/components/Calendar'

export default function Settings({ pattern, cards, patterns, vimMode, setVimMode, includeMedium, setIncludeMedium, includeHard, setIncludeHard }) {
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
        <p className={styles.settingsText}>Vim Mode</p>
        <div className={styles.switchToggleContainer}>
          <button className={`${styles.switchToggle} ${vimMode ? styles.active : ''}`} onClick={() => { const newValue = !vimMode; setVimMode(newValue); localStorage.setItem('vimMode', newValue); }}>
            <span className={`${styles.toggleOption} ${!vimMode ? styles.activeOption : styles.inactiveOption}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>
            </span>
            <span className={`${styles.toggleOption} ${vimMode ? styles.activeOption : styles.inactiveOption}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-power"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
            </span>
          </button>
        </div>
      </div>
      <div className={styles.settingsSection}>
        <p className={styles.settingsText}>Medium Problems</p>
        <div className={styles.switchToggleContainer}>
          <button className={`${styles.switchToggle} ${includeMedium ? styles.active : ''}`} onClick={() => setIncludeMedium(!includeMedium)}>
            <span className={`${styles.toggleOption} ${!includeMedium ? styles.activeOption : styles.inactiveOption}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>
            </span>
            <span className={`${styles.toggleOption} ${includeMedium ? styles.activeOption : styles.inactiveOption}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-power"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
            </span>
          </button>
        </div>
      </div>
      <div className={styles.settingsSection}>
        <p className={styles.settingsText}>Hard Problems</p>
        <div className={styles.switchToggleContainer}>
          <button className={`${styles.switchToggle} ${includeHard ? styles.active : ''}`} onClick={() => setIncludeHard(!includeHard)}>
            <span className={`${styles.toggleOption} ${!includeHard ? styles.activeOption : styles.inactiveOption}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>
            </span>
            <span className={`${styles.toggleOption} ${includeHard ? styles.activeOption : styles.inactiveOption}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-power"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
            </span>
          </button>
        </div>
      </div>
      <div className={styles.settingsSection}>
        <p className={styles.settingsText}>Progress</p>
      </div>
      <div className={styles.settingsSection}>
        <Progress cards={cards} patterns={patterns} includeMedium={includeMedium} includeHard={includeHard} />
      </div>
      <div className={styles.settingsSection}>
        <p className={styles.settingsText}>Calendar</p>
      </div>
      <div className={styles.settingsSection}>
        <Calendar />
      </div>
    </>
  );
}