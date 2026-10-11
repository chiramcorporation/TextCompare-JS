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

  function normalizeTokens(value) {
    const cleaned = value
      .replace(/\r\n/g, "\n")
      .trim();

    if (!cleaned) return [];

    return cleaned
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
  }

  function computeLcsDiff(leftTokens, rightTokens) {
    const rows = leftTokens.length + 1;
    const cols = rightTokens.length + 1;
    const dp = Array.from({ length: rows }, () => new Array(cols).fill(0));

    for (let i = 1; i <= leftTokens.length; i++) {
      for (let j = 1; j <= rightTokens.length; j++) {
        if (leftTokens[i - 1] === rightTokens[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    const operations = [];
    let i = leftTokens.length;
    let j = rightTokens.length;

    while (i > 0 && j > 0) {
      if (leftTokens[i - 1] === rightTokens[j - 1]) {
        operations.push({ type: "equal", left: leftTokens[i - 1], right: rightTokens[j - 1] });
        i--;
        j--;
      } else if (dp[i - 1][j] >= dp[i][j - 1]) {
        operations.push({ type: "removed", left: leftTokens[i - 1] });
        i--;
      } else {
        operations.push({ type: "added", right: rightTokens[j - 1] });
        j--;
      }
    }

    while (i > 0) {
      operations.push({ type: "removed", left: leftTokens[i - 1] });
      i--;
    }

    while (j > 0) {
      operations.push({ type: "added", right: rightTokens[j - 1] });
      j--;
    }

    return operations.reverse();
  }

  function renderDiff(leftText, rightText) {
    const leftTokens = normalizeTokens(leftText);
    const rightTokens = normalizeTokens(rightText);
    const operations = computeLcsDiff(leftTokens, rightTokens);

    const leftResult = [];
    const rightResult = [];

    operations.forEach((op) => {
      if (op.type === "equal") {
        leftResult.push({ value: op.left, className: "token equal" });
        rightResult.push({ value: op.right, className: "token equal" });
      }

      if (op.type === "removed") {
        leftResult.push({ value: op.left, className: "token removed" });
        rightResult.push({ value: "", className: "token empty" });
      }

      if (op.type === "added") {
        leftResult.push({ value: "", className: "token empty" });
        rightResult.push({ value: op.right, className: "token added" });
      }
    });

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

    const leftTokens = normalizeTokens(leftValue);
    const rightTokens = normalizeTokens(rightValue);

    const charDiff = Math.abs(leftValue.length - rightValue.length);
    const wordDiff = Math.abs(leftTokens.length - rightTokens.length);

    const lcs = computeLcsDiff(leftTokens, rightTokens);
    const matchCount = lcs.filter((op) => op.type === "equal").length;
    const total = Math.max(leftTokens.length, rightTokens.length, 1);
    const similarity = Math.round((matchCount / total) * 100);

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
