'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { fsrs, generatorParameters, Rating } from 'ts-fsrs';
import { startingCards } from './startingCards';
import Editor from './components/Editor';
import SettingsModal from './components/SettingsModal';
import DoneMessage from './components/DoneMessage';
import styles from './page.module.css';

export default function Flashcard() {
  const [answer, setAnswer] = useState('');
  const [current, setCurrent] = useState(null);
  const [pyodide, setPyodide] = useState(null);
  const f = fsrs(generatorParameters());
  const [solution, setSolution] = useState('');
  const [starterCode, setStarterCode] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [pattern, setPattern] = useState(() => {if (typeof window !== 'undefined') {return localStorage.getItem('currentPattern') || 'array';}return 'array';});
  const [cards, setCards] = useState(() => {if (typeof window !== 'undefined') {const storedCards = localStorage.getItem('storedCards');return storedCards ? JSON.parse(storedCards) : startingCards;}return startingCards;});
  const [patterns, setPatterns] = useState(["array", "twopointer", "slidingwindow", "stack", "binarysearch", "linkedlist", "tree", "heap", "backtracking", "trie", "graph", "advancedgraph", "1Ddynamicprogramming", "2Ddynamicprogramming"]);
  const [vimMode, setVimMode] = useState(() => typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('vimMode') || 'false') : false);
  const [includeMedium, setIncludeMedium] = useState(() => typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('includeMedium') || 'false') : false);
  const [includeHard, setIncludeHard] = useState(() => typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('includeHard') || 'false') : false);
  const [newCardsPerDay, setNewCardsPerDay] = useState(() => typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('newCardsPerDay') ?? '1') : 1);
  const [newCardsToday, setNewCardsToday] = useState(() => { if (typeof window !== 'undefined') { return JSON.parse(localStorage.getItem('newCardsToday') || '{"date":"","count":0}'); } return { date: '', count: 0 }; });
  const [done, setDone] = useState(false);
  const [isGrading, setIsGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState(null);
  const [hasFailedAttempt, setHasFailedAttempt] = useState(false);
  const doneMessageRef = useRef(null);
  const editorViewRef = useRef(null);

  const fetchCardData = useCallback((id) => {
    Promise.all([
      fetch(`/${id}/startercode.txt`).then(response => response.text()),
      fetch(`/${id}/solution.txt`).then(response => response.text())
    ]).then(([starterCode, solution]) => {
      setStarterCode(starterCode);
      setAnswer(starterCode);
      setSolution(solution);
    });
  }, []);

  const updatePattern = useCallback((pattern) => {
    localStorage.setItem('currentPattern', pattern);
    setPattern(pattern);
  }, []);

  const getNextCard = useCallback(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    let next = cards.find(card => card.stage === 'learning' && new Date(card.due).setHours(0, 0, 0, 0) <= today);

    const todayStr = new Date().toISOString().split('T')[0];
    const todayCount = newCardsToday.date === todayStr ? newCardsToday.count : 0;
    if (!next && newCardsPerDay > 0 && todayCount < newCardsPerDay) {
      const difficulties = ['Easy'];
      if (includeMedium) difficulties.push('Medium');
      if (includeHard) difficulties.push('Hard');
      const currentPatternIndex = patterns.indexOf(pattern);
      let found = false;

      for (let difficulty of difficulties) {
        next = cards.find(card => card.pattern === pattern && card.stage === 'new' && card.difficultyRating === difficulty);
        if (next) {found = true; break;}

        for (let i = 1; i < patterns.length && !found; i++) {
          const nextPattern = patterns[(currentPatternIndex + i) % patterns.length];
          next = cards.find(card => card.pattern === nextPattern && card.stage === 'new' && card.difficultyRating === difficulty);
          if (next) {found = true; updatePattern(nextPattern); break;}
        }
        if (found) break;
      }
    }

    if (!next) {next = cards[0]; setDone(true);}
    return next;
  }, [cards, pattern, newCardsPerDay, newCardsToday, patterns, updatePattern, includeMedium, includeHard]);

  const rate = useCallback((rating) => {
    if (current.stage === 'new') {
      current.stage = 'learning';
      const todayStr = new Date().toISOString().split('T')[0];
      const newCount = newCardsToday.date === todayStr ? newCardsToday.count + 1 : 1;
      const updated = { date: todayStr, count: newCount };
      setNewCardsToday(updated);
      localStorage.setItem('newCardsToday', JSON.stringify(updated));
    }
    const scheduling = f.repeat(current, new Date());
    const updated = [...cards.filter(card => card !== current), scheduling[rating].card];
    setCards(updated);

    let next = getNextCard();
    if (!next) {
      const currentIndex = patterns.indexOf(pattern);
      const nextIndex = (currentIndex + 1) % patterns.length;
      updatePattern(patterns[nextIndex]);
      next = getNextCard();
    }

    if (next) {
      setCurrent(next);
      fetchCardData(next.id);
    }
  }, [current, cards, f, getNextCard, patterns, pattern, updatePattern, setCards, setCurrent, fetchCardData, newCardsToday]);

  const submitAnswer = useCallback(async () => {
    if (isRevealed || isGrading) return;

    setIsGrading(true);
    const userCode = answer;
    const apiKey = localStorage.getItem('apiKey');

    if (!apiKey) {
      setAnswer(`${userCode}\n\n# No API key found. Add your OpenAI API key in settings.\n# Press Cmd+; to reveal the answer instead.`);
      setIsGrading(false);
      return;
    }

    setAnswer(`${userCode}\n\n# Grading...`);

    try {
      const response = await fetch('/api/grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({
          userCode: userCode,
          expectedTemplate: solution,
          templateName: current?.title,
        }),
      });

      const result = await response.json();

      if (result.error) {
        setAnswer(`${userCode}\n\n# Error: ${result.error}\n# Press Cmd+; to reveal the answer.`);
        setGradeResult(null);
      } else if (result.passed) {
        setAnswer(`${userCode}\n\n# Correct!\n# ${result.feedback}\n# Press Cmd+' to continue.`);
        setGradeResult({ passed: true });
        setIsRevealed(true);
      } else {
        setAnswer(`${userCode}\n\n# Not quite.\n# ${result.feedback}\n# Press Cmd+Enter to try again, or Cmd+; to reveal.`);
        setGradeResult({ passed: false });
        setHasFailedAttempt(true);
      }
    } catch (error) {
      setAnswer(`${userCode}\n\n# Error: ${error.message}\n# Press Cmd+; to reveal the answer.`);
      setGradeResult(null);
    }

    setIsGrading(false);
  }, [answer, solution, current, isRevealed, isGrading]);

  const revealAnswer = useCallback(() => {
    if (isRevealed) return;
    const revealedContent = `${solution}\n\n# Press Cmd+' to continue to the next problem`;
    setAnswer(revealedContent);
    setIsRevealed(true);
    setGradeResult({ passed: false });
  }, [solution, isRevealed]);

  const handleNext = useCallback(() => {
    if (!isRevealed) return;
    const rating = (gradeResult?.passed && !hasFailedAttempt) ? 3 : 1;
    rate(rating);
    setIsRevealed(false);
    setGradeResult(null);
    setHasFailedAttempt(false);
  }, [isRevealed, rate, gradeResult, hasFailedAttempt]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === 'Enter') {
          e.preventDefault();
          submitAnswer();
        } else if (e.key === ';') {
          e.preventDefault();
          revealAnswer();
        } else if (e.key === "'") {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [submitAnswer, revealAnswer, handleNext]);

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
    localStorage.setItem('includeMedium', JSON.stringify(includeMedium));
  }, [includeMedium]);

  useEffect(() => {
    localStorage.setItem('includeHard', JSON.stringify(includeHard));
  }, [includeHard]);

  useEffect(() => {
    localStorage.setItem('newCardsPerDay', JSON.stringify(newCardsPerDay));
  }, [newCardsPerDay]);

  useEffect(() => {
    const next = getNextCard();
    if (!next) return;
    setCurrent(next);
    fetchCardData(next.id);
  }, [pattern, cards, fetchCardData]);

  useEffect(() => {
    if (done && doneMessageRef.current) {
      doneMessageRef.current.focus();
    }
  }, [done]);

  useEffect(() => {
    if (done) {
      const today = new Date().toISOString().split('T')[0];
      const updatedCalendar = JSON.parse(localStorage.getItem('calendar') || '{}');
      updatedCalendar[today] = true;
      localStorage.setItem('calendar', JSON.stringify(updatedCalendar));
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
      <SettingsModal
        cards={cards}
        patterns={patterns}
        vimMode={vimMode}
        setVimMode={setVimMode}
        includeMedium={includeMedium}
        setIncludeMedium={setIncludeMedium}
        includeHard={includeHard}
        setIncludeHard={setIncludeHard}
        newCardsPerDay={newCardsPerDay}
        setNewCardsPerDay={setNewCardsPerDay}
      />
      <div className={styles.container}>
        <Editor
          value={answer}
          onChange={(value) => !isRevealed && !isGrading && setAnswer(value)}
          onEditorReady={handleEditorReady}
          vimMode={vimMode}
          readOnly={isRevealed || isGrading}
        />
      </div>
    </>
  );
}
