document.addEventListener("DOMContentLoaded", function () {
  const text1 = document.getElementById("text1");
  const text2 = document.getElementById("text2");
  const count1 = document.getElementById("count1");
  const count2 = document.getElementById("count2");
  const charDiffEl = document.getElementById("charDiff");
  const wordDiffEl = document.getElementById("wordDiff");
  const similarityEl = document.getElementById("similarity");
  const matchStatusEl = document.getElementById("matchStatus");
  const resultMessageEl = document.getElementById("resultMessage");
  const leftDiff = document.getElementById("leftDiff");
  const rightDiff = document.getElementById("rightDiff");

  function countWords(value) {
    const trimmed = value.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }

  function tokenize(value) {
    return value.split(/(\s+)/).filter(Boolean);
  }

  function buildDiffTokens(leftText, rightText) {
    const leftTokens = tokenize(leftText);
    const rightTokens = tokenize(rightText);

    const maxLength = Math.max(leftTokens.length, rightTokens.length);

    const leftResult = [];
    const rightResult = [];

    for (let i = 0; i < maxLength; i++) {
      const leftToken = leftTokens[i] || "";
      const rightToken = rightTokens[i] || "";

      const isSame = leftToken === rightToken;

      leftResult.push({
        value: leftToken,
        className: isSame ? "token equal" : (leftToken ? "token changed" : "token empty")
      });

      rightResult.push({
        value: rightToken,
        className: isSame ? "token equal" : (rightToken ? "token changed" : "token empty")
      });
    }

    return { leftResult, rightResult };
  }

  function renderDiff(leftText, rightText) {
    const { leftResult, rightResult } = buildDiffTokens(leftText, rightText);

    leftDiff.innerHTML = "";
    rightDiff.innerHTML = "";

    leftResult.forEach((token) => {
      const span = document.createElement("span");
      span.className = token.className;
      span.textContent = token.value || " ";
      leftDiff.appendChild(span);
    });

    rightResult.forEach((token) => {
      const span = document.createElement("span");
      span.className = token.className;
      span.textContent = token.value || " ";
      rightDiff.appendChild(span);
    });
  }

  function compareTexts() {
    const leftValue = text1.value;
    const rightValue = text2.value;

    const leftWords = tokenize(leftValue);
    const rightWords = tokenize(rightValue);

    const charDiff = Math.abs(leftValue.length - rightValue.length);
    const wordDiff = Math.abs(leftWords.length - rightWords.length);

    let sameCount = 0;
    const total = Math.max(leftWords.length, rightWords.length, 1);

    for (let i = 0; i < Math.min(leftWords.length, rightWords.length); i++) {
      if (leftWords[i] === rightWords[i]) sameCount++;
    }

    const similarity = Math.round((sameCount / total) * 100);

    count1.textContent = `${leftValue.length} chars / ${countWords(leftValue)} words`;
    count2.textContent = `${rightValue.length} chars / ${countWords(rightValue)} words`;
    charDiffEl.textContent = charDiff;
    wordDiffEl.textContent = wordDiff;
    similarityEl.textContent = similarity + "%";

    renderDiff(leftValue, rightValue);

    if (!leftValue.trim() && !rightValue.trim()) {
      matchStatusEl.innerHTML = '<span class="status-badge status-different">No Input</span>';
      resultMessageEl.textContent = "Enter text in both fields to compare.";
      return;
    }

    if (leftValue.trim() === rightValue.trim()) {
      matchStatusEl.innerHTML = '<span class="status-badge status-same">Match</span>';
      resultMessageEl.textContent = "Both texts are exactly the same.";
      return;
    }

    matchStatusEl.innerHTML = '<span class="status-badge status-different">Different</span>';
    resultMessageEl.textContent = "The texts are not identical. Similarity score: " + similarity + "%.";
  }

  function clearAll() {
    text1.value = "";
    text2.value = "";
    compareTexts();
  }

  function swapTexts() {
    const temp = text1.value;
    text1.value = text2.value;
    text2.value = temp;
    compareTexts();
  }

  async function copyResults() {
    const resultText = [
      "Text Comparison Results",
      "Character Difference: " + charDiffEl.textContent,
      "Word Difference: " + wordDiffEl.textContent,
      "Similarity: " + similarityEl.textContent,
      "Match: " + matchStatusEl.textContent.trim()
    ].join("\n");

    try {
      await navigator.clipboard.writeText(resultText);
      alert("Comparison results copied to clipboard.");
    } catch (error) {
      alert("Copy failed. Please try again.");
    }
  }

  text1.addEventListener("input", compareTexts);
  text2.addEventListener("input", compareTexts);

  document.getElementById("clearBtn").addEventListener("click", clearAll);
  document.getElementById("swapBtn").addEventListener("click", swapTexts);
  document.getElementById("copyBtn").addEventListener("click", copyResults);

  compareTexts();
});