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
                    <button className={activeTab === 'problem' ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveTab('problem')}>Problem</button>
                    <button className={activeTab === 'results' ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveTab('results')}>Results</button>
                    <button className={activeTab === 'chat' ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveTab('chat')}>Chat</button>
                    <button className={activeTab === 'settings' ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveTab('settings')}>Settings</button>
                </div>
            </div>
            <div className={styles.tabContent}>{renderTabContent()}</div>
        </div>
    );
}