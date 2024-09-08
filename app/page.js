'use client';

import { useState, useEffect, useCallback } from 'react';
import { fsrs, generatorParameters, Rating } from 'ts-fsrs';
import { startingCards } from './startingCards';
import Editor from './components/Editor';
import Menu from './components/Menu';
import styles from './page.module.css';

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
  const [patterns, setPatterns] = useState(["array", "backtracking", "binarysearch", "graph", "heap", "linkedlist","slidingwindow", "stack", "tree", "trie", "twopointer","1Ddynamicprogramming", "2Ddynamicprogramming", "advancedgraph"]);

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

  const getNextCard = useCallback(() => {
    const today = new Date();
    let next = cards.filter(card => card.pattern === pattern && card.stage === 'learning').find(card => new Date(card.due).setHours(0, 0, 0, 0) <= today);
    if (!next) next = cards.filter(card => card.pattern === pattern).find(card => new Date(card.due).setHours(0, 0, 0, 0) <= today);
    return next;
  }, [cards, pattern]);

  const updatePattern = useCallback((pattern) => {
    localStorage.setItem('currentPattern', pattern);
    setPattern(pattern);
  }, []);

  const rate = useCallback((rating) => {
    if (current.stage === 'new') {
      current.stage = 'learning';
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
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
    const next = getNextCard();
    if (!next) return;
    setCurrent(next);
    fetchCardData(next.id);
  }, [pattern, cards, fetchCardData]);

  const handleEditorReady = (view) => {
    if (view) {
      view.focus(); // Focus the editor when it finishes loading
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu} style={{ width: `${dividerPosition}%` }}>
        <Menu current={current} cards={cards} answer={answer} rate={rate} videoHtml={videoHtml} problemDescription={problemDescription} testCode={testCode} rating={rating} setRating={setRating} pattern={pattern} setPattern={updatePattern} patterns={patterns} />
      </div>
      <div className={styles.editor} style={{ width: `${100 - dividerPosition}%` }}>
        <Editor value={answer} onChange={(value) => setAnswer(value)} onEditorReady={handleEditorReady} />
      </div>
    </div>
  );
}