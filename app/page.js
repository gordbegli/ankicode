'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { fsrs, generatorParameters } from 'ts-fsrs';
import { startingCards } from './startingCards';
import Editor from './components/Editor';
import SettingsModal from './components/SettingsModal';
import styles from './page.module.css';

const defaultAppState = {
  vimMode: false,
  includeMedium: false,
  includeHard: false,
  newCardsPerDay: 1,
  newCardsToday: { date: '', count: 0 },
  calendar: {},
  hasSeenWelcome: false,
  apiKey: '',
  cards: startingCards,
};

function loadAppState() {
  if (typeof window === 'undefined') return defaultAppState;
  const storedState = localStorage.getItem('ankicodeState');
  return storedState ? { ...defaultAppState, ...JSON.parse(storedState) } : defaultAppState;
}

export default function Flashcard() {
  const [answer, setAnswer] = useState('');
  const [current, setCurrent] = useState(null);
  const f = fsrs(generatorParameters());
  const [solution, setSolution] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [appState, setAppState] = useState(loadAppState);
  const {
    cards,
    calendar,
    hasSeenWelcome,
    includeHard,
    includeMedium,
    newCardsPerDay,
    newCardsToday,
    vimMode,
    apiKey,
  } = appState;
  const [done, setDone] = useState(false);
  const [isGrading, setIsGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState(null);
  const [hasFailedAttempt, setHasFailedAttempt] = useState(false);
  const editorViewRef = useRef(null);
  const hasMounted = useRef(false);

  const updateAppState = useCallback((updates) => {
    setAppState(previous => ({ ...previous, ...updates }));
  }, []);

  const setVimMode = useCallback((value) => updateAppState({ vimMode: value }), [updateAppState]);
  const setIncludeMedium = useCallback((value) => updateAppState({ includeMedium: value }), [updateAppState]);
  const setIncludeHard = useCallback((value) => updateAppState({ includeHard: value }), [updateAppState]);
  const setNewCardsPerDay = useCallback((value) => updateAppState({ newCardsPerDay: value }), [updateAppState]);
  const setApiKey = useCallback((value) => updateAppState({ apiKey: value }), [updateAppState]);

  const loadCardData = useCallback((card) => {
    if (!card) return;

    setAnswer(card.starterCode || '');
    setSolution(card.solution || '');
  }, []);

  const getNextCard = useCallback((sourceCards = cards, sourceNewCardsToday = newCardsToday, sourceSettings = { newCardsPerDay, includeMedium, includeHard }) => {
    const today = new Date().setHours(0, 0, 0, 0);
    let next = sourceCards.find(card => card.stage === 'learning' && new Date(card.due).setHours(0, 0, 0, 0) <= today);

    const todayStr = new Date().toISOString().split('T')[0];
    const todayCount = sourceNewCardsToday.date === todayStr ? sourceNewCardsToday.count : 0;
    if (!next && sourceSettings.newCardsPerDay > 0 && todayCount < sourceSettings.newCardsPerDay) {
      const difficulties = ['Easy'];
      if (sourceSettings.includeMedium) difficulties.push('Medium');
      if (sourceSettings.includeHard) difficulties.push('Hard');

      for (let difficulty of difficulties) {
        next = sourceCards.find(card => card.stage === 'new' && card.difficultyRating === difficulty);
        if (next) break;
      }
    }

    if (!next) {
      setDone(true);
      setAnswer('# All done. Come back tomorrow.');
      return null;
    }
    setDone(false);
    return next;
  }, [cards, includeHard, includeMedium, newCardsPerDay, newCardsToday]);

  const handleAppStateChange = useCallback((nextState) => {
    setAppState(previous => ({ ...nextState, apiKey: previous.apiKey }));

    const next = getNextCard(nextState.cards, nextState.newCardsToday, nextState);
    if (next) {
      setCurrent(next);
      loadCardData(next);
    } else {
      setCurrent(null);
    }
  }, [getNextCard, loadCardData]);

  const rate = useCallback((rating) => {
    if (!current) return;

    let updatedNewCardsToday = newCardsToday;
    const cardToSchedule = { ...current, stage: 'learning' };

    if (current.stage === 'new') {
      const todayStr = new Date().toISOString().split('T')[0];
      const newCount = newCardsToday.date === todayStr ? newCardsToday.count + 1 : 1;
      updatedNewCardsToday = { date: todayStr, count: newCount };
    }

    const scheduling = f.repeat(cardToSchedule, new Date());
    const updatedCards = cards.map(card => (
      card.id === current.id
        ? { ...cardToSchedule, ...scheduling[rating].card, stage: 'learning' }
        : card
    ));

    updateAppState({ cards: updatedCards, newCardsToday: updatedNewCardsToday });

    const next = getNextCard(updatedCards, updatedNewCardsToday, {
      ...appState,
      cards: updatedCards,
      newCardsToday: updatedNewCardsToday,
    });
    if (next) {
      setCurrent(next);
      loadCardData(next);
    }
  }, [appState, current, cards, f, getNextCard, setCurrent, loadCardData, newCardsToday, updateAppState]);

  const submitAnswer = useCallback(async () => {
    if (isRevealed || isGrading) return;

    setIsGrading(true);
    const userCode = answer;

    setAnswer(`${userCode}\n\n# Grading...`);

    try {
      const response = await fetch('/api/grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey || '',
        },
        body: JSON.stringify({
          userCode: userCode,
          expectedTemplate: solution,
          templateName: current?.title,
        }),
      });

      const result = await response.json();

      if (result.error) {
        setAnswer(`${userCode}\n\n# ${result.error}`);
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
  }, [answer, solution, current, isRevealed, isGrading, apiKey]);

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
    setTimeout(() => editorViewRef.current?.focus(), 0);
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
    if (!hasSeenWelcome) {
      updateAppState({ hasSeenWelcome: true });
      setAnswer('# Welcome to AnkiCode\n#\n# Memorize algorithm templates with spaced repetition.\n#\n# Before you start, click the logo in the top right and paste in your\n# OpenAI API key. It is stored only in your browser and used to grade\n# your answers. Grab one at https://platform.openai.com/api-keys\n#\n# Shortcuts:\n#   Cmd+Enter  Submit\n#   Cmd+;      Reveal answer\n#   Cmd+\'      Next card\n#\n# Press Cmd+\' to start.');
      setIsRevealed(true);
    }
    const next = getNextCard(cards, newCardsToday, { newCardsPerDay, includeMedium, includeHard });
    if (!next) return;
    setCurrent(next);
    if (hasSeenWelcome) loadCardData(next);
  }, []);

  useEffect(() => {
    localStorage.setItem('ankicodeState', JSON.stringify(appState, null, 2));
  }, [appState]);

  useEffect(() => {
    if (!hasMounted.current) { hasMounted.current = true; return; }
    if (done) return;
    const next = getNextCard(cards, newCardsToday, { newCardsPerDay, includeMedium, includeHard });
    if (!next) return;
    setCurrent(next);
    loadCardData(next);
  }, [cards, done, getNextCard, includeHard, includeMedium, loadCardData, newCardsPerDay, newCardsToday]);

  useEffect(() => {
    if (done) {
      const today = new Date().toISOString().split('T')[0];
      if (calendar[today]) return;
      updateAppState({ calendar: { ...calendar, [today]: true } });
    }
  }, [calendar, done, updateAppState]);

  return (
    <>
      <SettingsModal
        appState={appState}
        cards={cards}
        vimMode={vimMode}
        setVimMode={setVimMode}
        includeMedium={includeMedium}
        setIncludeMedium={setIncludeMedium}
        includeHard={includeHard}
        setIncludeHard={setIncludeHard}
        newCardsPerDay={newCardsPerDay}
        setNewCardsPerDay={setNewCardsPerDay}
        apiKey={apiKey}
        setApiKey={setApiKey}
        onAppStateChange={handleAppStateChange}
      />
      <div className={styles.container}>
        <Editor
          value={answer}
          onChange={(value) => !isRevealed && !isGrading && setAnswer(value)}
          onEditorReady={(view) => { editorViewRef.current = view; }}
          vimMode={vimMode}
          readOnly={isRevealed || isGrading}
        />
      </div>
    </>
  );
}
