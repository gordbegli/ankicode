'use client';
import { useState, useEffect } from 'react';
import styles from './WelcomeMessage.module.css';

const WelcomeMessage = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowMessage(true);
      localStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);

  if (!showMessage) return null;

  return (
    <div className={styles.overlay} onClick={() => setShowMessage(false)}>
      <div className={styles.messageContainer} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>
          <span className={styles.emoji}>👋</span> Welcome to AnkiCode
        </h2>
        <div className={styles.content}>
          <p className={styles.subtitle}>
            A site to help you memorize algorithms with <a href="https://github.com/open-spaced-repetition/fsrs4anki/wiki/The-Algorithm" target="_blank" rel="noopener noreferrer" className={styles.link}>FSRS</a>
          </p>

          <div className={styles.section}>
            <h3>
              <span className={styles.emoji}>🚀</span> Getting Started
            </h3>
            <div className={styles.card}>
              <p>Add your API key in settings to enable AI-powered chat assistance</p>
            </div>
          </div>

          <div className={styles.section}>
            <h3>
              <span className={styles.emoji}>⌨️</span> Keyboard Shortcuts
            </h3>
            <div className={styles.shortcutGrid}>
              <div className={styles.shortcutItem}>
                <kbd>⌘ '</kbd>
                <span>Run Tests</span>
              </div>
              <div className={styles.shortcutItem}>
                <kbd>⌘ \</kbd>
                <span>Next Problem</span>
              </div>
            </div>
          </div>
        </div>
        <button className={styles.closeButton} onClick={() => setShowMessage(false)}>
          Let's begin
          <span className={styles.buttonArrow}>→</span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeMessage;
