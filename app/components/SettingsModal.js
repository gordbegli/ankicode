import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './SettingsModal.module.css';
import Progress from '@/app/components/Progress';
import Calendar from '@/app/components/Calendar';

export default function SettingsModal({ cards, patterns, vimMode, setVimMode, includeMedium, setIncludeMedium, includeHard, setIncludeHard, newCardsPerDay, setNewCardsPerDay }) {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedApiKey = localStorage.getItem('apiKey');
    if (storedApiKey) setApiKey(storedApiKey);
  }, []);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('apiKey', apiKey);
    }
  }, [apiKey]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const localStorageKeys = [
    'currentPattern', 'storedCards', 'vimMode', 'includeMedium', 'includeHard',
    'newCardsPerDay', 'newCardsToday', 'apiKey', 'calendar', 'hasSeenWelcome', 'lastNew'
  ];

  const handleExport = () => {
    const data = {};
    localStorageKeys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value !== null) {
        data[key] = value;
      }
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const date = new Date().toISOString().split('T')[0];
    a.download = `ankicode-backup-${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (typeof data !== 'object' || data === null) {
          alert('Invalid backup file format.');
          return;
        }
        if (!confirm('This will overwrite your current data. Continue?')) {
          return;
        }
        Object.entries(data).forEach(([key, value]) => {
          if (localStorageKeys.includes(key)) {
            localStorage.setItem(key, value);
          }
        });
        window.location.reload();
      } catch (err) {
        alert('Failed to parse backup file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <>
      <button className={styles.logoButton} onClick={() => setIsOpen(true)}>
        <Image src="/logo.png" alt="AnkiCode" width={25} height={25} />
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>Settings</span>
              <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.settingsSection}>
                <p className={styles.settingsText}><a className={styles.settingsLink} target='_blank' href='https://platform.openai.com/api-keys'>OpenAI</a> Key</p>
                <input type={isInputFocused ? "text" : "password"} value={apiKey} onChange={(e) => setApiKey(e.target.value)} onFocus={() => setIsInputFocused(true)} onBlur={() => setIsInputFocused(false)} placeholder="Enter your API key" className={styles.apiKeyInput} />
              </div>
              <div className={styles.settingsSection}>
                <p className={styles.settingsText}>New / Day</p>
                <input type="number" min="0" value={newCardsPerDay} onChange={(e) => setNewCardsPerDay(Math.max(0, parseInt(e.target.value) || 0))} className={styles.apiKeyInput} />
              </div>
              <div className={styles.settingsSection}>
                <p className={styles.settingsText}>Vim</p>
                <div className={styles.switchToggleContainer}>
                  <button className={`${styles.switchToggle} ${vimMode ? styles.active : ''}`} onClick={() => { const newValue = !vimMode; setVimMode(newValue); localStorage.setItem('vimMode', newValue); }}>
                    <span className={`${styles.toggleOption} ${!vimMode ? styles.activeOption : styles.inactiveOption}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
                    </span>
                    <span className={`${styles.toggleOption} ${vimMode ? styles.activeOption : styles.inactiveOption}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                    </span>
                  </button>
                </div>
              </div>
              <div className={styles.settingsSection}>
                <p className={styles.settingsText}>Mediums</p>
                <div className={styles.switchToggleContainer}>
                  <button className={`${styles.switchToggle} ${includeMedium ? styles.active : ''}`} onClick={() => setIncludeMedium(!includeMedium)}>
                    <span className={`${styles.toggleOption} ${!includeMedium ? styles.activeOption : styles.inactiveOption}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
                    </span>
                    <span className={`${styles.toggleOption} ${includeMedium ? styles.activeOption : styles.inactiveOption}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                    </span>
                  </button>
                </div>
              </div>
              <div className={styles.settingsSection}>
                <p className={styles.settingsText}>Hards</p>
                <div className={styles.switchToggleContainer}>
                  <button className={`${styles.switchToggle} ${includeHard ? styles.active : ''}`} onClick={() => setIncludeHard(!includeHard)}>
                    <span className={`${styles.toggleOption} ${!includeHard ? styles.activeOption : styles.inactiveOption}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
                    </span>
                    <span className={`${styles.toggleOption} ${includeHard ? styles.activeOption : styles.inactiveOption}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
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
              <div className={styles.settingsSection}>
                <p className={styles.settingsText}>Data</p>
                <div className={styles.dataButtonsContainer}>
                  <button className={styles.dataButton} onClick={handleExport}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Export
                  </button>
                  <button className={styles.dataButton} onClick={() => fileInputRef.current?.click()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    Import
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImport}
                    accept=".json"
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
