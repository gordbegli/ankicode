import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './Submit.module.css';

export default forwardRef(Submit);

function Submit({ answer, testCode, rate, rating, setRating, goToNextProblem, handleRunTests }, ref) {
    const [testResults, setTestResults] = useState([]);
    const [showTestCode, setShowTestCode] = useState(false);
    const [allTestsPassed, setAllTestsPassed] = useState(false);

    const runTests = async () => {
        try {
            const pyodide = window.pyodide;
            const combinedCode = `\n${answer}\n${testCode}`;

            // Redirect stdout to a string
            pyodide.runPython(`
                import io, sys
                sys.stdout = io.StringIO()
            `);

            // Run the combined code
            await pyodide.runPythonAsync(combinedCode);

            // Capture the stdout content
            const stdout = pyodide.runPython("sys.stdout.getvalue()");

            // Reset stdout
            pyodide.runPython("sys.stdout = sys.__stdout__");

            setTestResults(['Tests completed. Output:', stdout]);

            // Check if all tests passed
            if (!(stdout.includes("AssertionError"))) {
                setAllTestsPassed(true);
            } else {
                setRating(1);
            }
        } catch (error) {
            let stdout = '';
            stdout = pyodide.runPython("sys.stdout.getvalue()");
            pyodide.runPython("sys.stdout = sys.__stdout__");

            setTestResults([
                stdout,
                'Error running tests:',
                error.toString(),
            ]);
            setRating(1);
            setAllTestsPassed(false);
        }
    };

    const handleNext = () => {
        if (allTestsPassed) {
            rate(rating);
            setAllTestsPassed(false);
            setTestResults([]);
        }
    };

    // Expose runTests and handleNext methods to parent component
    useImperativeHandle(ref, () => ({
        runTests,
        handleNext
    }));

    return (
        <div>
            <div className={styles.submitHeader}>
                <div className={styles.buttonGroup}>
                    <button onClick={() => setShowTestCode(!showTestCode)} className={styles.viewButton}>
                        {showTestCode ? 'Hide Test Code' : 'View Test Code'}
                    </button>
                    <button onClick={handleRunTests} className={styles.runButton}>Run Tests</button>
                    {allTestsPassed && <button onClick={handleNext} className={styles.nextButton}>Next</button>}
                </div>
            </div>
            {showTestCode && <SyntaxHighlighter language="python" style={tomorrow}>{testCode}</SyntaxHighlighter>}
            {testResults.length > 0 && <SyntaxHighlighter language="python" style={tomorrow}>{testResults.join('\n')}</SyntaxHighlighter>}
        </div>
    );
}