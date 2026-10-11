# Chiram Text Compare Tool - Roadmap & Future Enhancements

## 🎯 Current Features
- ✅ Dark/Light theme switching with localStorage persistence
- ✅ Advanced LCS-based word-by-word diff algorithm
- ✅ Color-coded word changes (added, removed, unchanged)
- ✅ Real-time text comparison statistics
- ✅ Character and word count tracking
- ✅ Similarity percentage calculation
- ✅ Side-by-side diff visualization
- ✅ Swap texts functionality
- ✅ Copy results to clipboard
- ✅ Fully responsive mobile-friendly design
- ✅ Cache-busting loader for CSS/JS files
- ✅ Favicon support

---

## 🚀 Future Enhancements (Phase 2)

### 1. Document-Review Style Diff
   - **Highlighting only changed words and not spacing noise**
     - Filter out pure whitespace tokens in diff visualization
     - Focus highlighting on actual content changes
     - Hide redundant spacing tokens in the side-by-side view
     - Add toggle button: "Show whitespace changes"

   - **Grouping changed phrases together instead of single words**
     - Implement phrase-level clustering algorithm
     - Group consecutive changed words into semantic units
     - Display phrases with context on either side
     - Example: "quick brown fox" → shows as one grouped diff unit

   - **Showing side-by-side sentence comparison summary**
     - Parse text into sentences using punctuation detection
     - Generate sentence-level diff matrix
     - Display summary grid showing changed/unchanged sentences
     - Quick navigation to specific changed sentences
     - Sentence-by-sentence expansion/collapse functionality

### 2. Copy Changed Text Only Option
   - Add new button: "Copy Changes Only"
   - Extract only added and removed tokens
   - Format output options:
     - Plain text with markers: `[ADDED] word`, `[REMOVED] word`
     - Markdown format: `**added**`, `~~removed~~`
     - JSON format: `{type: 'added', text: 'word'}`
   - Preserve context lines around changes

### 3. Additional Advanced Features
   - **Fuzzy matching for similar words**
     - Levenshtein distance algorithm for near-matches
     - Highlight "probably same" words with yellow indicator
     - Confidence score for word similarity

   - **Line-by-line diff mode**
     - Switch between word, line, and paragraph diff modes
     - Show line numbers in left/right panels
     - Highlight changed lines

   - **Export functionality**
     - Export diff as HTML report
     - Export as PDF document
     - Export as CSV data
     - Email comparison report

   - **Revision history**
     - Save comparison snapshots to localStorage
     - View previous comparisons
     - Track changes over multiple edits
     - Session management

   - **Advanced statistics**
     - Word frequency comparison
     - Readability score changes
     - Sentiment analysis on changes
     - Change distribution chart

   - **Collaboration features**
     - Share comparison via unique URL
     - Generate shareable diff link
     - Comment/annotate on specific changes
     - Multi-user comparison view

   - **Performance optimizations**
     - Handle large documents (10,000+ words)
     - Virtual scrolling for diff output
     - Web Worker for diff computation
     - IndexedDB for local storage of comparisons

---

## 📋 Technical Implementation Notes

### Phase 2 Files to Create/Modify
