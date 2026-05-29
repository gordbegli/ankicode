import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './SettingsModal.module.css';
import Progress from '@/app/components/Progress';
import Calendar from '@/app/components/Calendar';

function formatAppState(state) {
  const stateToFormat = { ...state };
  delete stateToFormat.apiKey;
  return JSON.stringify(stateToFormat, null, 2);
}

export default function SettingsModal({ appState, cards, vimMode, setVimMode, includeMedium, setIncludeMedium, includeHard, setIncludeHard, newCardsPerDay, setNewCardsPerDay, apiKey, setApiKey, onAppStateChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [stateText, setStateText] = useState('');
  const [stateTextDirty, setStateTextDirty] = useState(false);
  const [stateMessage, setStateMessage] = useState('');

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !stateTextDirty) {
      setStateText(formatAppState(appState));
    }
  }, [appState, isOpen, stateTextDirty]);

  const refreshStateText = () => {
    setStateText(formatAppState(appState));
    setStateTextDirty(false);
    setStateMessage('');
  };

  const handleStateTextChange = (event) => {
    setStateText(event.target.value);
    setStateTextDirty(true);
    setStateMessage('');
  };

  const handleApplyState = () => {
    try {
      const parsedState = JSON.parse(stateText);
      if (!parsedState || typeof parsedState !== 'object' || !Array.isArray(parsedState.cards)) {
        throw new Error('state must be an object with a cards array');
      }
      delete parsedState.apiKey;

      onAppStateChange(parsedState);
      setStateTextDirty(false);
      setStateMessage('Saved app state.');
    } catch (error) {
      setStateMessage(`Invalid JSON: ${error.message}`);
    }
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
                <input
                  type={isInputFocused ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="sk-..."
                  className={styles.apiKeyInput}
                />
              </div>
              <div className={styles.settingsSection}>
                <p className={styles.settingsText}>New / Day</p>
                <input type="number" min="0" value={newCardsPerDay} onChange={(e) => setNewCardsPerDay(Math.max(0, parseInt(e.target.value) || 0))} className={styles.apiKeyInput} />
              </div>
              <div className={styles.settingsSection}>
                <p className={styles.settingsText}>Vim</p>
                <div className={styles.switchToggleContainer}>
                  <button className={`${styles.switchToggle} ${vimMode ? styles.active : ''}`} onClick={() => setVimMode(!vimMode)}>
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
                <Progress cards={cards} includeMedium={includeMedium} includeHard={includeHard} />
              </div>
              <div className={styles.settingsSection}>
                <p className={styles.settingsText}>Calendar</p>
              </div>
              <div className={styles.settingsSection}>
                <Calendar calendar={appState.calendar} />
              </div>
              <div className={`${styles.settingsSection} ${styles.stateSection}`}>
                <div className={styles.stateHeader}>
                  <p className={styles.settingsText}>App State</p>
                  <div className={styles.dataButtonsContainer}>
                    <button className={styles.dataButton} onClick={refreshStateText}>Refresh</button>
                    <button className={styles.dataButton} onClick={handleApplyState}>Apply</button>
                  </div>
                </div>
                <p className={styles.stateHelp}>Copy this JSON into an LLM, edit it, then paste it back here. It includes cards, progress, settings, and calendar.</p>
                <textarea
                  className={styles.stateTextarea}
                  value={stateText}
                  onChange={handleStateTextChange}
                  spellCheck={false}
                />
                {stateMessage && <p className={styles.stateMessage}>{stateMessage}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
