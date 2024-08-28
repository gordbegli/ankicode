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
    <div className={styles.overlay}>
      <div className={styles.messageContainer}>
        <h2 className={styles.title}>Welcome to AnkiCode!</h2>
        <div className={styles.content}>
          <p>AnkiCode is a spaced repetition coding platform.</p>
          
          <h3>Important Notes</h3>
          <ul>
            <li>The chat tab won't work until you add an API key in settings.</li>
            <li>This application is open source. If you find any issues, please click the logo and create an issue in the GitHub repository.</li>
            <li>If you use the Vimium Chrome extension, you must disable it for this application to work.</li>
          </ul>

          <h3>Keyboard Shortcuts</h3>
          <table className={styles.shortcutTable}>
            <thead>
              <tr>
                <th>Shortcut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Cmd + '</td><td>Run Tests</td></tr>
              <tr><td>Cmd + \</td><td>Next Problem</td></tr>
              <tr><td>Cmd + H</td><td>Enlarge Editor</td></tr>
              <tr><td>Cmd + L</td><td>Enlarge Menu</td></tr>
              <tr><td>Cmd + Shift + O</td><td>Jump to Chat</td></tr>
              <tr><td>Cmd + Shift + P</td><td>Jump to Problem</td></tr>
              <tr><td>Cmd + J</td><td>Scroll Menu Down</td></tr>
              <tr><td>Cmd + K</td><td>Scroll Menu Up</td></tr>
            </tbody>
          </table>
          <h3>Algorithm</h3>
          <p>FSRS, except if there are two previously seen cards due today, then you review them first.</p>
        </div>
        <button className={styles.closeButton} onClick={() => setShowMessage(false)}>Get Started</button>
      </div>
    </div>
  );
};

export default WelcomeMessage;