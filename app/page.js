'use client';

import { useState, useEffect, useCallback } from 'react';
import { fsrs, generatorParameters, Rating } from 'ts-fsrs';
import { startingCards } from './startingCards';
import Editor from './components/Editor';
import Menu from './components/Menu';
import styles from './page.module.css';

export default function Flashcard() {
  const [answer, setAnswer] = useState('');
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(null);
  const [pyodide, setPyodide] = useState(null);
  const f = fsrs(generatorParameters());
  const [rating, setRating] = useState(3);
  const [problemDescription, setProblemDescription] = useState('');
  const [testCode, setTestCode] = useState('');
  const [videoHtml, setVideoHtml] = useState('');
  const [pattern, setPattern] = useState('array');
  const [dividerPosition, setDividerPosition] = useState(50);
  const [patterns, setPatterns] = useState([
    "array", "backtracking", "binarysearch", "graph", "heap", "linkedlist",
    "slidingwindow", "stack", "tree", "trie", "twopointer",
    "1Ddynamicprogramming", "2Ddynamicprogramming", "advancedgraph"
  ]);

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

  const moveToNextPattern = useCallback(() => {
    const currentIndex = patterns.indexOf(pattern);
    const nextIndex = (currentIndex + 1) % patterns.length;
    updatePattern(patterns[nextIndex]);
  }, [pattern, patterns, updatePattern]);

  const rate = (rating) => {
    if (current.stage === 'new') {
      current.stage = 'learning';
    }
    const scheduling = f.repeat(current, new Date());
    const updated = [...cards.filter(card => card !== current), scheduling[rating].card];
    setCards(updated);

    const today = new Date();
    let next = updated.filter(card => card.pattern === pattern && card.stage === 'learning' && new Date(card.due).setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0))[0];
    if (!next) {
      next = updated.filter(card => card.pattern === pattern).find(card => new Date(card.due).setHours(0, 0, 0, 0) <= today);
    }
    if (!next) {
      moveToNextPattern();
      return;
    }
    setCurrent(next);
    setRating(3);

    fetchCardData(next.id);
  };

  const toggleDivider = useCallback((direction) => {
    if (direction === 'left') {
      setDividerPosition(prevPosition => {
        if (prevPosition === 0) return 0;
        return prevPosition > 75 ? 50 : prevPosition < 25 ? 100 : 0;
      });
    } else if (direction === 'right') {
      setDividerPosition(prevPosition => {
        if (prevPosition === 100) return 100;
        return prevPosition < 25 ? 50 : prevPosition > 75 ? 0 : 100;
      });
    }
  }, []);

  useEffect(() => {
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
  }, [toggleDivider]);

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

    const storedCards = localStorage.getItem('storedCards');
    const initialCards = storedCards ? JSON.parse(storedCards) : startingCards;
    setCards(initialCards);

    const storedPattern = localStorage.getItem('currentPattern');
    const initialPattern = storedPattern || pattern;
    setPattern(initialPattern);

    const today = new Date();
    const next = initialCards.filter(card => card.pattern === initialPattern && card.stage === 'learning').find(card => new Date(card.due).setHours(0, 0, 0, 0) <= today);
    if (next) {
      setCurrent(next);
      fetchCardData(next.id);
    }
  }, []);

  useEffect(() => {
    if (cards.length > 0) localStorage.setItem('storedCards', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    const today = new Date();
    const next = cards.filter(card => card.pattern === pattern)
      .find(card => new Date(card.due).setHours(0, 0, 0, 0) <= today);
    if (!next) return;
    setCurrent(next);
    fetchCardData(next.id);
  }, [pattern]);

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