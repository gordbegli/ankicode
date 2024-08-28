'use client'
import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import DOMPurify from 'isomorphic-dompurify';
import styles from './Problem.module.css';

const Problem = memo(({ content, videoHtml }) => {
    const purifyConfig = {
        ADD_TAGS: ['iframe'],
        ADD_ATTR: ['src', 'title', 'frameborder', 'allow', 'allowfullscreen', 'referrerpolicy'],
        ALLOW_DATA_ATTR: false,
        ALLOWED_URI_REGEXP: /^https:\/\/www\.youtube\.com\/embed\//
    };

    return (
        <>
            <div className={styles.markdownContainer}>
                <ReactMarkdown className={styles.reactMarkDown}>{content}</ReactMarkdown>
            </div>
            <div className={styles.videoContainer}>
                <div className={styles.videoWrapper} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(videoHtml, purifyConfig) }} />
            </div>
        </>
    );
});

export default Problem;