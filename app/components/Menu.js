import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Menu.module.css';
import Chat from './Chat';
import Problem from './Problem';
import Results from './Results';
import Settings from './Settings';
import Image from 'next/image';

export default function Menu({ current, cards, answer, difficultyRating, rate, videoHtml, problemDescription, testCode, rating, setRating, goToNextProblem, pattern, patterns }) {
    const [activeTab, setActiveTab] = useState('problem');
    const resultsRef = useRef(null);
    const chatRef = useRef(null);
    const menuRef = useRef(null);

    const handleRunTests = useCallback(() => {
        setActiveTab('results');
        setTimeout(() => {
            if (resultsRef.current && resultsRef.current.runTests) {
                resultsRef.current.runTests();
            }
        }, 0);
    }, []);

    const handleOpenChat = useCallback(() => {
        setActiveTab('chat');
        setTimeout(() => {
            if (chatRef.current && chatRef.current.focusInput) {
                chatRef.current.focusInput();
            }
        }, 0);
    }, []);

    const handleNext = useCallback(() => {
        if (resultsRef.current && resultsRef.current.handleNext) {
            resultsRef.current.handleNext();
            setActiveTab('problem');
        }
    }, []);

    const handleScroll = useCallback((direction) => {
        if (menuRef.current) {
            const scrollAmount = direction === 'up' ? -100 : 100;
            menuRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.metaKey) {
                if (event.key === "'") {
                    handleRunTests();
                } else if (event.key === "\\") {
                    handleNext();
                } else if (event.key === 'o' && event.shiftKey) {
                    handleOpenChat();
                } else if (event.key === 'p' && event.shiftKey) {
                    setActiveTab('problem')
                } else if (event.key === 'j') {
                    event.preventDefault();
                    handleScroll('down');
                } else if (event.key === 'k') {
                    event.preventDefault();
                    handleScroll('up');
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleRunTests, handleNext, handleScroll]);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'problem': return (<div className={styles.tabContent}><Problem current={current} content={problemDescription} videoHtml={videoHtml} difficultyRating={difficultyRating}/></div>);
            case 'results': return (<div className={styles.tabContent}><Results ref={resultsRef} answer={answer} testCode={testCode} rate={rate} rating={rating} setRating={setRating} goToNextProblem={goToNextProblem} handleRunTests={handleRunTests} setActiveTab={setActiveTab} /></div>);
            case 'chat': return (<div className={styles.tabContent}><Chat answer={answer} problemDescription={problemDescription} testCode={testCode} setRating={setRating} chatRef={chatRef} /></div>);
            case 'settings': return (<div className={styles.tabContent}><Settings cards={cards} pattern={pattern} patterns={patterns} /></div>);
            default: return null;
        }
    };

    return (
        <div className={styles.menu} ref={menuRef}>
            <div className={styles.header}>
                <div className={styles.logo}> <a href="https://github.com/gordbegli/ankicode" target="_blank" rel="noopener noreferrer"><Image src="/logo.png" alt="AnkiCode" width={25} height={25} /></a></div>
                <div className={styles.tabs}>
                    <button className={activeTab === 'problem' ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveTab('problem')}>Problem<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-code"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg></button>
                    <button className={activeTab === 'results' ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveTab('results')}>Results<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-terminal"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg></button>
                    <button className={activeTab === 'chat' ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveTab('chat')}>Chat<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button>
                    <button className={activeTab === 'settings' ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveTab('settings')}>Settings<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></button>
                </div>
            </div>
            <div className={styles.tabContent}>{renderTabContent()}</div>
        </div>
    );
}