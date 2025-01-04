'use client';
import React from 'react';
import { useChat } from 'ai/react';
import { useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { InlineMath, BlockMath } from 'react-katex';
import styles from './Chat.module.css';
import 'katex/dist/katex.min.css';

export default function Chat({ answer, problemDescription, testCode, setRating, chatRef }) {
    const formRef = useRef(null);
    const inputRef = useRef(null);
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        const storedApiKey = localStorage.getItem('apiKey');
        if (storedApiKey) setApiKey(storedApiKey);
    }, []);

    const { messages, input, handleInputChange, handleSubmit, setMessages, error } = useChat({
        initialMessages: [
            {
                id: 'context',
                role: 'system',
                content: `Here's the current context:\n\nProblem Description:\n${problemDescription}\n\nCurrent Answer:\n${answer}\n\nTest Code:\n${testCode}\n\nInstructions:\nBE CONCISE. RESPOND WITH 1-2 SENTENCES. SURROUND ANY CODE IN YOUR RESPONSE WITH \`\`\`python. Use triple, not single backticks in your response. Use very simple, plain language.`
            }
        ],
        api: '/api/chat',
        headers: {
            'X-API-Key': apiKey,
        },
        onError: (error) => {
            console.error('Chat error:', error);
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    id: 'error',
                    role: 'assistant',
                    content: `Error: ${error.message || 'An unknown error occurred'}`
                }
            ]);
        }
    });

    useEffect(() => {
        setMessages(prevMessages => [
            {
                id: 'context',
                role: 'system',
                content: `Here's the current context:\n\nProblem Description:\n${problemDescription}\n\nCurrent Answer:\n${answer}\n\nTest Code:\n${testCode}\n\nInstructions:\nBE CONCISE. RESPOND WITH 1-2 SENTENCES. SURROUND ANY CODE IN YOUR RESPONSE WITH \`\`\`python. Use triple, not single backticks in your response. Use very simple plain language.`
            },
            ...prevMessages.slice(1)
        ]);
    }, [problemDescription, answer, testCode, setMessages]);

    useEffect(() => {
        if (chatRef) {
            chatRef.current = {
                focusInput: () => inputRef.current?.focus()
            };
        }
    }, [chatRef]);

    const handleSubmitWrapper = (e) => {
        e.preventDefault();
        setRating(1);
        handleSubmit(e);
    };

    const renderMessage = (message) => {
        const parts = [];
        const content = message.content;
        const combinedRegex = /```(\w+)?\n([\s\S]*?)```|\\\[(.*?)\\\]|\\\((.*?)\\\)|\$\$(.*?)\$\$|\$(.*?)\$|`([^`]+?)`|\*\*(.+?)\*\*/gs;
        let lastIndex = 0;
        let match;

        while ((match = combinedRegex.exec(content)) !== null) {
            if (match.index > lastIndex) {
                const text = content.slice(lastIndex, match.index);
                parts.push(processPlainText(text));
            }

            if (match[0].startsWith('```')) {
                const lang = match[1] || 'python';
                const code = match[2];
                parts.push(
                    <SyntaxHighlighter key={match.index} language={lang} style={tomorrow}>
                        {code.trim()}
                    </SyntaxHighlighter>
                );
            } else if (match[0].startsWith('\\[') && match[0].endsWith('\\]')) {
                const latex = match[3];
                parts.push(
                    <BlockMath key={match.index}>{latex}</BlockMath>
                );
            } else if (match[0].startsWith('\\(') && match[0].endsWith('\\)')) {
                const latex = match[4];
                parts.push(
                    <InlineMath key={match.index}>{latex}</InlineMath>
                );
            } else if (match[0].startsWith('$$') && match[0].endsWith('$$')) {
                const latex = match[5];
                parts.push(
                    <BlockMath key={match.index}>{latex}</BlockMath>
                );
            } else if (match[0].startsWith('$') && match[0].endsWith('$')) {
                const latex = match[6];
                parts.push(
                    <InlineMath key={match.index}>{latex}</InlineMath>
                );
            } else if (match[0].startsWith('`')) {
                const code = match[7];
                parts.push(
                    <code key={match.index} className={styles.inlineCode}>{code}</code>
                );
            } else if (match[0].startsWith('**') && match[0].endsWith('**')) {
                const boldText = match[8];
                parts.push(
                    <strong key={match.index}>{boldText}</strong>
                );
            }

            lastIndex = combinedRegex.lastIndex;
        }

        if (lastIndex < content.length) {
            const text = content.slice(lastIndex);
            parts.push(processPlainText(text));
        }

        return parts;
    };
    

    const processPlainText = (text) => {
        return text.split('\n').map((line, i) => (
            <React.Fragment key={i}>
                {line}
                {i < text.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    const handleCheck = () => {
        setRating(1);
        handleInputChange({ target: { value: "Can you spot check my code for me? Surround any code in your response with ```python" } });
        setTimeout(() => formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), 0);
    };

    const handleHint = () => {
        setRating(1);
        handleInputChange({ target: { value: "Give me a hint. You are a wise tutor who will give me a single line of code to guide me to the solution. Surround your response with ```python" } });
        setTimeout(() => formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), 0);
    };

    const handleSolution = () => {
        setRating(1);
        handleInputChange({ target: { value: "Can you give me the solution. Don't include the test code in your response." } });
        setTimeout(() => formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), 0);
    };

    return (
        <div className={styles.chatContainer}>
            <form onSubmit={handleSubmitWrapper} ref={formRef} className={styles.form}>
                <div className={styles.inputButtonContainer}>
                    <input 
                        ref={inputRef}
                        className={styles.input} 
                        value={input} 
                        onChange={handleInputChange} 
                        placeholder="Ask about the code..." 
                    />
                    <div className={styles.buttonGroup}>
                        <button type="button" onClick={handleHint} className={`${styles.button} ${styles.hintButton}`}>Hint</button>
                        <button type="button" onClick={handleCheck} className={`${styles.button} ${styles.checkButton}`}>Check</button>
                        <button type="button" onClick={handleSolution} className={`${styles.button} ${styles.solutionButton}`}>Solution</button>
                        <button type="button" onClick={() => setMessages([messages[0]])} className={`${styles.button} ${styles.resetButton}`}>Reset</button>
                    </div>
                </div>
            </form>
            {messages.filter(m => m.role !== 'system').map(m => (
                <div key={m.id} className={styles.message}>
                    <strong>{m.role === 'user' ? 'User: ' : 'LLM: '}</strong>
                    <div className={styles.messageContent}>{renderMessage(m)}</div>
                </div>
            ))}
        </div>
    );
}