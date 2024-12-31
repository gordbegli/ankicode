'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { fsrs, generatorParameters, Rating } from 'ts-fsrs';
import { startingCards } from './startingCards';
import Editor from './components/Editor';
import Menu from './components/Menu';
import styles from './page.module.css';
import DoneMessage from './components/DoneMessage';

export default function Flashcard() {
  const [answer, setAnswer] = useState('');
  const [current, setCurrent] = useState(null);
  const [pyodide, setPyodide] = useState(null);
  const f = fsrs(generatorParameters());
  const [rating, setRating] = useState(3);
  const [problemDescription, setProblemDescription] = useState('');
  const [testCode, setTestCode] = useState('');
  const [videoHtml, setVideoHtml] = useState('');
  const [dividerPosition, setDividerPosition] = useState(50);
  const [pattern, setPattern] = useState(() => {if (typeof window !== 'undefined') {return localStorage.getItem('currentPattern') || 'array';}return 'array';});
  const [cards, setCards] = useState(() => {if (typeof window !== 'undefined') {const storedCards = localStorage.getItem('storedCards');return storedCards ? JSON.parse(storedCards) : startingCards;}return startingCards;});
  const [patterns, setPatterns] = useState(["array", "twopointer", "slidingwindow", "stack", "binarysearch", "linkedlist", "tree", "heap", "backtracking", "trie", "graph", "advancedgraph", "1Ddynamicprogramming", "2Ddynamicprogramming"]);
  const [focusEditor, setFocusEditor] = useState(false);
  const [vimMode, setVimMode] = useState(() => typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('vimMode') || 'false') : false);
  const [lastNew, setLastNew] = useState(() => { if (typeof window !== 'undefined') { return localStorage.getItem('lastNew') || null } return null });
  const [done, setDone] = useState(false);
  const doneMessageRef = useRef(null);
  const editorViewRef = useRef(null);

  const fetchCardData = useCallback((id) => {
    Promise.all([
      fetch(`/${id}/startercode.txt`).then(response => response.text()),
      fetch(`/${id}/description.md`).then(response => response.text()),
      fetch(`/${id}/testcode.txt`).then(response => response.text()),
      fetch(`/${id}/video.txt`).then(response => response.text())
    ]).then(([starterCode, description, testCode, videoHtml]) => {
      setAnswer(starterCode);
      setProblemDescription(description);
      setTestCode(testCode);
      setVideoHtml(videoHtml);
    });
  }, []);

  const updatePattern = useCallback((pattern) => {
    localStorage.setItem('currentPattern', pattern);
    setPattern(pattern);
  }, []);

  const getNextCard = useCallback(() => {
    //Due learning cards
    const today = new Date().setHours(0, 0, 0, 0);
    let next = cards.find(card => card.stage === 'learning' && new Date(card.due).setHours(0, 0, 0, 0) <= today);
  
    //New cards - look for easy then medium then hard problems, first in current pattern then in subsequent patterns
    if (!next && (!lastNew || new Date() - new Date(lastNew) > 86400000)) {
      const difficulties = ['Easy', 'Medium', 'Hard'];
      const currentPatternIndex = patterns.indexOf(pattern);
      let found = false;
  
      for (let difficulty of difficulties) {
        //Current pattern
        next = cards.find(card => card.pattern === pattern && card.stage === 'new' && card.difficultyRating === difficulty);
        if (next) {found = true; break;}
  
        //Subsequent patterns
        for (let i = 1; i < patterns.length && !found; i++) {
          const nextPattern = patterns[(currentPatternIndex + i) % patterns.length];
          next = cards.find(card => card.pattern === nextPattern && card.stage === 'new' && card.difficultyRating === difficulty);
          if (next) {found = true; updatePattern(nextPattern); break;}
        }
        if (found) break;
      }
    }
  
    if (!next) {next = cards[0]; setDone(true);} //No cards left to review
    return next;
  }, [cards, pattern, lastNew, patterns, updatePattern]);

  const rate = useCallback((rating) => {
    if (current.stage === 'new') {
      current.stage = 'learning';
      localStorage.setItem('lastNew', new Date().toISOString());
      setLastNew(new Date().toISOString());
    }
    const scheduling = f.repeat(current, new Date());
    const updated = [...cards.filter(card => card !== current), scheduling[rating].card];
    setCards(updated);

    let next = getNextCard();
    if (!next) {
      const currentIndex = patterns.indexOf(pattern);
      const nextIndex = (currentIndex + 1) % patterns.length;
      updatePattern(patterns[nextIndex]);
      next = getNextCard(); // Try to get a card for the new pattern
    }

    if (next) {
      setCurrent(next);
      setRating(3);
      fetchCardData(next.id);
    }
  }, [current, cards, f, getNextCard, patterns, pattern, updatePattern, setCards, setCurrent, setRating, fetchCardData]);

  useEffect(() => {
    const toggleDivider = (direction) => {
      setDividerPosition(prevPosition => {
        if (direction === 'left') {
          if (prevPosition === 0) return 0;
          return prevPosition > 75 ? 50 : prevPosition < 25 ? 100 : 0;
        } else if (direction === 'right') {
          if (prevPosition === 100) return 100;
          return prevPosition < 25 ? 50 : prevPosition > 75 ? 0 : 100;
        }
        return prevPosition;
      });
    };

    const handleKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === 'h') {
          e.preventDefault();
          toggleDivider('left');
        } else if (e.key === 'l') {
          e.preventDefault();
          toggleDivider('right');
        } else if (e.key === 'i' && e.shiftKey) {
          e.preventDefault();
          setFocusEditor(prev => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (focusEditor) {
      if (editorViewRef.current && !done) {
        editorViewRef.current.focus();
      }
      setFocusEditor(false);
    }
  }, [focusEditor, done]);

  useEffect(() => {
    const load = async () => {
      if (!window.pyodideLoading) {
        window.pyodideLoading = true;
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js";
        script.onload = async () => {
          window.pyodide = await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/" });
          setPyodide(window.pyodide);
        };
        document.body.appendChild(script);
      } else if (window.pyodide) {
        setPyodide(window.pyodide);
      }
    };
    load();

    const next = getNextCard();
    setCurrent(next);
    fetchCardData(next.id);
  }, []);

  useEffect(() => {
    if (cards.length > 0) localStorage.setItem('storedCards', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem('vimMode', JSON.stringify(vimMode));
  }, [vimMode]);

  useEffect(() => {
    const next = getNextCard();
    if (!next) return;
    setCurrent(next);
    fetchCardData(next.id);
  }, [pattern, cards, fetchCardData]);

  useEffect(() => {
    if (done && doneMessageRef.current) {
      doneMessageRef.current.focus(); //Otherwise the editor remains in focus
    }
  }, [done]);

  const handleEditorReady = (view) => {
    if (view && !done) {
      editorViewRef.current = view;
      view.focus();
    }
  };

  return (
    <>
      {done && <div ref={doneMessageRef} tabIndex={-1}><DoneMessage cards={cards} /></div>}
      <div className={styles.container}>
        <div className={styles.menu} style={{ width: `${dividerPosition}%` }}>
          <Menu current={current} cards={cards} answer={answer} rate={rate} videoHtml={videoHtml} problemDescription={problemDescription} testCode={testCode} rating={rating} setRating={setRating} pattern={pattern} patterns={patterns} vimMode={vimMode} setVimMode={setVimMode}/>
        </div>
        <div className={styles.editor} style={{ width: `${100 - dividerPosition}%` }}>
          <Editor value={answer} onChange={(value) => setAnswer(value)} onEditorReady={handleEditorReady} vimMode={vimMode}/>
        </div>
      </div>
    </>
  );
}