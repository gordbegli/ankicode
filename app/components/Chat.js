'use client';
import { useChat } from 'ai/react';
import { useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './Chat.module.css';

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

    const renderMessage = (message) => {
        const parts = [];
        let lastIndex = 0;
        const processInlineCode = (text) => {
            return text.split(/(`[^`]+`)/).map((part, index) => {
                if (index % 2 === 1) {
                    return <code key={index} className={styles.inlineCode}>{part.slice(1, -1)}</code>;
                }
                return part.split('\n').map((line, i) => (
                    <>
                        {line}
                        {i < part.split('\n').length - 1 && <br />}
                    </>
                ));
            });
        };

        message.content.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code, offset) => {
            if (offset > lastIndex) parts.push(processInlineCode(message.content.slice(lastIndex, offset)));
            parts.push(<SyntaxHighlighter key={offset} language={lang || 'python'} style={tomorrow}>{code.trim()}</SyntaxHighlighter>);
            lastIndex = offset + match.length;
        });
        if (lastIndex < message.content.length) parts.push(processInlineCode(message.content.slice(lastIndex)));
        return parts;
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
            <div className={styles.messageContainer}>
                {messages.filter(m => m.role !== 'system').map(m => (
                    <div key={m.id} className={styles.message}>
                        <strong>{m.role === 'user' ? 'User: ' : 'LLM: '}</strong>
                        <div className={styles.messageContent}>{renderMessage(m)}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} ref={formRef} className={styles.form}>
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
        </div>
    );
}