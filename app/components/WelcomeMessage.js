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
            <li>Add API key in settings to enable chat.</li>
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
              <tr><td>Cmd + Shift + O</td><td>Focus Chat</td></tr>
              <tr><td>Cmd + Shift + P</td><td>Focus Problem</td></tr>
              <tr><td>Cmd + Shift + I</td><td>Focus Editor</td></tr>
              <tr><td>Cmd + J</td><td>Scroll Menu Down</td></tr>
              <tr><td>Cmd + K</td><td>Scroll Menu Up</td></tr>
            </tbody>
          </table>
        </div>
        <button className={styles.closeButton} onClick={() => setShowMessage(false)}>Get Started</button>
      </div>
    </div>
  );
};

export default WelcomeMessage;