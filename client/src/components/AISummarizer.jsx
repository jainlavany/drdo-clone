import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './AISummarizer.css';

/**
 * AISummarizer
 * ─────────────────────────────────────────────────────────────────────────────
 * Props:
 *   item    – document / row object (must have at least { title })
 *   itemId  – unique key for element IDs
 *   docLink – URL of the PDF (Google Drive link, /uploads/ path, or drdo.gov.in URL)
 * ─────────────────────────────────────────────────────────────────────────────
 * Behaviour:
 *   - When the panel is opened, it calls POST /api/summarize with the docLink.
 *   - The server fetches the PDF, converts it to base64, and sends it to Gemini
 *     which returns a structured JSON summary { overview, keyPoints, type,
 *     organization, howToAccess }.
 *   - Result is cached in component state — clicking "AI Summary!" again after
 *     a successful fetch reuses the cached result without a new network call.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function AISummarizer({ item = {}, itemId = 'doc', docLink = '#' }) {
  const [open, setOpen]         = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Summarization state
  const [status, setStatus]     = useState('idle'); // 'idle' | 'loading' | 'done' | 'error'
  const [summary, setSummary]   = useState(null);   // { overview, keyPoints, type, organization, howToAccess }
  const [errMsg, setErrMsg]     = useState('');

  /* ── Detect mobile ────────────────────────────────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* ── Only one panel open at a time ───────────────────────────────────── */
  useEffect(() => {
    const handleCloseOthers = (e) => {
      if (e.detail !== itemId) setOpen(false);
    };
    window.addEventListener('close-all-ai-summarizers', handleCloseOthers);
    return () => window.removeEventListener('close-all-ai-summarizers', handleCloseOthers);
  }, [itemId]);

  /* ── Body class for layout shift prevention ───────────────────────────── */
  useEffect(() => {
    if (open && !isMobile) {
      document.body.classList.add('ais-panel-open-active');
    } else {
      document.body.classList.remove('ais-panel-open-active');
    }
    return () => document.body.classList.remove('ais-panel-open-active');
  }, [open, isMobile]);

  /* ── Fetch summary when panel is opened ──────────────────────────────── */
  useEffect(() => {
    if (!open) return;
    // Don't re-fetch if we already have a result or are loading
    if (status === 'done' || status === 'loading') return;
    // Don't fetch if there's no useful link
    if (!docLink || docLink === '#') {
      setStatus('error');
      setErrMsg('No document link available to summarize.');
      return;
    }

    setStatus('loading');
    setErrMsg('');

    const baseUrl = window.SERVER_BASE_URL || 'http://localhost:4000';
    fetch(`${baseUrl}/api/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ docUrl: docLink, docTitle: item.title || '' }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || `Server error ${res.status}`);
        setSummary(data.summary);
        setStatus('done');
      })
      .catch((err) => {
        setErrMsg(err.message);
        setStatus('error');
      });
  }, [open, docLink, item.title, status]);

  const handleOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('close-all-ai-summarizers', { detail: itemId }));
    setOpen(true);
  };

  const handleClose = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setOpen(false);
  };

  /* ── Retry clears the cache so a fresh fetch is triggered ─────────────── */
  const handleRetry = (e) => {
    e.stopPropagation();
    setStatus('idle');
    setSummary(null);
    setErrMsg('');
  };

  return (
    <>
      {/* ── Trigger button ─────────────────────────────────────────── */}
      <button
        className="ais-trigger-btn"
        id={`ai-summary-btn-${itemId}`}
        onClick={handleOpen}
        title="Get AI Summary"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <svg
          className="ais-spark-icon"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M10 2L11.5 7.5L17 9L11.5 10.5L10 16L8.5 10.5L3 9L8.5 7.5L10 2Z" fill="currentColor"/>
          <path d="M16 2L16.75 4.25L19 5L16.75 5.75L16 8L15.25 5.75L13 5L15.25 4.25L16 2Z" fill="currentColor" opacity="0.6"/>
        </svg>
        AI Summary!
        <span className="ais-new-badge">New</span>
      </button>

      {/* ── Portal ────────────────────────────────────────────────────── */}
      {typeof document !== 'undefined' && createPortal(
        <>
          {/* Mobile backdrop */}
          {open && isMobile && (
            <div className="ais-mobile-overlay" onClick={handleClose} aria-hidden="true" />
          )}

          <aside
            className={`ais-panel${open ? ' ais-panel--open' : ''}`}
            role="dialog"
            aria-modal={open}
            aria-label="AI Summary"
            id={`ai-panel-${itemId}`}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* ── Header ────────────────────────────────────────── */}
            <div className="ais-panel-header">
              <div className="ais-panel-title-row">
                <svg className="ais-header-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M10 2L11.5 7.5L17 9L11.5 10.5L10 16L8.5 10.5L3 9L8.5 7.5L10 2Z" fill="currentColor"/>
                  <path d="M16 2L16.75 4.25L19 5L16.75 5.75L16 8L15.25 5.75L13 5L15.25 4.25L16 2Z" fill="currentColor" opacity="0.6"/>
                </svg>
                <span className="ais-panel-title">AI Summary</span>
                <span className="ais-beta-badge">Beta</span>
              </div>
              <button
                className="ais-close-btn"
                onClick={handleClose}
                aria-label="Close AI Summary"
                id={`ai-panel-close-${itemId}`}
                tabIndex={open ? 0 : -1}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* ── Disclaimer ────────────────────────────────────── */}
            <div className="ais-notice">
              <svg className="ais-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="ais-notice-text">
                This is an AI-generated summary. Please refer to the official document for complete details.
              </p>
            </div>

            {/* ── Scrollable body ───────────────────────────────── */}
            <div className="ais-panel-body">

              <h2 className="ais-doc-title">{item.title || 'Document Summary'}</h2>

              {item.advtNo && <p className="ais-doc-subtitle">Advt No. {item.advtNo}</p>}
              {item.docNo && item.docNo !== '—' && <p className="ais-doc-subtitle">Doc No. {item.docNo}</p>}

              {/* ── LOADING state ──────────────────────────────── */}
              {status === 'loading' && (
                <div className="ais-loading-state">
                  <div className="ais-spinner" aria-label="Generating summary…">
                    <div className="ais-spinner-ring" />
                  </div>
                  <p className="ais-loading-label">Reading document and generating summary…</p>
                  <p className="ais-loading-sub">This may take a few seconds</p>
                </div>
              )}

              {/* ── ERROR state ────────────────────────────────── */}
              {status === 'error' && (
                <div className="ais-error-state">
                  <div className="ais-error-icon">⚠️</div>
                  <p className="ais-error-title">Could not generate summary</p>
                  <p className="ais-error-msg">{errMsg}</p>
                  <button className="ais-retry-btn" onClick={handleRetry}>
                    Try Again
                  </button>
                </div>
              )}

              {/* ── DONE state — real AI content ───────────────── */}
              {status === 'done' && summary && (
                <>
                  {summary.overview && (
                    <section className="ais-section">
                      <h3 className="ais-section-heading">Overview</h3>
                      <p className="ais-section-text">{summary.overview}</p>
                    </section>
                  )}

                  <section className="ais-section">
                    <h3 className="ais-section-heading">Key Details</h3>
                    <ul className="ais-detail-list">
                      {[
                        { icon: '🏢', label: 'Organization',   value: summary.organization || item.category || '—' },
                        { icon: '📋', label: 'Type',           value: summary.type || item.type || '—' },
                        { icon: '📅', label: 'Published Date', value: item.date || item.publishedDate || '—' },
                        { icon: '🔗', label: 'Category',       value: item.category || '—' },
                      ].map(({ icon, label, value }) => (
                        <li key={label} className="ais-detail-item">
                          <span className="ais-detail-icon" aria-hidden="true">{icon}</span>
                          <span className="ais-detail-label">{label}</span>
                          <span className="ais-detail-value">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {summary.keyPoints && summary.keyPoints.length > 0 && (
                    <section className="ais-section">
                      <h3 className="ais-section-heading">Key Points</h3>
                      <ul className="ais-bullet-list">
                        {summary.keyPoints.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {summary.eligibilityCriteria && (
                    <section className="ais-section">
                      <h3 className="ais-section-heading">Eligibility Criteria</h3>
                      <p className="ais-section-text">{summary.eligibilityCriteria}</p>
                    </section>
                  )}

                  {summary.howToAccess && (
                    <section className="ais-section">
                      <h3 className="ais-section-heading">How to Access / Apply</h3>
                      <p className="ais-section-text">{summary.howToAccess}</p>
                    </section>
                  )}
                </>
              )}

              {/* ── IDLE — only shown if no link ──────────────── */}
              {status === 'idle' && (
                <div className="ais-idle-state">
                  <p className="ais-section-text ais-placeholder-text">
                    Opening the summary panel…
                  </p>
                </div>
              )}

            </div>

            {/* ── Footer ───────────────────────────────────────── */}
            <div className="ais-panel-footer">
              <a
                href={docLink !== '#' ? docLink : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className={`ais-read-btn${docLink === '#' ? ' ais-read-btn--disabled' : ''}`}
                id={`ai-read-doc-${itemId}`}
                tabIndex={open ? 0 : -1}
              >
                Read Full Document
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>

              <button
                className="ais-close-footer-btn"
                onClick={handleClose}
                id={`ai-close-footer-${itemId}`}
                tabIndex={open ? 0 : -1}
              >
                Close
              </button>
            </div>

            {/* ── Feedback ─────────────────────────────────────── */}
            <div className="ais-feedback-row">
              <span className="ais-feedback-label">Was this summary helpful?</span>
              <button className="ais-feedback-btn" aria-label="Thumbs up" id={`ai-thumbup-${itemId}`} onClick={(e) => e.stopPropagation()} tabIndex={open ? 0 : -1}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
                  <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                </svg>
              </button>
              <button className="ais-feedback-btn" aria-label="Thumbs down" id={`ai-thumbdown-${itemId}`} onClick={(e) => e.stopPropagation()} tabIndex={open ? 0 : -1}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/>
                  <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
                </svg>
              </button>
            </div>

          </aside>
        </>,
        document.body
      )}
    </>
  );
}
